<template>
  <div class="notification">
    <p class="notification__text">Пользователь 1 добавил новую задачу</p>
  </div>
</template>

<style scoped>
.notification {
  position: absolute;
  background-color: #04d76699;
  top: -150%;
  left: 50%;
  transform: translateX(-50%);
  padding: 15px 20px;
  border-radius: 6px;
  color: #fff;
  animation: notification 3s;
}

@keyframes notification {
  0% {
    top: -150%;
  }
  10% {
    top: 20px;
  }
  80% {
    top: 20px;
  }
  100% {
    top: -150%;
  }
}
</style>
