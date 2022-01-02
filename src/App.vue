<script setup lang="ts">
import Kakaomap from './components/Kakaomap.vue';
import Filter from './components/Filter.vue';
import Result from './components/Result.vue';

import { computed, ref } from 'vue';
import { Restaurants } from './data/Restaurants'
import { RestaurantCategory } from './types/RestaurantCategory';
import { calcCrow } from './utils/distance';
import { DaimPosition } from './data/Daim';
import { Restaurant, RestaurantWithDistance } from './types/Restaurant';
import { UUID } from './types/UUID';

const distanceCalcedRestaurants = computed<RestaurantWithDistance[]>(() => Restaurants.map(r => {
  const distance = calcCrow(DaimPosition, r.position)
  return { ...r, distance }
}))

const filteredRestaurants = ref(distanceCalcedRestaurants.value)
const focusedRestaurant = ref<Restaurant>()

function filterRestaurants(categories: RestaurantCategory[], distance: number) {
  const categoryFiltered = categories.length === 0
    ? distanceCalcedRestaurants.value
    : distanceCalcedRestaurants.value.filter(r => categories.some(c => c === r.category))
  const distancedFiltered = categoryFiltered.filter(r => r.distance <= distance)
  filteredRestaurants.value = distancedFiltered
}

function onFocus(id: UUID) {
  focusedRestaurant.value = distanceCalcedRestaurants.value.find(dr => dr.id === id)
  console.log(focusedRestaurant.value)
}

function onUnfocus() {
  focusedRestaurant.value = undefined
}

</script>

<template>
  <div class="container">
    <h1>Daim Lunch</h1>
    <Kakaomap
      :restaurants="distanceCalcedRestaurants"
      :filtered-restaurants="filteredRestaurants"
      :focused-restaurant="focusedRestaurant"
      @focus="onFocus"
      @unfocus="onUnfocus"
    />
    <Filter @change="filterRestaurants" />
    <Result
      :restaurants="filteredRestaurants"
      :focused-restaurant="focusedRestaurant"
      @focus="onFocus"
    />
  </div>
</template>

<style scoped>
.container {
  margin-left: 15px;
  margin-right: 15px;
}
</style>
