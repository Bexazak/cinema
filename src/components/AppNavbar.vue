<script setup>
import {ref, watch} from 'vue'
import {useCinemaStore} from '@/stores/cinema'

const cinemaStore = useCinemaStore()

const itemsGenre = [
  {title: 'Action', value: 0},
  {title: 'Adventures', value: 1},
  {title: 'Comedy', value: 2},
  {title: 'Drama', value: 3},
  {title: 'Horror', value: 4},
  {title: 'Westerns', value: 5}
]

const isLoading = ref(false)

const search = ref({
  name: '',
  genre: null
})

const timer = ref()

watch(search.value, (value) => {
  clearTimeout(timer.value)
  timer.value = setTimeout(async () => {
    isLoading.value = true
    await cinemaStore.searchMovie(value)
    isLoading.value = false
  }, 500)
})


</script>
<template>
  <v-card :loading="isLoading" :disabled="isLoading">
    <v-card-title>Search</v-card-title>
    <v-divider/>
    <v-card-text>
      <v-text-field
          v-model="search.name"
          density="compact"
          label="Search"
          rounded="lg"
          variant="solo-filled"
          flat
          hide-details
          single-line
          class="mb-6"
      ></v-text-field>

      <v-select
          v-model="search.genre"
          :items="itemsGenre"
          label="Genre"
          density="compact"
          rounded="lg"
          variant="solo-filled"
          flat
          hide-details
          single-line
      ></v-select>
    </v-card-text>
  </v-card>
</template>