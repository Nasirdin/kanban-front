<script setup lang="ts">
import { ref } from "vue";
import { userLogin, type LoginRequest} from "../api";
import { useRouter } from "vue-router";

const login = ref("");
const password = ref("");
const router = useRouter();

const handleSubmit = async () => {
  const user: LoginRequest = {
    login: login.value,
    password: password.value,
  };

  try {
    const res = await userLogin(user);
    if (res.success) {
      router.push("/");
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="reg">
    <div class="container">
      <form class="reg__form authForm" @submit.prevent="handleSubmit">
        <h2 class="reg__title">Войти</h2>
        <label class="authForm__label"
          >Логин<input class="authForm__input" type="text" v-model="login"
        /></label>

        <label class="authForm__label"
          >Пароль<input class="authForm__input" type="text" v-model="password"
        /></label>
        <button class="authForm__btn submitBtn">Войти</button>
        <a class="authForm__link" href="#/signup">Регистрация</a>
      </form>
    </div>
  </div>
</template>
