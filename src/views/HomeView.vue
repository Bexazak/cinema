<script setup>
import { useCinemaStore } from '@/stores/cinema'
import { onMounted, ref } from 'vue'
import MovieCard from '@/components/cinema/MovieCard.vue'

const cinemaStore = useCinemaStore()

const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  await cinemaStore.getAllMovies()
  isLoading.value = false
})

</script>

<template>
  <v-card variant="flat" :loading="isLoading">
    <v-card-title>
      Movies are in theaters today
    </v-card-title>
    <v-card-text>
      <v-row v-if="cinemaStore.movies.length">
        <v-col
            v-for="movie in cinemaStore.movies"
            :key="movie.id"
            xs="6"
            sm="4"
            md="2"
            lg="3"
            xl="3"
        >
          <MovieCard :movie="movie" />
        </v-col>
      </v-row>

      <v-alert
          v-else
          title="No movies found"
          text="Please specify your search query"
          color="primary"
          variant="tonal"
      />

    </v-card-text>
  </v-card>
</template>
