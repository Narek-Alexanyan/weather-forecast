<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentTemp: {
    type: Number,
    required: true
  },
  currentIcon: {
    type: String,
    required: true
  }
})

const iconUrl = computed(() => {
  return `https://openweathermap.org/img/wn/${props.currentIcon}.png`
})
</script>

<template>
  <div class="mb-8 bg-white w-fit rounded-lg p-4 shadow-md text-center">
    <img :src="iconUrl" :alt="props.currentTemp" />
    <span>{{ props.currentTemp }} °C</span>
    <span class="block">Now</span>
  </div>
</template>

<style scoped></style>
