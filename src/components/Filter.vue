<script setup lang="ts">
import { ref, watch } from 'vue';
import { RestaurantCategory } from '../types/RestaurantCategory';

const emit = defineEmits<{
  (event: "change", categories: RestaurantCategory[], distance: number): void
}>()

const categories = ref<RestaurantCategory[]>([])
const distance = ref(50)

watch([categories, distance], (([categories, distance]) => {
  emit('change', categories, distance)
}))

</script>

<template>
  <form>
    <fieldset>
      <legend>업종</legend>

      <label>
        <input
          type="checkbox"
          name="category"
          :value="RestaurantCategory.Korean"
          v-model="categories"
        />
        한식
      </label>
      <label>
        <input
          type="checkbox"
          name="category"
          :value="RestaurantCategory.Western"
          v-model="categories"
        />
        양식
      </label>
      <label>
        <input
          type="checkbox"
          name="category"
          :value="RestaurantCategory.Chinese"
          v-model="categories"
        />
        중식
      </label>
      <label>
        <input
          type="checkbox"
          name="category"
          :value="RestaurantCategory.Japanese"
          v-model="categories"
        />
        일식
      </label>
      <label>
        <input
          type="checkbox"
          name="category"
          :value="RestaurantCategory.SnackBar"
          v-model="categories"
        />
        분식
      </label>
      <label>
        <input
          type="checkbox"
          name="category"
          :value="RestaurantCategory.Asian"
          v-model="categories"
        />
        아시안푸드
      </label>
      <label>
        <input
          type="checkbox"
          name="category"
          :value="RestaurantCategory.CafeBakeryFastFood"
          v-model="categories"
        />
        카페/베이커리/패스트푸드
      </label>
      <label>
        <input
          type="checkbox"
          name="category"
          :value="RestaurantCategory.ConvenienceStore"
          v-model="categories"
        />
        편의점
      </label>
    </fieldset>
    <fieldset>
      <legend>거리</legend>

      <div class="rangeMinMaxValue">
        <span>50m</span>
        <span>{{ distance }}m</span>
        <span>1000m</span>
      </div>
      <div>
        <input type="range" min="50" max="1000" step="50" list="steplist" v-model.number="distance" />
        <datalist id="steplist">
          <option v-for="n in 20">{{ n * 50 }}</option>
        </datalist>
      </div>
    </fieldset>
  </form>
</template>

<style scoped>
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