<template>
  <div class="camera-page">
    <div class="camera-component">
      <div class="camera-component">
        <h2 class="camera-component__title">Фотокамера</h2>
        <div class="camera-component__video-wrapper">
          <video
            ref="videoRef"
            autoplay
            playsinline
            muted
            class="camera-component__video"
          ></video>
        </div>
        <canvas ref="canvasRef" class="camera-component__canvas"></canvas>
        <div class="camera-component__controls">
          <button
            @click="takePhoto"
            :disabled="photos.length >= 10"
            class="camera-component__button camera-component__button--take-photo"
          >
            <font-awesome-icon icon="camera" class="camera-component__icon" />
            <span class="camera-component__button-text">Сделать снимок</span>
          </button>
        </div>
        <div class="photo-counter" v-if="photos.length < 10">
          <p class="photo-counter__text">
            Осталось фото: {{ 10 - photos.length }}
          </p>
        </div>
        <div class="photo-previews">
          <h3 class="photo-previews__title">Предварительные просмотры</h3>
          <div class="photo-previews__container">
            <div v-for="i in 10" :key="i" class="photo-previews__item">
              <div
                class="photo-previews__image-wrapper"
                v-if="photos[i - 1]"
              >
                <img
                  :src="photos[i - 1]"
                  alt="Captured Photo"
                  class="photo-previews__image"
                />
              </div>
              <div v-else class="photo-previews__placeholder"></div>
              <a
                v-if="photos[i - 1]"
                :href="photos[i - 1]"
                download="photo.png"
                class="photo-previews__download-link"
                >Скачать</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

library.add(faCamera);

const videoRef = ref(null);
const canvasRef = ref(null);
const photos = ref([]);
const isCameraRunning = ref(false);

const startCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment',
      },
      audio: false,
    });

    if (videoRef.value) {
      videoRef.value.srcObject = stream;
      videoRef.value.onloadedmetadata = () => {
        videoRef.value.play();
        isCameraRunning.value = true;
      };
    }
  } catch (err) {
    console.error('Error accessing camera:', err);
  }
};

const stopCamera = () => {
  if (videoRef.value && videoRef.value.srcObject) {
    const stream = videoRef.value.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach((track) => {
      track.stop();
    });

    videoRef.value.srcObject = null;
    isCameraRunning.value = false;
  }
};

const takePhoto = () => {
  if (videoRef.value && canvasRef.value) {
    const video = videoRef.value;
    const canvas = canvasRef.value;
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataURL = canvas.toDataURL('image/png');
    photos.value.push(dataURL);
  }
};

onMounted(() => {
  startCamera();
});

onBeforeUnmount(() => {
  stopCamera();
});
</script>

<style scoped>
.camera-page {
  position: relative;
  width: 100%;
  height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.camera-component {
  border-radius: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.camera-component {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 5px;
  box-sizing: border-box;
}

.camera-component__title {
  font-size: 19px;
  margin-bottom: 10px;
  color: #4b4a4a;
}

.camera-component__video-wrapper {
  width: 100%;
  height: 400px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
}

.camera-component__video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.camera-component__canvas {
  display: none;
}

.camera-component__controls {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 5px;
}

.camera-component__button {
  border: none;
  padding: 12px 24px;
  border-radius: 50px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
}

.camera-component__button--take-photo {
  background-color: #588e90;
  color: white;
  padding: 16px;
}

.camera-component__icon {
  margin-right: 8px;
  font-size: 16px;
}

.photo-counter {
  margin-top: 10px;
  text-align: center;
}

.photo-counter__text {
  font-size: 16px;
  color: v-bind(textColor);
}

.photo-previews {
  margin-top: 5px;
  text-align: center;
}

.photo-previews__title {
  font-size: 19px;
  margin-bottom: 10px;
  color: #4b4a4a;
}

.photo-previews__container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 420px;
  margin: 0 auto;
  max-height: 200px;
  padding: 10px;
}

.photo-previews__item {
  width: 60px;
  height: 60px;
  margin: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.photo-previews__image-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.photo-previews__image {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

.photo-previews__placeholder {
  width: 100%;
  height: 100%;
  background-color: #eee;
}

.photo-previews__download-link {
  display: block;
  padding: 3px;
  background-color: #8db79e;
  color: white;
  text-decoration: none;
  border-radius: 3px;
  font-size: 9px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
}
</style>