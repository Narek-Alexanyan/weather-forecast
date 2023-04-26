<script setup>
import { usePreferredCitiesStore } from '@/stores/preferredCities'
import Autocomplete from '@/components/ui/Autocomplete.vue'
import PreferredCitiesList from '@/components/preferredCities/PreferredCitiesList.vue'
import WetherForecast from '@/components/wether/WetherForecast.vue'

const citiesStore = usePreferredCitiesStore()

const addPreferredCity = (city) => {
  citiesStore.addCity(city)
}
</script>

<template>
  <main class="container mt-10">
    <div class="flex gap-6 px-6">
      <PreferredCitiesList />
      <Autocomplete @select="addPreferredCity" />
    </div>
    <WetherForecast />
  </main>
</template>
