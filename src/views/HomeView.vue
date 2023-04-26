<script setup>
import { usePreferredCitiesStore } from '@/stores/preferredCities'
import Autocomplete from '@/components/ui/Autocomplete.vue'
import PreferredCitiesList from '@/components/preferredCities/PreferredCitiesList.vue'
import WeatherForecast from '@/components/weather/WeatherForecast.vue'

const citiesStore = usePreferredCitiesStore()

const addPreferredCity = (city) => {
  citiesStore.addCity(city)
}
</script>

<template>
  <main class="container mt-10">
    <div class="px-6">
      <div class="flex gap-6 shadow-box p-4">
        <PreferredCitiesList />
        <Autocomplete @select="addPreferredCity" />
      </div>
    </div>
    <WeatherForecast />
  </main>
</template>
