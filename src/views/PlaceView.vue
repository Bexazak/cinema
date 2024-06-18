<script setup>
import { useCinemaStore } from '@/stores/cinema'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import SessionInfoBlock from '@/components/cinema/SessionInfoBlock.vue'
import PurchasedTicket from '@/components/cinema/PurchasedTicket.vue'

const route = useRoute()
const cinemaStore = useCinemaStore()

onMounted(() => {
  getData()
})

const getData = async () => {
  let { id } = route.params
  let { date, time } = route.query
  let data = { id, date, time }
  await cinemaStore.getMovieSessionsPlaces(data)
}

const cart = ref({
  row: null,
  seat: null,
  movie_id: Number(route.params.id),
  showdate: route.query.date,
  daytime: route.query.time
})
const addSeatToCart = (row, seat) => {
  cart.value.row = row
  cart.value.seat = seat
}
const removeSeatFromCart = () => {
  cart.value.row = null
  cart.value.seat = null
}

const isSelectedSeat = computed(() => {
  return (row, seat) => seat === cart.value.seat && row === cart.value.row
})

const isLoading = ref(false)
const handleBookTicket = async () => {
  isLoading.value = true
  await cinemaStore.bookTicket(cart.value)
  isLoading.value = false
}

const isBookedTicket = computed(() => {
  return !!Object.keys(cinemaStore.bookPlace).length
})

const goToBookTicket = () => {
  cinemaStore.clearBookTicket()
  removeSeatFromCart()
}

</script>

<template>
  <v-card variant="flat" :loading="isLoading">

    <PurchasedTicket
        v-if="isBookedTicket"
        :ticket="cinemaStore.bookPlace"
        @goToBookTicket="goToBookTicket"
    />

    <template v-else>

      <v-card-text>
        <v-btn
            class="text-none mb-6"
            color="primary"
            variant="tonal"
            :to="{ name: 'movie', params: { id: route.params.id }}"
        >
          Go back
        </v-btn>

        <SessionInfoBlock :cart="cart" />
      </v-card-text>

      <v-card-title>Choose a place</v-card-title>

      <v-card-text>
        <v-sheet
            border="sm"
            class="place pa-4 mr-6"
            min-width="100%"
            rounded="md"
        >

          <div class="place-screen mx-auto my-8 text-center">Screen</div>

          <div class="place-wrapper">
            <div
                v-for="row in cinemaStore.movieSessionPlaces"
                :key="row[0].row"
                class="place-row d-flex align-center"
            >
              <div class="place-row--label">Row {{ row[0].row }}</div>
              <div
                  v-for="col in row[1]"
                  :key="col.seat"
                  class="place-seat"
                  :class="{
                    'occupied-seat': !col.is_free,
                    'selected-seat': isSelectedSeat(row[0].row, col.seat)
                  }"
                  v-ripple="col.is_free"
                  @click="col.is_free ? addSeatToCart(row[0].row, col.seat) : void(0)"
              />
            </div>
          </div>
        </v-sheet>
      </v-card-text>

      <v-card-actions class="d-flex justify-center">
        <v-btn
            :disabled="!(cart.row && cart.seat)"
            :loading="isLoading"
            class="text-none d-flex justify-center"
            color="red"
            size="x-large"
            variant="flat"
            width="300px"
            @click="handleBookTicket"
        >
          Book ticket
        </v-btn>
      </v-card-actions>

    </template>

  </v-card>
</template>

<style scoped>
.place-wrapper {
  max-width: 1250px;
  overflow-x: auto;
  margin: 0 auto;
}
.place-screen {
  width: 100%;
  max-width: 600px;
  border-top: 4px solid gray;
  padding-top: 10px;
  font-size: 22px;
}
.place-row {
  min-width: 1250px;
  display: flex;
}
.place-row--label {
  min-width: 55px;
}
.place-seat {
  border: 1px solid blue;
  min-width: 20px;
  height: 30px;
  margin: 4px;
  border-radius: 3px;
  cursor: pointer;
}
.place-seat.occupied-seat {
  border-color: red;
  background-color: red;
  cursor: default;
}
.place-seat.selected-seat {
  border-color: aquamarine;
  background-color: aquamarine;
}

</style>