<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppNavbar from '@/components/AppNavbar.vue'

console.log(import.meta.env.BASE_URL)
</script>

<template>
  <v-app id="inspire">
    <AppHeader/>

    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col cols="12" sm="12" md="3" lg="2">
            <AppNavbar/>
          </v-col>

          <v-col cols="12" sm="12" md="9" lg="10">
            <v-sheet
                min-height="70vh"
                rounded="lg"
                class="pa-6"
            >
              <RouterView/>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>