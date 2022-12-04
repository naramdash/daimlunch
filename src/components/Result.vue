<script setup lang="ts">
import { ref } from 'vue';
import { Position } from '../types/Position';
import { Restaurant, RestaurantWithDistance } from '../types/Restaurant';
import { UUID } from '../types/UUID';
import { humanizeRestaurantCategory } from '../utils/humize'

const
  IntervalTime = 2,
  IntervalTotalTime = 3000

const props = defineProps<{
  isSpinning: boolean,
  restaurants: RestaurantWithDistance[],
  focusedRestaurant?: Restaurant
}>()

const emit = defineEmits<{
  (event: 'focus', id: UUID): void
  (event: 'spinStart'): void
  (event: 'spinEnd'): void
}>()

const spinTempRestaurant = ref<Restaurant>()
const spinTimeCount = ref(0)

function openFindWayTo(name: string, position: Position) {
  window.open(`https://map.kakao.com/link/to/${name},${position.latitude},${position.longitude}`)
}

function spinning() {
  const array = new Uint32Array(10);
  window.crypto.getRandomValues(array);
  const answerIndex = array[0] % props.restaurants.length

  emit('spinStart')

  let index = 0
  spinTimeCount.value = 0
  const intervalId = setInterval(() => {
    if (spinTimeCount.value > IntervalTotalTime && index === answerIndex) {
      clearInterval(intervalId)
      spinTempRestaurant.value = undefined
      emit('focus', props.restaurants[index].id)
      emit('spinEnd')
      return
    }

    spinTempRestaurant.value = props.restaurants[index]

    index += 1
    if (index >= props.restaurants.length) index = 0;
    spinTimeCount.value += IntervalTime
  }, IntervalTime);
}

</script>

<template>
  <button class="spinner" type="button" :disabled="isSpinning" @click="spinning">🎊🎊🎊SPINNER🎡🎡🎡</button>
  <progress v-if="isSpinning" :value="spinTimeCount" :max="IntervalTotalTime"></progress>
  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th class="category-column">☑️업종</th>
          <th class="name-column">🛎️식당</th>
          <th class="phone-column">📞전화</th>
          <th class="distance-column">🔭거리</th>
          <th class="action-column">*</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="restaurant in props.restaurants" :data-focus="restaurant.id === props.focusedRestaurant?.id"
          :data-spin="restaurant.id === spinTempRestaurant?.id" @click="emit('focus', restaurant.id)">
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
          <td class="distance-column">{{ restaurant.distance.toFixed(2) }}m</td>
          <td class="action-column">
            <button type="button" @click="openFindWayTo(restaurant.name, restaurant.position)">🚩</button>
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