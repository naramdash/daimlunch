<script setup lang="ts">
import { ref, watch } from 'vue';
import { RestaurantCategories, RestaurantCategory } from '../types/RestaurantCategory';
import { humanizeRestaurantCategory } from '../utils/humize'

const
  RangeMin = 50,
  RangeMax = 1500,
  RangeStep = 50

const emit = defineEmits<{
  (event: "change", categories: RestaurantCategory[], distance: number): void
}>()

const categories = ref<RestaurantCategory[]>([])
const distance = ref(RangeMax)

watch([categories, distance], (([categories, distance]) => {
  emit('change', categories, distance)
}))

</script>

<template>
  <form>
    <fieldset>
      <legend>업종</legend>

      <label v-for="category in RestaurantCategories">
        <input type="checkbox" name="category" :value="category" v-model="categories" />
        {{ humanizeRestaurantCategory(category) }}
      </label>
    </fieldset>

    <fieldset>
      <legend>거리</legend>

      <div class="rangeMinMaxValue">
        <span>{{ RangeMin }}m</span>
        <span>{{ distance }}m</span>
        <span>{{ RangeMax }}m</span>
      </div>
      <div>
        <input type="range" :min="RangeMin" :max="RangeMax" :step="RangeStep" list="steplist"
          v-model.number="distance" />
        <datalist id="steplist">
          <option v-for="n in ((RangeMax) / RangeStep)">{{ n * RangeStep }}</option>
        </datalist>
      </div>
    </fieldset>
  </form>
</template>

<style scoped>
legend {
  font-weight: bold;
  font-style: italic;
}

input[type="range"] {
  min-width: 80vw;
  width: 100%;
}

.rangeMinMaxValue {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  font-weight: bold;
}
</style>