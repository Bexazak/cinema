<script setup>
const props = defineProps({
  cart: {
    type: Object,
    default: () => {}
  }
})

</script>

<template>
  <div class="d-flex">
    <v-sheet
        border="sm"
        class="pa-4 mr-6"
        min-width="200"
        rounded="md"
    >
      <div class="caption">Date</div>
      <span class="font-weight-bold">{{ props.cart.showdate }}</span>
    </v-sheet>

    <v-sheet
        border="sm"
        class="pa-4 mr-6"
        min-width="200"
        rounded="md"
    >
      <div class="caption">Time</div>
      <span class="font-weight-bold">{{ props.cart.daytime }}</span>
    </v-sheet>

    <v-sheet
        border="sm"
        class="pa-4 mr-6"
        min-width="200"
        rounded="md"
    >
      <div class="caption">Row</div>
      <span class="font-weight-bold">{{ props.cart.row || '---' }}</span>
    </v-sheet>

    <v-sheet
        border="sm"
        class="pa-4"
        min-width="200"
        rounded="md"
    >
      <div class="caption">Seat</div>
      <span class="font-weight-bold">{{ props.cart.seat || '---' }}</span>
    </v-sheet>
  </div>
</template>