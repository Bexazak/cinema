<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps({
  ticket: {
    type: Object,
    default: () => {}
  }
})
const emit = defineEmits(['goToBookTicket'])

const bookInfoDict = {
  movie_id: 'Movie ID',
  row: 'Row',
  seat: 'Seat',
  showdate: 'Date',
  daytime: 'Time',
  ticketkey: 'Ticket KEY'
}

const goToHomePage = () => {
  emit('goToBookTicket')
  router.push({ name: 'home' })
}

</script>

<template>
  <v-card variant="text">
    <v-card-title class="pb-4">
      Super! You booked a movie ticket! <br> Have a nice viewing.
    </v-card-title>

    <v-divider />

    <v-list lines="two" class="py-4">
      <v-list-item
          v-for="(item, key) in bookInfoDict"
          :key="key"
          :subtitle="props.ticket[key]"
          :title="bookInfoDict[key]"
      />
    </v-list>

    <v-divider />

    <v-card-actions class="pt-6 flex-column flex-sm-row">
      <v-btn
          class="text-none d-flex justify-center mb-4 mb-sm-0"
          color="primary"
          size="x-large"
          variant="flat"
          width="300px"
          @click="goToHomePage"
      >
        Go to home page
      </v-btn>

      <v-spacer/>

      <v-btn
          class="text-none d-flex justify-center ma-0"
          color="green"
          size="x-large"
          variant="flat"
          width="300px"
          @click="emit('goToBookTicket')"
      >
        Buy more
      </v-btn>

    </v-card-actions>
  </v-card>

</template>