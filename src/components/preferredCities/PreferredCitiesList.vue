<script setup>
import { usePreferredCitiesStore } from '@/stores/preferredCities'
import useGeolocation from '@/composables/useGeolocation'
import PreferredCitiesItem from './PreferredCitiesItem.vue'

const citiesStore = usePreferredCitiesStore()

// get current location
useGeolocation()

const deleteCity = (city) => {
  citiesStore.deleteCity(city)
  if (city === citiesStore.selectedCity) {
    selectCity(citiesStore.cities[0])
  }
}

const selectCity = (city) => {
  citiesStore.selectCity(city)
}
</script>

<template>
  <div class="cities-list">
    <PreferredCitiesItem
      v-for="city in citiesStore.cities"
      :key="city"
      :city="city"
      :selectedCity="citiesStore.selectedCity"
      @deleteItem="deleteCity"
      @selectCity="selectCity"
    />
  </div>
</template>

<style lang="scss" scoped></style>
