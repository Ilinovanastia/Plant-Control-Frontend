<template>
  <div class="field-info-container container">
    <h1>Информация о поле</h1>
    <div class="section">
      <h2>Общая информация</h2>
      <div class="info-grid">
        <div class="info-item">
          <strong>Культура:</strong>
          <span>{{ fieldData ? fieldData.culture : 'Нет данных' }}</span>
        </div>
        <div class="info-item">
          <strong>Площадь:</strong>
          <span>{{ fieldData ? fieldData.area : 'Нет данных' }} га</span>
        </div>
        <div class="info-item">
          <strong>Город:</strong>
          <span>{{ fieldData ? fieldData.location : 'Нет данных' }}</span>
        </div>
      </div>
    </div>
    <div class="section">
      <h2>Информация о почве</h2>
      <div class="info-grid">
        <div class="info-item">
          <strong>Гумус:</strong>
          <span>{{ fieldData ? fieldData.humus : 'Нет данных' }}</span>
        </div>
        <div class="info-item">
          <strong>Мощность пахотного слоя:</strong>
          <span>{{ fieldData ? fieldData.plowLayerDepth : 'Нет данных' }}</span>
        </div>
        <div class="info-item">
          <strong>Плотность почвы:</strong>
          <span>{{ fieldData ? fieldData.soilDensity : 'Нет данных' }}</span>
        </div>
        <div class="info-item">
          <strong>pH солевой:</strong>
          <span>{{ fieldData ? fieldData.phSalt : 'Нет данных' }}</span>
        </div>
      </div>
    </div>
    <div class="section">
      <h2>Погода</h2>
      <div class="weather-card">
        <p>Интеграция с сервисом погоды</p>
      </div>
    </div>
    <div class="section">
      <h2>Данные мониторинга</h2>
    </div>
    <div class="section-button">
      <button @click="deleteThisField(fieldData.id)">Удалить поле</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const route = useRoute();
const store = useStore();
const fieldId = ref(String(route.params.fieldId));
const fieldData = store.getters.getFieldById(fieldId.value);

const deleteThisField = (fieldId) => {
  console.log("Deleting field with ID:", fieldId);
  store.commit('deleteField', fieldId);
  router.push('/home');
};
</script>
  
<style scoped>
.field-info-container {
  padding: 25px;
  color: #555;
  background-color: #f0f4f8;
}

.field-info-container h1, .field-info-container h2 {
  text-align: center;
}

.section {
  margin-bottom: 25px;
  padding: 20px;
  border-radius: 15px;
  background-color: #fff;
  border: 1px solid #e0e5eb;
}

.section-button {
  display: flex;
  justify-content: center;
}

h1 {
  color: #588e90;
  margin-bottom: 15px;
  font-size: 24px;
}

h2 {
  color: #588e90;
  margin-bottom: 15px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.info-item {
  padding: 18px;
  border-radius: 12px;
  background-color: var(--card-color);
  border: 1px solid black;
}

.info-item strong {
  margin-right: 8px;
  color: #4b4a4a;
}

.weather-card {
  padding: 20px;
  border-radius: 15px;
  background-color: #b0d0cd;
  color: #fff;
  text-align: center;
}

.monitoring-data {
  margin-top: 20px;
}

.chart-container {
  border: none;
  border-radius: 15px;
  padding: 20px;
  background-color: #eadae4;
}

.no-data {
  color: #777;
  padding: 15px;
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
  width: 130px;
  height: 50px;
}
</style>