<script setup lang="ts">
import { getAllTasks, type TaskResponse } from "@/api";
import { io } from "socket.io-client";
import { defineEmits, onMounted, ref } from "vue";

// const socket = io("http://localhost:8080");
const socket = io("https://kanban-o-335926ee38b9.herokuapp.com");

const emit = defineEmits();
const taskCounts = ref({
  isNew: 0,
  inProcess: 0,
  failed: 0,
  success: 0,
});

const openModal = () => {
  emit("open-modal");
};
const tasksCount = async (status: string) => {
  const tasks = await getAllTasks();
  return tasks.filter((task) => task.status === status).length;
};

const refreshTasks = async () => {
  taskCounts.value.isNew = await tasksCount("new");
  taskCounts.value.inProcess = await tasksCount("inProcess");
  taskCounts.value.failed = await tasksCount("fail");
  taskCounts.value.success = await tasksCount("successful");
};

onMounted(async () => {
  refreshTasks();

  socket.on("taskUpdated", async () => {
    await refreshTasks();
  });
  socket.on("newTaskCreated", async () => {
    await refreshTasks();
  });
});
</script>

<template>
  <div class="boardHeader">
    <button class="boardHeader__createBtn" @click="openModal">
      Быстрая сделака
    </button>

    <ul class="boardHeader__items">
      <li class="boardHeader__item">
        <span class="boardHeader__count">{{ taskCounts.isNew }}</span
        >Новая
      </li>
      <li class="boardHeader__item">
        <span class="boardHeader__count">{{ taskCounts.inProcess }}</span
        >В работе
      </li>
      <li class="boardHeader__item">
        <span class="boardHeader__count">{{ taskCounts.failed }}</span
        >Сделка провалена
      </li>
      <li class="boardHeader__item">
        <span class="boardHeader__count">{{ taskCounts.success }}</span
        >Успешная сделка
      </li>
    </ul>
  </div>
</template>

<style scoped>
.boardHeader {
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
}
.boardHeader__createBtn {
  width: 280px;
  background-color: #fff;
  padding: 10px;
  border-radius: 6px;
  transition: 0.3s;
}
.boardHeader__createBtn:hover {
  background-color: #d6d6d6;
  transition: 0.3s;
}
.boardHeader__items {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 6px;
  padding: 10px 0;
}
.boardHeader__item {
  padding: 0px 20px;
  border-right: 1px solid #000;
}
.boardHeader__item:last-child {
  border: none;
}
.boardHeader__count {
  margin-right: 5px;
  color: #feb700;
}

.boardHeader__users {
  display: flex;
  justify-content: start;
}

.user-1,
.user-2,
.user-3,
.user-4,
.user-5 {
  width: 30px;
  height: 30px;
  border-radius: 50px;
}
.user-1 {
  background-color: green;
}
.user-2 {
  background-color: red;
  transform: translateX(-50%);
}
.user-3 {
  background-color: blue;
  transform: translateX(-100%);
}
.user-4 {
  background-color: black;
  transform: translateX(-150%);
}
.user-5 {
  background-color: grey;
  transform: translateX(-200%);
}
</style>
