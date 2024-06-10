<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getAllTasks, updateTaskStatus, type TaskResponse } from "@/api";
import { io } from "socket.io-client";
import Col from "./Col.vue";
import CreateTask from "./CreateTask.vue";
import Notification from "./Notification.vue";

interface Categories {
  id: number;
  title: string;
  categoryId: number;
  type: string;
}

const socket = io("https://kanban-o-335926ee38b9.herokuapp.com");
// const socket = io("http://localhost:8080");

const props = defineProps<{
  modalVisible: boolean;
}>();

const showNotification = ref(false);

const emits = defineEmits(["closeModal"]);

const allTask = ref<TaskResponse[]>([]);

const addNewTask = async () => {
  try {
    showNotification.value = true;
    setTimeout(() => {
      showNotification.value = false;
    }, 3000);
  } catch (error) {
    console.error("Произошла ошибка:", error);
  }
};

onMounted(async () => {
  await refreshTasks();

  socket.on("taskUpdated", async () => {
    await refreshTasks();
  });
  socket.on("newTaskCreated", async (createdTask: TaskResponse) => {
    allTask.value.push(createdTask);
    addNewTask();
  });
  // socket.on("taskDeleted", async () => {
  //   await refreshTasks();
  // });
});

const refreshTasks = async () => {
  const tasks = await getAllTasks();
  allTask.value = tasks;
};
const categories: Categories[] = [
  {
    id: 0,
    title: "Новые",
    categoryId: 0,
    type: "new",
  },
  {
    id: 1,
    title: "В работе",
    categoryId: 1,
    type: "inProcess",
  },
  {
    id: 2,
    title: "Сделка провалена",
    categoryId: 2,
    type: "fail",
  },
  {
    id: 3,
    title: "Успешная сделка",
    categoryId: 3,
    type: "successful",
  },
];

const getTasksByCategory = (status: string) => {
  return allTask.value.filter((task) => task.status === status);
};
const handleDropTask = async (
  categoryType: string,
  droppedTask: TaskResponse
) => {
  try {
    if (droppedTask.status !== categoryType) {
      await updateTaskStatus(categoryType, droppedTask.id);
      await refreshTasks();
    }
  } catch (error) {
    console.error("Error updating task status:", error);
  }
};
</script>

<template>
  <div class="kanban">
    <Col
      v-for="category in categories"
      :key="category.id"
      :category="category"
      :tasks="getTasksByCategory(category.type)"
      @dropTask="handleDropTask"
    />
  </div>

  <CreateTask v-if="props.modalVisible" @closeModal="$emit('closeModal')" />
  <Notification v-if="showNotification" />
</template>

<style scoped>
.kanban {
  display: flex;
  justify-content: space-between;
  gap: 6px;
}
</style>
