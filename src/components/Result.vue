<script setup lang="ts">
import { Position } from '../types/Position';
import { Restaurant, RestaurantWithDistance } from '../types/Restaurant';
import { UUID } from '../types/UUID';
import { humanizeRestaurantCategory } from '../utils/humize'

const props = defineProps<{
  restaurants: RestaurantWithDistance[],
  focusedRestaurant?: Restaurant
}>()

const emit = defineEmits<{
  (event: 'focus', id: UUID): void
}>()

function openSiteInNewTab(url: string) {
  window.open(url)
}
function openFindWayTo(name: string, position: Position) {
  window.open(`https://map.kakao.com/link/to/${name},${position.latitude},${position.longitude}`)
}

</script>

<template>
  <table>
    <thead>
      <tr>
        <th>업종</th>
        <th>식당</th>
        <th>거리</th>
        <th>*</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="restaurant in props.restaurants"
        :data-focus="restaurant.id === props.focusedRestaurant?.id"
        @click="emit('focus', restaurant.id)"
      >
        <td>{{ humanizeRestaurantCategory(restaurant.category) }}</td>
        <td>{{ restaurant.name }}</td>
        <td align="right">{{ restaurant.distance.toFixed(2) }}m</td>
        <td>
          <button type="button" @click="openFindWayTo(restaurant.name, restaurant.position)">🚩</button>
          <button v-if="restaurant.url" type="button" @click="openSiteInNewTab(restaurant.url!)">🌏</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  width: 100%;
}

thead {
  background-color: beige;
}

tr[data-focus="true"] {
  background-color: aquamarine;
}
</style>