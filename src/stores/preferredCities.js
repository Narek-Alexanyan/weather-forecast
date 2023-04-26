import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePreferredCitiesStore = defineStore('preferredCities', () => {
  const cities = ref([])
  const selectedCity = ref('')

  const addCity = (city) => {
    if (!cities.value.includes(city)) {
      cities.value.push(city)
    }
  }

  const deleteCity = (city) => {
    cities.value = cities.value.filter(elem => elem !== city)
  }

  const selectCity = (city) => {
    selectedCity.value = city
  }

  return { cities, selectedCity, addCity, deleteCity, selectCity }
}, {
  persist: {
    key: 'preferredCities'
  }
})