<script setup lang="ts">
import { useTestStore } from './Store/TestStore';
const testStore = useTestStore();
</script>

<template>
  <div>
    <h1>{{testStore.message}}</h1>
    <button @click="testStore.setMessage('Hola a todos con pinia')" >Change Message</button>
  </div>
</template>
