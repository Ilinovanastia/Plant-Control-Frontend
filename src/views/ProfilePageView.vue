<template>
  <div class="profile-page">
    <div class="profile-component">
      <div class="profile-card__header">
        <div class="profile-card__avatar-wrapper">
          <img
            src="@/assets/photo_user.png"
            alt="Profile"
            class="profile-card__avatar"
          />
        </div>
      </div>
      <div class="profile-card__body">
        <div class="profile-card__title">
          <h2 class="profile-card__name">Даниил Розарев</h2>
          <p class="profile-card__email">denialrozar@gmail.com</p>
        </div>
        <div class="profile-card__info">
          <div class="profile-card__info-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="profile-card__icon"
            >
              <path
                d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
              ></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <div>
              <p class="profile-card__label">Имя пользователя</p>
              <p class="profile-card__value">danroz</p>
            </div>
          </div>
          <div class="profile-card__info-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="profile-card__icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            <div>
              <p class="profile-card__label">Местоположение</p>
              <p class="profile-card__value">Москва</p>
            </div>
          </div>
          <div class="profile-card__info-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="profile-card__icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <p class="profile-card__label">Дата регистрации</p>
              <p class="profile-card__value">15.05.2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  position: relative;
  width: 100%;
  height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-component {
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  height: auto;
  overflow: hidden;
}

.profile-card__header {
  height: 30vh;
  width: 100%;
  background-image: linear-gradient(
    to right,
    #609388,
    #508c7b,
    #588e90,
    #588e90
  );
  border-bottom-left-radius: 80% 100px;
  border-bottom-right-radius: 80% 100px;
  position: relative;
}

.profile-card__avatar-wrapper {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 100px;
  border-radius: 9999px;
  border: 4px solid white;
  background-color: #d1d5db;
  overflow: hidden;
}

.profile-card__avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-card__body {
  padding: 1rem;
}

.profile-card__title {
  text-align: center;
  margin-bottom: 1rem;
}

.profile-card__name,
.profile-card__email {
  color: #555;
  font-weight: 500;
  font-size: 16px;
}

.profile-card__info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-card__info-item {
  display: flex;
  align-items: center;
}

.profile-card__icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
  flex-shrink: 0;
  color: #588e90;
}

.profile-card__label {
  font-size: 14px;
  color: #777;
  margin-bottom: 2px;
}

.profile-card__value {
  font-size: 16px;
  font-weight: 500;
  color: #555;
}
</style>