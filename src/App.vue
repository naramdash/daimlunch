<script setup lang="ts">
import Kakaomap from './components/Kakaomap.vue';
import Filter from './components/Filter.vue';
import Result from './components/Result.vue';

import { ref } from 'vue';
import { Restaurants } from './data/Restaurants'
import { RestaurantCategory } from './types/RestaurantCategory';

const filteredRestaurants = ref(Restaurants)

function filterRestaurants(categories: RestaurantCategory[], distance: number) {
  const categoryFiltered = categories.length === 0
    ? Restaurants
    : Restaurants.filter(r => categories.some(c => c === r.category))

  const distancedFiltered = categoryFiltered
  // TODO

  filteredRestaurants.value = distancedFiltered
}

</script>

<template>
  <h1>Daim Lunch</h1>
  <Kakaomap
    :restaurants="Restaurants"
    :filtered-restaurants="filteredRestaurants"
    :focused-restaurant="undefined"
  />
  <Filter @change="filterRestaurants" />
  <Result :restaurants="filteredRestaurants" />
</template>

<style>
</style>
