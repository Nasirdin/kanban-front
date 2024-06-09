<script setup lang="ts">
import { defineProps } from "vue";
import Card from "./Card.vue";
import { updateTaskStatus, type TaskResponse } from "@/api";

const props = defineProps<{
  category: {
    id: number;
    title: string;
    categoryId: number;
    type: string;
  };
  tasks: TaskResponse[];
}>();

const emits = defineEmits(["dropTask"]);

function handleDragOver(event: DragEvent): void {
  event.preventDefault();
}

async function handleDrop(event: DragEvent): Promise<void> {
  event.preventDefault();
  const data = event.dataTransfer!.getData("text/plain");
  const droppedTask = JSON.parse(data);
  console.log("Dropped Task:", droppedTask);

  try {
    if (droppedTask.status !== props.category.type) {
      await updateTaskStatus(props.category.type, droppedTask.id);
      emits("dropTask", props.category.type, droppedTask);
    }
  } catch (error) {
    console.error("Error updating task status:", error);
  }
}
</script>

<template>
  <div
    :class="['col', category.type]"
    @dragover="handleDragOver"
    @drop="handleDrop"
  >
    <div class="col__header">
      <h3 class="col__title">{{ category.title }}</h3>
    </div>

    <div class="col__cards">
      <Card v-for="task in tasks" :key="task.id" :task="task" />
    </div>
  </div>
</template>

<style scoped>
.col {
  width: 280px;
  border: 1px dashed #d9d9d9;
  min-height: 80vh;
  border-radius: 6px;
  overflow: hidden;
}
.col__header {
  background-color: #fff;
  padding: 10px;
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 20px;
}

.col__header::before {
  position: absolute;
  content: "";
  left: 0;
  top: 0;
  width: 8px;
  height: 100%;
}

.new .col__header::before {
  background-color: #feb700;
}
.inProcess .col__header::before {
  background-color: #0084fe;
}
.fail .col__header::before {
  background-color: #fe0000;
}
.successful .col__header::before {
  background-color: #03d967;
}
.col__title {
  font-size: 16px;
  margin-left: 10px;
  font-weight: 500;
}
</style>
