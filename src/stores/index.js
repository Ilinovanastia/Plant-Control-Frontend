import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      fields: [],
      cultureColors: {},
      availableColors: ['#e7e7e7', '#979eb1', '#b0d0cd', '#eadae4', '#b1b994', '#f9fbd3', '#808276', '#8db79e', ' #f5a66c', '#b2bec6', '#65414d', '#713353', '#d1b493', '#c9e4db', '#e9f6eb', '#b994a5'],
    };
  },
  mutations: {
    addField(state, field) {
      if (!state.cultureColors[field.culture]) {
        if (state.availableColors.length > 0) {
          state.cultureColors[field.culture] = state.availableColors.shift();
        } else {
          state.cultureColors[field.culture] = generateSimilarColor(Object.values(state.cultureColors));
        }
      }

      state.fields.push(field);
      field.color = state.cultureColors[field.culture];
      localStorage.setItem('fields', JSON.stringify(state.fields));
      console.log("addField called:", state.fields);
    },
    deleteField(state, fieldId) {
      console.log("deleteField: fieldId =", fieldId, typeof fieldId);
      console.log("Типы полей в массиве:");
      state.fields.forEach(field => {
        console.log(`field.id = ${field.id}, typeof field.id = ${typeof field.id}`);
      });
      const index = state.fields.findIndex(field => field.id === Number(fieldId));
      if (index !== -1) {
        state.fields.splice(index, 1);
        localStorage.setItem('fields', JSON.stringify(state.fields));
        console.log('Данные обновлены в localStorage после удаления (splice)');
        console.log("Вызвана мутация deleteField:", state.fields);
      } else {
        console.warn(`Элемент с fieldId ${fieldId} не найден в массиве.`);
      }
    },
    updateField(state, updatedField) {
      const index = state.fields.findIndex(field => field.id === updatedField.id);
      if (index !== -1) {
        state.fields.splice(index, 1, updatedField);
        localStorage.setItem('fields', JSON.stringify(state.fields));
        console.log("updateField called:", state.fields);
      }
    },
    setFields(state, fields) {
      state.fields = fields;
      localStorage.setItem('fields', JSON.stringify(state.fields));
      fields.forEach(field => {
        if (field.culture && field.color) {
          state.cultureColors[field.culture] = field.color;
        }
      });
      console.log("setFields called:", state.fields);
    },
    setCultureColor(state, { culture, color }) {
      state.cultureColors[culture] = color;
    },
  },
  actions: {
    async addField(context, field) {
      console.log('addField action called');
      try {
        const response = await fetch('http://localhost:5000/api/fields', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(field),
        });

        if (!response.ok) {
          throw new Error('Failed to add field');
        }

        const newField = await response.json();
        context.commit('addField', newField);
      } catch (error) {
        console.error('Error adding field:', error);
      }
    },
  },
  getters: {
    getAllFields: (state) => state.fields,
    getFieldById: (state) => (fieldId) => {
      console.log("Searching for field with ID:", fieldId);
      const field = state.fields.find(field => String(field.id) === fieldId);
      console.log("Found field:", field);
      return field || null;
    },
    getCultureColor: (state) => (culture) => state.cultureColors[culture] || '#CCCCCC',
    getCultureColors: (state) => state.cultureColors,
  },
});

function generateSimilarColor(existingColors) {
    if (existingColors.length === 0) {
        return getRandomColor();
    }

    const baseColor = existingColors[0];
    let hsl = hexToHSL(baseColor);

    hsl.h = (hsl.h + 30) % 360;

    return hslToHex(hsl);
}

function hexToHSL(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if(!result){
        return null;
    }
    var r= parseInt(result[1],16);
    var g= parseInt(result[2],16);
    var b= parseInt(result[3],16);
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    if(max == min){
        h = s = 0;
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: h * 360, s: s, l: l };
}

function hslToHex(hsl) {
    var h = hsl.h / 360;
    var s = hsl.s;
    var l = hsl.l;
    var r, g, b;
    if(s == 0){
        r = g = b = l;
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    var componentToHex = function componentToHex(c) {
        var hex = Math.round(c * 255).toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

export default store;