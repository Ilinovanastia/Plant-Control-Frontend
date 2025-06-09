<template>
  <div class="field-card" :style="{ backgroundColor: cardColor }">
    <div class="field-card__number">
      <span>{{ fieldNumber }}</span>
    </div>
    <div class="field-card__content">
      <h2>{{ props.field.culture }}</h2>
      <div class="field-card__info">
        <p>Площадь: {{ field.area }} га</p>
      </div>
    </div>
    <button class="field-card__button" :style="{ backgroundColor: cardColor }" @click="goToFieldInfo">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  field: {
    type: Object,
    required: true,
  },
  cardColor: {
    type: String,
    default: '#FFFFFF',
  },
  fieldNumber: {
    type: Number,
    required: true,
  }
});

const goToFieldInfo = () => {
  router.push(`/field-info/${props.field.id}`);
};
</script>

<style scoped>
.field-card {
  display: flex;
  align-items: center;
  padding: 0;
  margin-bottom: 10px;
  border-radius: 16px;
  cursor: pointer;
  height: 12vh;
  overflow: hidden;
}

.field-card__number {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ddd;
  color: #4b4a4a;
  font-size: 16px;
  margin-left: 20px;
  flex-shrink: 0;
}

.field-card__content {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.field-card__content h2 {
  font-size: 24px;
  color: #4b4a4a;
}

.field-card__info {
  color: #555;
  font-weight: 500;
}

.field-card__button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 100%;
  border: none;
  cursor: pointer;
  color: #4b4a4a;
  margin-left: auto;
  border-radius: 0 16px 16px 0;
  flex-shrink: 0;
}

.field-card__button svg {
  width: 24px;
  height: 24px;
}
</style>