<script setup lang="ts">
import { createTask, type TaskRequest } from "@/api";
import { ref, defineEmits } from "vue";

const emit = defineEmits();
const title = ref("");
const description = ref("");

const closeModal = () => {
  emit("closeModal");
};

const submitForm = async () => {
  const authorId: number = JSON.parse(localStorage.getItem("user.id")!);
  const newTask: TaskRequest = {
    title: title.value,
    description: description.value,
    authorId: authorId,
    status: "new",
  };

  try {
    const res = await createTask(newTask);

    if (res.success) {
      closeModal();
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="createTask">
    <div class="createTask__content">
      <button class="createTask__close" @click="closeModal">
        <img
          class="createTask__back"
          src="../assets/icon/arrow-left.png"
          alt="#"
        />Назад
      </button>
      <h2 class="createTask__title">Быстрая сделка</h2>

      <form class="createTask__form" @submit.prevent="submitForm">
        <label class="createTask__label">
          Название
          <input type="text" class="createTask__input" v-model="title" />
        </label>
        <label class="createTask__label">
          Описание
          <input type="text" class="createTask__input" v-model="description" />
        </label>
        <button type="submit" class="createTask__submit submitBtn">
          Создать
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.createTask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
}
.createTask__content {
  width: 600px;
  background-color: #fff;
  border-radius: 6px;
  padding: 30px 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.createTask__close {
  margin-bottom: 15px;
  background: none;
  font-size: 16px;
  transition: 0.2s;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
}
.createTask__back {
  width: 15px;
}
.createTask__close:hover {
  transition: 0.2s;
  color: #979797;
}
.createTask__title {
  margin-bottom: 20px;
}
.createTask__form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.createTask__label {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.createTask__input {
  border: 1px solid #979797;
  padding: 10px 15px;
  border-radius: 6px;
}
</style>
