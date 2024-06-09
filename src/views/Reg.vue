<script lang="ts">
import { defineComponent, ref, type Ref } from "vue";
import { createUser, type CreateUserRequest, type Response } from "../api";
import { useRouter } from "vue-router";

interface RegSetup {
  username: Ref<string>;
  login: Ref<string>;
  password: Ref<string>;
  response: Ref<Response | null>;
  error: Ref<string | null>;
  handleSubmit: () => Promise<void>;
}

export default defineComponent({
  name: "Reg",
  setup(): RegSetup {
    const username = ref("");
    const login = ref("");
    const password = ref("");

    const response = ref<Response | null>(null);
    const error = ref<string | null>(null);

    const router = useRouter();

    const handleSubmit = async () => {
      const newUser: CreateUserRequest = {
        username: username.value,
        login: login.value,
        password: password.value,
      };
      try {
        const res = await createUser(newUser);
        console.log(res);

        if (res.success) {
          router.push("/signin");
        }
      } catch (error) {
        console.log(error);
      }
    };
    return {
      username,
      login,
      password,
      response,
      error,
      handleSubmit,
    };
  },
});
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
        <a class="authForm__link" href="#/login">Войти</a>
      </form>
    </div>
  </div>
</template>
