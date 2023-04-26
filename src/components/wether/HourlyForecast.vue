<script setup>
const props = defineProps({
  hourlyForecast: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div
    class="bg-white w-full rounded-lg p-4 shadow-md text-center flex items-center overflow-x-auto gap-8"
  >
    <div
      v-for="(hour, index) in props.hourlyForecast"
      :key="index"
      class="min-w-fit flex flex-col items-center"
    >
      <img :src="hour.iconUrl" :alt="hour.temp" />
      <span>{{ hour.temp }} °C</span>
      <span class="block">{{ hour.date }} {{ hour.meridiem }}</span>
    </div>
  </div>
</template>

<style scoped></style>
