<template>
  <div class="pie-chart-container">
    <svg :width="size" :height="size">
      <g :transform="`translate(${size / 2}, ${size / 2})`">
        <path
          v-for="(slice, index) in slices"
          :key="index"
          :d="slice.path"
          :fill="slice.color"
          class="pie-slice"
          :style="{
            'animation-delay': `${index * 0.1}s`,
          }"
          @mouseover="showTooltip(slice, $event)"
          @mouseleave="hideTooltip"
        />
      </g>
      <foreignObject
        v-if="tooltip.show"
        :x="tooltip.x"
        :y="tooltip.y"
        width="120"
        height="50"
      >
        <div class="tooltip-content" xmlns="http://www.w3.org/1999/xhtml">
          {{ tooltip.label }}: {{ tooltip.percentage }}%
        </div>
      </foreignObject>
    </svg>
  </div>
</template>

<script setup>
import { computed, defineProps, ref } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
  size: {
    type: Number,
    default: 200,
  },
  culturesData: {
    type: Object,
    required: true,
  },
});

const store = useStore();

const tooltip = ref({
  show: false,
  x: 0,
  y: 0,
  label: '',
  percentage: 0,
});

const slices = computed(() => {
  const cultures = props.culturesData;

  if (!cultures || Object.keys(cultures).length === 0) {
    return [];
  }

  const total = Object.values(cultures).reduce((sum, value) => sum + value, 0);
  let startAngle = 0;

  return Object.entries(cultures).map(([label, value]) => {
    const sliceAngle = (value / total) * 2 * Math.PI;
    const endAngle = startAngle + sliceAngle;
    const largeArcFlag = sliceAngle > Math.PI ? 1 : 0;
    const radius = props.size / 2;
    const x1 = Math.cos(startAngle) * radius;
    const y1 = Math.sin(startAngle) * radius;
    const x2 = Math.cos(endAngle) * radius;
    const y2 = Math.sin(endAngle) * radius;

    const d = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} L 0 0`;
    const color = store.getters.getCultureColor(label);
    const percentage = Math.round((value / total) * 100);
    startAngle = endAngle;

    return {
      label,
      value,
      path: d,
      color,
      percentage,
      startAngle,
      endAngle,
    };
  });
});

const showTooltip = (slice, event) => {
  tooltip.value = {
    show: true,
    x: event.offsetX,
    y: event.offsetY,
    label: slice.label,
    percentage: slice.percentage,
  };
};

const hideTooltip = () => {
  tooltip.value.show = false;
};
</script>

<style scoped>
.pie-chart-container {
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 1000;
  background-color: #f2f2f2;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  margin-top: -18px;
  min-height: 240px;
}

svg {
  position: absolute;
  top: 50%;
  left: 50%;
  overflow: visible;
  transform: translate(-50%, -50%);
}

.tooltip-content {
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px;
  border-radius: 5px;
  font-size: 12px;
  text-align: center;
  pointer-events: none;
}

.pie-slice {
  transform-origin: center;
  transform: scale(0);
  animation: revealSlice 0.5s forwards ease-out;
  animation-delay: calc(var(--slice-index) * 0.1s);
}

@keyframes revealSlice {
  to {
    transform: scale(1);
  }
}
</style>