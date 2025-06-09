<template>
  <div class="add-field-page">
    <div class="add-field-container">
      <div class="progress-bar-vertical">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="step-vertical"
          :class="{ active: currentStepIndex === index, completed: currentStepIndex > index }"
          @click="goToStep(index)"
        >
          <span class="step-number-vertical" :class="{ completed: currentStepIndex > index }">
            {{ index + 1 }}
          </span>
          <div v-if="index < steps.length - 1" class="line-container">
            <span class="line" :class="{ 'line-completed': currentStepIndex > index }"></span>
          </div>
        </div>
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="form-screen">
          <h2 class = 'currentStepTitle'>{{ currentStepTitle }}</h2>
          <div v-for="question in currentStepQuestions" :key="question.id" class="form-group">
            <label :for="question.model">{{ question.label }}:</label>
            <input
              v-if="question.type === 'number'"
              type="number"
              :id="question.model"
              v-model.number="fieldData[question.model]"
              required
            />
            <input
              v-else-if="question.type === 'text'"
              type="text"
              :id="question.model"
              v-model="fieldData[question.model]"
              :list="question.options ? 'question.model + Options' : null"
              required
            />
            <datalist v-if="question.options" :id="question.model + 'Options'">
              <option v-for="option in question.options" :key="option" :value="option"></option>
            </datalist>
          </div>
          <div v-if="currentStepIndex < steps.length - 1" class="form-screen">
            <button type="button" @click="nextStep">Далее</button>
          </div>
        </div>
        <div v-if="currentStepIndex === steps.length - 1" class="form-screen">
          <button type="submit" :disabled="isSubmitting">
            {{ isSubmitting ? 'Добавление...' : 'Добавить' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();
const fieldData = reactive({});
const isSubmitting = ref(false);
const currentStepIndex = ref(0);
const stepTitles = ['Общая информация', 'Описание почвы', 'Кислотность почвы'];
const currentStepTitle = computed(() => stepTitles[currentStepIndex.value]);
const steps = ref([
  { id: 1, questions: [1, 2, 3] },
  { id: 2, questions: [4, 5] },
  { id: 3, questions: [6, 7] },
]);
const questions = [
  { id: 1, label: 'Культура', model: 'culture', type: 'text' },
  { id: 2, label: 'Площадь (га)', model: 'area', type: 'number' },
  { id: 3, label: 'Местоположение', model: 'location', type: 'text' },
  { id: 4, label: 'Гумус (%)', model: 'humus', type: 'number' },
  { id: 5, label: 'Мощность пахотного слоя', model: 'plowLayerDepth', type: 'number'},
  { id: 6, label: 'Плотность почвы (г/см3)', model: 'soilDensity', type: 'number' },
  { id: 7, label: 'рН солевой', model: 'phSalt', type: 'number' },
];

const currentStepQuestions = computed(() => {
  const step = steps.value[currentStepIndex.value];
  return questions.filter((question) => step.questions.includes(question.id));
});

  const nextStep = () => {
    if (currentStepIndex.value < steps.value.length - 1) {
      currentStepIndex.value++;
    }
  };
  
  const goToStep = (stepIndex) => {
    currentStepIndex.value = stepIndex;
  };
  
  const handleSubmit = async () => {
  console.log('handleSubmit called');
  isSubmitting.value = true;

  try {
    console.log('Dispatching addField action');
    store.dispatch('addField', { ...fieldData });
    router.push('/home');
  } catch (error) {
    console.error('Error adding field:', error);
    alert('Failed to add field. Please try again.');
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.add-field-page {
  width: 100%;
  height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.add-field-container {
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  border-radius: 10px;
  width: 100%;
  height: 80vh;
  padding: 30px;
  padding-top: 40px;
}

.form-container {
  width: 90%;
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  box-sizing: border-box;
}

.form-screen {
  margin-top: 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.currentStepTitle {
  font-size: 24px;
  margin-bottom: 20px;
  color: #4b4a4a;
  text-align: center;
}

.form-group {
  margin-bottom: 25px;
  width: 190px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;
}

input[type='text'],
input[type='number'] {
  width: 100%;
  padding: 12px;
  border: 1px solid #dbe2ef;
  border-radius: 12px;
  box-sizing: border-box;
  background-color: #f9f9fb;
}

input[type='text']:focus,
input[type='number']:focus {
  border-color: #588e90;
  outline: none;
}

.navigation-buttons {
  margin-top: 30px;
  text-align: center;
}

button {
  background-color: #588e90;
  color: white;
  border: none;
  padding: 14px 5px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  width: 110px;
}

.progress-bar-vertical {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50px;
  margin-right: 30px;
  position: relative;
}

.step-vertical {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  color: #979eb1;
  width: 100%;
}

.step-vertical:last-child {
  margin-bottom: 0;
}

.step-number-vertical {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 3px solid #979eb1;
  color: #979eb1;
  position: relative;
  z-index: 1;
  background-color: #e7e7e7;
  font-size: 16px;
}

.step-vertical.active .step-number-vertical {
  border-color: #588e90;
  color: #588e90;
  background-color: #fff;
}

.step-vertical.completed .step-number-vertical {
  background-color: #588e90;
  color: white;
  border-color: #588e90;
}

.line-container {
  width: 4px;
  height: 150px;
  position: relative;
}

.line {
  width: 100%;
  background-color: #b0d0cd;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}

.line-completed {
  background-color: #588e90;
}
</style>