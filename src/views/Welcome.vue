<template>
  <div class="welcome">
    <div class="container">
      <h1 class="welcome__title">Добро пожаловать! Я очень рад тебя видеть</h1>
      <p class="welcome__text">
        Чтобы продолжить, сначала
        <a class="welcome__link" href="#/signup">зарегистрируйтесь</a>. После
        регистрации вы сразу же попадете на страницу входа. Нужно будет
        авторизоваться, чтобы продолжить работать.
      </p>

      <div class="welcome__links">
        <a class="welcome__link-btn submitBtn" href="#/signup">Регистрация</a>
        <a class="welcome__link-btn submitBtn" href="#/signin">Войти</a>
      </div>
    </div>
  </div>
</template>
<style scoped>
.welcome {
  padding: 50px 0;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  display: flex;
  align-items: center;
}
.welcome__title {
  font-size: 32px;
  color: #feb700;
  text-align: center;
  margin-bottom: 3px;
}
.welcome__text {
  font-size: 18px;
  text-align: center;
  max-width: 700px;
  margin-bottom: 30px;
}

.welcome__link {
  color: #feb700;
}
.welcome__links {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
</style>
