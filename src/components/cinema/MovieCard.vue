<script setup>

const pr = defineProps({
  movie: {
    type: Object,
    default: () => {}
  }
})

const genreDict = {
  0: 'Action',
  1: 'Adventures',
  2: 'Comedy',
  3: 'Drama',
  4: 'Horror',
  5: 'Westerns'
}

</script>

<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
        variant="tonal"
        color="indigo"

    >
      <router-link
          :to="{ name: 'movie', params: { id: pr.movie.id } }"
          class="text-decoration-none"
          v-bind="props"
      >
        <v-img
            class="align-end text-white"
            height="344"
            :src="pr.movie.image"
            cover
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        >
            <v-card-title class="white-space-normal">{{pr.movie.name}}</v-card-title>

          <v-expand-transition>
            <div
                v-if="isHovering"
                class="d-flex flex-column transition-fast-in-fast-out bg-indigo v-card--reveal text-h2"
                style="height: 100%;"
            >
              <v-card-title class="white-space-normal text-center">{{pr.movie.name}}</v-card-title>
              <v-btn color="green" text="Book now" class="text-none"></v-btn>
            </div>
          </v-expand-transition>

        </v-img>
      </router-link>

      <v-card-text>
        <v-card-subtitle class="pl-0">
          Genre: <b>{{ genreDict[pr.movie.genre] }}</b>
        </v-card-subtitle>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<style scoped>
.white-space-normal {
  white-space: normal !important;
}
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .9;
  position: absolute;
  width: 100%;
}
</style>