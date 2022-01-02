<script setup lang="ts">
import { ref } from 'vue';
import { Position } from '../types/Position';
import { Restaurant, RestaurantWithDistance } from '../types/Restaurant';
import { UUID } from '../types/UUID';
import { humanizeRestaurantCategory } from '../utils/humize'

const
  IntervalTime = 10,
  IntervalTotalTime = 3500

const props = defineProps<{
  restaurants: RestaurantWithDistance[],
  focusedRestaurant?: Restaurant
}>()

const emit = defineEmits<{
  (event: 'focus', id: UUID): void
}>()

const spinTempRestaurant = ref<Restaurant>()
const spinTimeCount = ref(0)

function openSiteInNewTab(url: string) {
  window.open(url)
}
function openFindWayTo(name: string, position: Position) {
  window.open(`https://map.kakao.com/link/to/${name},${position.latitude},${position.longitude}`)
}

function spinning() {
  const array = new Uint32Array(10);
  window.crypto.getRandomValues(array);
  const answerIndex = array[0] % props.restaurants.length

  let index = 0
  spinTimeCount.value = 0
  const intervalId = setInterval(() => {
    if (spinTimeCount.value > IntervalTotalTime && index === answerIndex) {
      clearInterval(intervalId)
      spinTempRestaurant.value = undefined
      emit('focus', props.restaurants[index].id)
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
  <button
    class="spinner"
    type="button"
    :disabled="spinTempRestaurant !== undefined"
    @click="spinning"
  >🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊SPINNER🎡🎡🎡🎡🎡🎡🎡🎡🎡🎡🎡</button>
  <progress v-if="spinTempRestaurant" :value="spinTimeCount" :max="IntervalTotalTime"></progress>
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
        :data-spin="restaurant.id === spinTempRestaurant?.id"
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
.spinner {
  margin-top: 10px;
  width: 100%;
  background-color: black;
  color: whitesmoke;
}

progress {
  width: 100%;
}

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
tr[data-spin="true"] {
  background-color: blueviolet;
}
</style>