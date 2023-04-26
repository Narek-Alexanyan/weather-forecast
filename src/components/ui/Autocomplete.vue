<script setup>
import { ref, onMounted } from 'vue'
import { Loader } from '@googlemaps/js-api-loader'
import { GOOGLE_API_KEY } from '@/config.js'

const emit = defineEmits(['select'])

const autocompleteInput = ref('')
const predictions = ref([])
let autocompleteService

onMounted(() => {
  const loader = new Loader({
    apiKey: GOOGLE_API_KEY,
    libraries: ['places']
  })

  loader.load().then((google) => {
    autocompleteService = new google.maps.places.AutocompleteService()
  })
})

const onInputChange = (e) => {
  const autocompleteValue = e.target.value
  if (autocompleteValue.length > 0) {
    const request = {
      input: autocompleteValue,
      types: ['(cities)']
    }

    autocompleteService.getPlacePredictions(request, (results, status) => {
      if (status === 'OK') {
        predictions.value = results.map((result) => {
          return { description: result.description.split(',')[0], place_id: result.place_id }
        })
      } else {
        predictions.value = []
      }
    })
  } else {
    predictions.value = []
  }
}

const onSelect = (city) => {
  emit('select', city.description)
  predictions.value = []
  autocompleteInput.value = null
}
</script>

<template>
  <div class="relative mt-1 w-72">
    <div
      class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
    >
      <input
        placeholder="Enter your location"
        type="text"
        v-model="autocompleteInput"
        @input="onInputChange"
        class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 focus:outline-none"
      />
    </div>
    <div>
      <ul
        v-if="predictions.length"
        class="absolute mt-1 z-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm no-scrollbar"
      >
        <li
          v-for="prediction in predictions"
          :key="prediction.place_id"
          class="relative flex items-center justify-between cursor-default select-none py-2 px-4 text-gray-900 hover:bg-app_color-blue hover:text-white"
        >
          <span class="block truncate font-normal">{{ prediction.description }}</span>
          <button @click="onSelect(prediction)" class="">Add</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
