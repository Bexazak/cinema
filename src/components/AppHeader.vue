<script setup>
const links = [
  { text: 'All movies', routeName: 'home' }
]

</script>

<template>
  <v-app-bar flat>
    <v-container class="mx-auto d-flex align-center justify-center">
      <v-avatar
        class="me-4 "
        color="grey-darken-1"
        size="32"
      ></v-avatar>

      <v-btn
        v-for="link in links"
        :key="link"
        :text="link.text"
        variant="text"
        :to="{ name: link.routeName }"
      ></v-btn>

      <v-spacer />

    </v-container>
  </v-app-bar>
</template>