<script setup lang="ts">
import Kakaomap from './components/Kakaomap.vue';
import Filter from './components/Filter.vue';
import Result from './components/Result.vue';

import { ref } from 'vue';
import { DistanceCalcedRestaurants } from './data/Restaurants'
import { RestaurantCategory } from './types/RestaurantCategory';
import { Restaurant } from './types/Restaurant';
import { UUID } from './types/UUID';
import VueLogo from './assets/vuelogo.png'
import GitHub from './components/GitHub.vue';

const filteredRestaurants = ref(DistanceCalcedRestaurants)
const focusedRestaurant = ref<Restaurant>()

function filterRestaurants(categories: RestaurantCategory[], distance: number) {
  const categoryFiltered = categories.length === 0
    ? DistanceCalcedRestaurants
    : DistanceCalcedRestaurants.filter(r => categories.some(c => c === r.category))
  const distancedFiltered = categoryFiltered.filter(r => r.distance <= distance)
  filteredRestaurants.value = distancedFiltered
}

function onFocus(id: UUID) {
  focusedRestaurant.value = DistanceCalcedRestaurants.find(dr => dr.id === id)
}

function onUnfocus() {
  focusedRestaurant.value = undefined
}

</script>

<template>
  <GitHub />
  <div class="container">
    <header>
      <h1>Daim Lunch - Seocho</h1>
      <div>
        <img :src="VueLogo" title="FrameworkDependency" />
      </div>
    </header>
    <Kakaomap :restaurants="DistanceCalcedRestaurants" :filteredRestaurants="filteredRestaurants"
      :focusedRestaurant="focusedRestaurant" @focus="onFocus" @unfocus="onUnfocus" />
    <Filter @change="filterRestaurants" />
    <Result :restaurants="filteredRestaurants" :focusedRestaurant="focusedRestaurant" @focus="onFocus" />
  </div>
</template>

<style scoped>
.container {
  margin-left: 15px;
  margin-right: 15px;
}

header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

header div img {
  height: 50px;
  margin-right: 70px;
}
</style>
