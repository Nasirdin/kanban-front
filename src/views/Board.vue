<script setup lang="ts">
import { ref } from "vue";
import BoardHeader from "../components/BoardHeader.vue";
import Kanban from "../components/Kanban.vue";
import Header from "@/components/Header.vue";

const modalVisible = ref(false);

const openModal = () => {
  modalVisible.value = true;
};
const closeModal = () => {
  modalVisible.value = false;
};
</script>

<template>
  <Header />
  <div class="container">
    <BoardHeader @open-modal="openModal" />
    <Kanban :modalVisible="modalVisible" @close-modal="closeModal" />
  </div>
</template>
