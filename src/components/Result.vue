<script setup lang="ts">
import { toRef, watch } from 'vue';
import { Restaurant, RestaurantWithDistance } from '../types/Restaurant';
import { UUID } from '../types/UUID';
import { humanizeRestaurantCategory } from '../utils/humize'

const props = defineProps<{
  restaurants: RestaurantWithDistance[],
  focusedRestaurant?: Restaurant
}>()

const emit = defineEmits<{ (event: 'focus', id: UUID): void }>()

watch(toRef(props, 'focusedRestaurant'), () => {
  if (props.focusedRestaurant)
    document.getElementById(props.focusedRestaurant.id)?.scrollIntoView({ block: 'center' })
})
</script>

<template>
  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th class="category-column">☑️업종</th>
          <th class="name-column">🛎️식당</th>
          <th class="phone-column">📞전화</th>
          <th class="distance-column">🔭거리</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="restaurant in props.restaurants" :id="restaurant.id"
          :data-focus="restaurant.id === props.focusedRestaurant?.id" @click="emit('focus', restaurant.id)">
          <td class="category-column">
            {{ humanizeRestaurantCategory(restaurant.category) }}
          </td>
          <td class="name-column">
            <a target="_blank" :href="`https://map.kakao.com/link/search/${'서초 ' + restaurant.name}`">
              {{ restaurant.name }}
            </a>
          </td>
          <td class="phone-column">
            <a :href="`tel:${restaurant.phone}`">
              {{ restaurant.phone }}
            </a>
          </td>
          <td class="distance-column">
            <a target="_blank"
              :href="`https://map.kakao.com/link/to/${restaurant.name},${restaurant.position.latitude},${restaurant.position.longitude}`">
              {{ restaurant.distance.toFixed(2) }}m
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.spinner {
  margin-top: 10px;
  width: 100%;
  background-color: black;
  color: whitesmoke;
}

progress {
  width: 100%;
}

.table-wrapper {
  height: 35vh;
  overflow: auto;
}

table {
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  width: 100%;
  table-layout: fixed;
}

thead tr th {
  position: sticky;
  background-color: beige;
  top: 0;
}

tbody {
  overflow: scroll;
}

th.category-column {
  width: 8em;
}

td.category-column {
  font-size: small;
}

th.phone-column {
  width: 10em;
}

th.distance-column {
  width: 7em;
}

td.distance-column {
  text-align: right;
}

th.action-column {
  width: 5em;
}

tr[data-focus="true"] {
  background-color: aquamarine;
}

tr[data-spin="true"] {
  background-color: blueviolet;
}
</style>