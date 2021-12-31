<script setup lang="ts">
import { Restaurant } from '../types/Restaurant';
import { RestaurantCategory } from '../types/RestaurantCategory';

const props = defineProps<{
  restaurants: Restaurant[]
}>()


function humanizeRestaurantCategory(category: RestaurantCategory) {
  switch (category) {
    case RestaurantCategory.Korean:
      return "한식"
    case RestaurantCategory.Western:
      return "양식"
    case RestaurantCategory.Chinese:
      return "중식"
    case RestaurantCategory.Japanese:
      return "일식"
    case RestaurantCategory.SnackBar:
      return "분식"
    case RestaurantCategory.CafeBakeryFastFood:
      return "카페/베이커리/패스트푸드"
    case RestaurantCategory.Asian:
      return "아시안푸드"
    case RestaurantCategory.ConvenienceStore:
      return "편의점"

    default:
      break;
  }
}
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>업종</th>
        <th>식당</th>
        <th>거리</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="restaurant in props.restaurants">
        <td>{{ humanizeRestaurantCategory(restaurant.category) }}</td>
        <td>{{ restaurant.name }}</td>
        <td>{{ 100 }}m</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  width: 95%;
}

thead {
  background-color: beige;
}
</style>