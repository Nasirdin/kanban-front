<template>
  <div class="header">
    <div class="container">
      <button class="header__userIcon userIcon">
        <p class="userIcon__text">H</p>
      </button>

      <button class="header__out">Выйти</button>
    </div>
  </div>
</template>

<style scoped>
.header {
  padding: 20px 0;
}
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header__userIcon {
  background-color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header__userIcon:hover {
  background-color: #f9f9f9;
}
.userIcon__text {
  font-weight: 500;
  font-size: 20px;
  color: rgb(237, 142, 0);
}
.header__out {
  font-size: 16px;
}
</style>
