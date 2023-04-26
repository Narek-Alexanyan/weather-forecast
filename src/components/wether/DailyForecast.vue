<script setup>
const props = defineProps({
  dailyForecast: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="bg-white w-fit rounded-lg p-4 shadow-md text-center flex items-center gap-6">
    <div v-for="(day, index) in props.dailyForecast" :key="index">
      <img :src="day.iconUrl" :alt="day.temp" />
      <span>{{ day.temp }} °C</span>
      <span class="block">{{ day.date }}</span>
    </div>
  </div>
</template>

<style scoped></style>
