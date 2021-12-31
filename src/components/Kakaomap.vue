<script setup lang="ts">
import { ref, watch } from 'vue';
import { DaimPosition } from '../data/Daim';
import { Restaurant } from '../types/Restaurant';

const props = defineProps<{
  restaurants: Restaurant[],
  filteredRestaurants: Restaurant[],
  focusedRestaurant?: Restaurant
}>()

const mapRef = ref<HTMLDivElement>()
const map = ref<kakao.maps.Map>()

watch(mapRef, (mapRef) => {
  if (mapRef) {
    const options = { //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(DaimPosition.latitude, DaimPosition.longitude), //지도의 중심좌표.
      level: 3 //지도의 레벨(확대, 축소 정도)
    };
    map.value = new kakao.maps.Map(mapRef, options); //지도 생성 및 객체 리턴


    // 마커가 표시될 위치입니다 
    var markerPosition = new kakao.maps.LatLng(DaimPosition.latitude, DaimPosition.longitude);


    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
      title: "Daim",
      position: markerPosition
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    if (map.value)
      marker.setMap(map.value);

  }
})
</script>

<template>
  <div class="map" ref="mapRef"></div>
</template>

<style scoped>
div.map {
  width: 95vw;
  min-height: 500px;

  margin-left: auto;
  margin-right: auto;
}
</style>