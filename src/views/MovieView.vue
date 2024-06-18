<script setup>
import { useCinemaStore } from '@/stores/cinema'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import SessionSchedule from '@/components/cinema/SessionSchedule.vue'
const route = useRoute()

const cinemaStore = useCinemaStore()

onMounted(async () => {
  await cinemaStore.getMovie(route.params.id)
})


</script>
<template>
  <v-card variant="flat">
    <v-row>
      <v-col xs="12" sm="12" md="12" lg="6" xl="3">
        <v-img :src="cinemaStore.movie.image"  />
      </v-col>
      <v-col xs="12" sm="12" md="12" lg="6" xl="6">
        <v-card-title class="text-h4 font-weight-bold mt-n3">{{ cinemaStore.movie.name }}</v-card-title>
        <v-card-text>
          <div class="movie-additional" v-html="cinemaStore.movie.additional" />
          <p class="mt-8" v-html="cinemaStore.movie.description" />
        </v-card-text>
      </v-col>
      <v-col xs="12" sm="12" md="12" lg="12" xl="3">
        <SessionSchedule />
      </v-col>
    </v-row>
  </v-card>
</template>

<style>
.movie-additional ul li {
  display: flex;
  margin-bottom: 5px;
}
.movie-additional ul li .key {
  font-weight: bold;
  margin-right: 24px;
  min-width: 180px;
}
</style>