<script setup>
import { useCinemaStore } from '@/stores/cinema'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const cinemaStore = useCinemaStore()
const route = useRoute()

onMounted(() => {
  getData()
})

// -------------------

const isLoaded = ref(false)
const getData = async () => {
  await cinemaStore.getMovieSessions(route.params.id)
  selectedDate.value = cinemaStore.moviesSessions[0]?.showdate
  isLoaded.value = true
}

// -------------------

const selectedDateIndex = ref(0)
const selectedDate = ref(null)

const selectDate = dayIndex => {
  selectedDateIndex.value = dayIndex
  selectedDate.value = cinemaStore.moviesSessions[dayIndex].showdate
}

// -------------------

const selectedTimeIndex = ref(null)
const selectedTime = ref(null)

const selectTime = timeIndex => {
  selectedTimeIndex.value = timeIndex
  selectedTime.value = dayTimeArray.value[timeIndex]
}

const dayTimeArray = computed(() => {
  if (selectedDateIndex.value == null) return []
  return cinemaStore.moviesSessions[selectedDateIndex.value]?.daytime.split(';')
})

// -------------------

</script>

<template>
  <v-card variant="tonal" :loading="!isLoaded">
    <v-card-title>Session schedule</v-card-title>

    <v-card-subtitle>Choose a date</v-card-subtitle>
    <v-card-text class="mx-n2">
      <v-chip
          v-for="(day, index) in cinemaStore.moviesSessions"
          :key="day.showdate"
          class="ma-1"
          variant="flat"
          :color="selectedDateIndex === index ? 'green-lighten-1' : 'blue-grey-lighten-4'"
          @click="selectDate(index)"
      >
        {{ day.showdate }}
      </v-chip>
    </v-card-text>

    <template v-if="dayTimeArray?.length">
      <v-divider class="mb-4" />
      <v-card-subtitle>Choose a time</v-card-subtitle>
      <v-card-text class="mx-n2">
        <v-chip
            v-for="(time, index) in dayTimeArray"
            :key="time"
            class="ma-1"
            variant="flat"
            :color="selectedTimeIndex === index ? 'green-lighten-1' : 'blue-grey-lighten-4'"
            @click="selectTime(index)"
        >
          {{ time }}
        </v-chip>
      </v-card-text>
    </template>

    <v-card-actions>
      <v-btn
        :disabled="!(selectedDate && selectedTime)"
        class="text-none"
        color="red"
        size="x-large"
        variant="flat"
        block
        :to="{ name: 'place', params: { id: route.params.id }, query: { date: selectedDate, time: selectedTime } }"
      >
        Choose a place
      </v-btn>
    </v-card-actions>
  </v-card>

</template>
