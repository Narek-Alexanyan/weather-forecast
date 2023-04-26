<script setup>
import { computed, ref } from 'vue'
import Modal from '../ui/Modal.vue'

const props = defineProps({
  city: String,
  selectedCity: String
})

const emit = defineEmits('deleteItem', 'selectCity')

const isModalOpen = ref(false)

const selected = computed(() => {
  return props.selectedCity === props.city
})

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}
</script>

<template>
  <div
    :class="{ '!bg-app_color-light-blue text-white': selected }"
    class="flex justify-between items-center bg-white py-4 px-5 text-gray-900 hover:bg-app_color-blue hover:text-white cursor-pointer border-b border-gray-200"
    @click="emit('selectCity', props.city)"
  >
    {{ props.city }}
    <button @click.stop="openModal">delete</button>
  </div>
  <Modal :is-open="isModalOpen" @closeModal="closeModal" @action="emit('deleteItem', props.city)" />
</template>

<style lang="scss" scoped></style>
