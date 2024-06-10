<script setup lang="ts">
import { defineProps } from "vue";
import { deleteTask, type TaskResponse } from "@/api";

const props = defineProps<{
  task: TaskResponse;
}>();

function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  return new Date(dateString).toLocaleDateString(undefined, options);
}

const deleteTaskCard = async () => {
  if (confirm("Вы уверены, что хотите удалить эту задачу?")) {
    try {
      const id: number = props.task.id;
      await deleteTask(id);
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
    }
  }
};

function handleDragStart(event: DragEvent): void {
  const target = event.target as HTMLElement;
  target.classList.add("dragging");
  event.dataTransfer!.setData("text/plain", JSON.stringify(props.task));
}

function handleDragEnd(event: DragEvent): void {
  const target = event.target as HTMLElement;
  target.classList.remove("dragging");
}
</script>

<template>
  <div
    :class="['card', task.status]"
    draggable="true"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
  >
    <h3 class="card__title">{{ task.title }}</h3>
    <p class="card__text">{{ task.content }}</p>
    <p class="card__owner">{{ task.authorId }}</p>
    <button class="card__delete" @click="deleteTaskCard">Удалить</button>
    <p class="card__date">{{ formatDate(task.createdat) }}</p>
  </div>
</template>

<style scoped>
.card {
  width: 270px;
  border-radius: 6px;
  background-color: #fff;
  padding: 15px;
  position: relative;
  margin: 0 auto 10px;
  cursor: grab;
  transition: 0.3s all;
}

.card::before {
  position: absolute;
  content: "";
  width: 3px;
  height: calc(100% - 12px);
  left: 0;
  top: 6px;
  border-radius: 4px;
}

.new .card::before {
  background-color: #feb700;
}
.inProcess .card::before {
  background-color: #0084fe;
}
.fail .card::before {
  background-color: #fe0000;
}
.successful .card::before {
  background-color: #03d967;
}
.card__title {
  margin-bottom: 10px;
}
.card__text {
  margin-bottom: 10px;
}
.card__owner {
  color: #0084fe;
}
.card__date {
  text-align: right;
  color: #545454;
  font-size: 12px;
}

.card__delete {
  color: #fe0000;
  background: none;
}
</style>
