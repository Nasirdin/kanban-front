<script setup lang="ts">
import { ref } from "vue";
import { createUser, type CreateUserRequest, type Response } from "../api";
import { useRouter } from "vue-router";

const username = ref("");
const login = ref("");
const password = ref("");

const router = useRouter();

const handleSubmit = async () => {
  const newUser: CreateUserRequest = {
    username: username.value,
    login: login.value,
    password: password.value,
  };
  try {
    const res = await createUser(newUser);

    if (res.success) {
      router.push("/signin");
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
        <h2 class="reg__title">Регистрация</h2>

        <label class="authForm__label"
          >Ваше имя<input
            class="authForm__input"
            type="text"
            v-model="username"
        /></label>
        <label class="authForm__label"
          >Придумайте логин<input
            class="authForm__input"
            type="text"
            v-model="login"
        /></label>

        <label class="authForm__label"
          >Придумайте пароль<input
            class="authForm__input"
            type="text"
            v-model="password"
        /></label>
        <button class="authForm__btn submitBtn">Регистрация</button>
        <a class="authForm__link" href="#/signin">Войти</a>
      </form>
    </div>
  </div>
</template>
