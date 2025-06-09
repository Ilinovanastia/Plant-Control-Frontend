<template>
  <div class="home-page">
      <div class="home-component">
        <div class="home-component__top-bar">
          <div class="home-component__button-top">
              <button class="home-component__button" @click="goToAddField">+</button>
          </div>
          <div class="search-container">
            <input
              type="text"
              class="search-input"
              placeholder="Поиск..."
              v-model="searchTerm"
            />
            <font-awesome-icon icon="search" class="search-icon" />
        </div>
        </div>
        <div>
    <div v-if="!isSearchActive">
      <PieChart :culturesData="culturesObject" :colors="myColors" />
    </div>
    <div v-if="filteredFields.length > 0" class="home-component__main">
      <div class="home-component__main-fields">
        <div v-for="(field, index) in filteredFields" :key="field.id" class="field-list">
           <FieldCard :field="field" :card-color="getCultureColor(field.culture)" :field-number="index + 1" />
        </div>
      </div>
    </div>
    <div v-else class="empty-field-list">
      <p>Нет результатов поиска.</p>
    </div>
  </div>
      </div>
  </div>
</template>

<script setup>
import PieChart from '@/components/PieChart.vue';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import FieldCard from '@/components/FieldCard.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useStore } from 'vuex';

library.add(faSearch);

const router = useRouter();
const store = useStore();
const searchTerm = ref('');

const myColors = ref(['#b1b994', '#f9fbd3', '#808276', '#8db79e', ' #f5a66c', '#b2bec6', '#65414d', '#713353', '#d1b493', '#c9e4db', '#e9f6eb', '#b994a5']);


const fields = computed(() => {
  console.log("Home Page: Список полей обновлен из Vuex:", store.getters.getAllFields);
  return store.getters.getAllFields;
}); 

const filteredFields = computed(() => {
  if (!searchTerm.value) {
    return fields.value;
  }
const term = searchTerm.value.toLowerCase();

  return fields.value.filter((field) => {
    return (
      field.culture.toLowerCase().includes(term) ||
      String(field.area).includes(term)
    );
  });
});

const goToAddField = () => {
  const nextFieldNumber = fields.value.length + 1;
  router.push(`/add-field/${nextFieldNumber}`);
};


const getCultureColor = (culture) => {
  return store.getters.getCultureColor(culture);
};
const culturesObject = computed(() => {
  const obj = {};
  fields.value.forEach(item => {
    obj[item.culture] = item.area;
  });
  return obj;
});

onMounted(() => {
  const storedFields = localStorage.getItem('fields');
  if (storedFields) {
    store.commit('setFields', JSON.parse(storedFields));
  } else {
    store.dispatch('fetchFields');
  }
});
</script>

<style scoped>
.home-page {
  position: relative;
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.home-component {
  border-radius: 10px;
  width: 100%;
  height: 80vh;
}

.home-component__top-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #588e90;
  padding: 10px 20px;
  height: 19vh;
  z-index: 21;
  position: sticky;
}

.home-component__main {
  background-color: #f2f2f2;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding-top: 20px;
  margin-top: -18px;
  z-index: 20;
  position: relative;
}

.home-component {
  overflow: auto;
  -ms-overflow-style: none;
}

.home-component::-webkit-scrollbar {
  display: none;
}

.home-component__main-fields {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-container {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    margin-top: 3vh;
  }

.search-input {
  padding: 8px 30px;
  border: none;
  border-radius: 15px;
  font-size: 16px;
  width: 90%;
  outline: none;
  background-color: rgba(255, 255, 255, 0.8);
}

.search-icon {
  position: absolute;
  right: 10px;
  color: white;
  font-size: 1.2rem;
  pointer-events: none;
}

.field-list {
  margin-bottom: 10px;
  width: 100%;
  max-width: 500px;
}

.empty-field-list {
  text-align: center;
  margin-bottom: 20px;
}

.home-component__button-top {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.home-component__button {
  color: white;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 2rem; 
  background: none;
}
</style>