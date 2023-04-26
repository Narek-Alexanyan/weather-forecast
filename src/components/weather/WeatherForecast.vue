<script setup>
import { storeToRefs } from 'pinia'
import { onMounted, watch, onUnmounted } from 'vue'
import { usePreferredCitiesStore } from '@/stores/preferredCities'
import useWeatherData from '@/composables/useWeatherData'
import CurrentWeather from './CurrentWeather.vue'
import DailyForecast from './DailyForecast.vue'
import HourlyForecast from './HourlyForecast.vue'
import RefreshIcon from '@/components/ui/icons/RefreshIcon.vue'

const citiesStore = usePreferredCitiesStore()
const { selectedCity } = storeToRefs(citiesStore)

const { currentTemp, currentIcon, dailyForecast, hourlyForecast, fetchWeatherData } =
  useWeatherData()

let updateInterval

onMounted(() => {
  if (selectedCity.value) {
    getCurrentWetherData()
    updateInterval = setInterval(getCurrentWetherData, 60 * 1000)
  }
})

watch(selectedCity, (newCity) => {
  fetchWeatherData(newCity)
})

onUnmounted(() => {
  clearInterval(updateInterval)
})

const getCurrentWetherData = () => {
  fetchWeatherData(selectedCity.value)
}
</script>

<template>
  <div class="container relative mx-auto p-6">
    <div class="shadow-box p-4">
      <template v-if="selectedCity">
        <div class="absolute top-8 right-8 flex items-center gap-2 text-white">
          <button @click="getCurrentWetherData">
            <RefreshIcon class="w-6 h-6 cursor-pointer" />
          </button>
          <h4>Update</h4>
        </div>
        <h2 class="text-2xl text-white font-bold mb-4">
          Current Weather in {{ citiesStore.selectedCity }}
        </h2>
        <CurrentWeather :current-temp="currentTemp" :current-icon="currentIcon" />
        <h2 class="text-2xl text-white font-bold mb-4">
          Daily Forecast for {{ citiesStore.selectedCity }}
        </h2>
        <DailyForecast :daily-forecast="dailyForecast" />
        <h2 class="text-2xl text-white font-bold mt-8 mb-4">
          Hourly Forecast for {{ citiesStore.selectedCity }}
        </h2>
        <HourlyForecast
          :hourly-forecast="hourlyForecast"
          class="bg-white w-full rounded-lg p-4 shadow-md text-center flex items-center"
        />
      </template>
      <div v-else>No City chosen</div>
    </div>
  </div>
</template>
