<script setup lang="ts">
import { ref, watch } from 'vue';
import { DaimPosition } from '../data/Daim';
import { Restaurant } from '../types/Restaurant';
import Marker1 from '../assets/marker1.png'
import Marker2 from '../assets/marker2.png'
import Marker3 from '../assets/marker3.png'
import Marker4 from '../assets/marker4.png'
import Marker5 from '../assets/marker5.png'
import Marker6 from '../assets/marker6.png'
import Marker7 from '../assets/marker7.png'
import Marker8 from '../assets/marker8.png'
import Marker9 from '../assets/marker9.png'
import Marker10 from '../assets/marker10.png'
import Marker11 from '../assets/marker11.png'
import Marker12 from '../assets/marker12.png'
import HomeMarker from '../assets/homemarker.png'
import { humanizeRestaurantCategory } from '../utils/humize';
import { UUID } from '../types/UUID';
import { RestaurantCategory } from '../types/RestaurantCategory';

function getMarkerFromCategory(category: RestaurantCategory) {
  switch (category) {
    case "56111": // 한식 일반 음식점업
    case "56112": // 한식 면 요리 전문점
    case "56113": // 한식 육류 요리 전문점
    case "56114": // 한식 해산물 요리 전문점
      return Marker1;

    case "56121": // 중식 음식점업
      return Marker2;

    case "56122": // 일식 음식점업
      return Marker3;

    case "56123": // 서양식 음식점업
      return Marker4;

    case "56129": // 기타 외국식 음식점업
      return Marker5;

    case "56130": // 기관 구내식당업
    case "56141": // 출장 음식 서비스업
    case "56142": // 이동 음식점업
      return Marker6;


    case "56191": // 제과점업
      return Marker7;


    case "56192": // 피자, 햄버거, 샌드위치 및 유사 음식점업
    case "56193": // 치킨 전문점
      return Marker8;

    case "56194": // 김밥 및 기타 간이 음식점업
    case "56199": // 간이 음식 포장 판매 전문점
      return Marker9;

    case "56211": // 일반 유흥 주점업
    case "56213": // 생맥주 전문점
    case "56219": // 기타 주점업
      return Marker10;

    case "56221": // 커피 전문점
    case "56229": ; // 기타 비알코올 음료점업
      return Marker11;

    default:
      return Marker12;
  }
}

function makeInfoWindow(restaurant: Restaurant) {
  return new kakao.maps.InfoWindow({
    removable: true,
    content: `<div>
        <div style="font-weight: bold;">${restaurant.name}</div>
        <div>${humanizeRestaurantCategory(restaurant.category)}</div>
      </div>`
  })
}

type RestaurantInMap = {
  restaurant: Restaurant,
  marker: kakao.maps.Marker,
  infoWindow: kakao.maps.InfoWindow
}

const
  DaimMarkerSize = new kakao.maps.Size(30, 30),
  RestaurantMarkerSize = new kakao.maps.Size(20, 20),
  daimPosition = new kakao.maps.LatLng(DaimPosition.latitude, DaimPosition.longitude);

const props = defineProps<{
  restaurants: Restaurant[],
  filteredRestaurants: Restaurant[],
  focusedRestaurant?: Restaurant
}>()

const emit = defineEmits<{
  (event: 'focus', id: UUID): void
  (event: 'unfocus'): void
}>()

const
  mapRef = ref<HTMLDivElement>(),
  map = ref<kakao.maps.Map>(),
  restaurantsInMap = ref<RestaurantInMap[]>([])

const focusedMarker = ref<kakao.maps.Marker>(new kakao.maps.Marker({}))
const lastShowedInfoWindow = ref<[Restaurant, kakao.maps.InfoWindow]>()

// Init
watch(mapRef, (mapRef) => {
  if (mapRef) {
    map.value = new kakao.maps.Map(mapRef, {
      center: daimPosition,
      level: 3
    });
  }
})

watch(map, (map) => {
  // Daim Marker
  const daimMarker = new kakao.maps.Marker({
    title: "Daim",
    map,
    image: new kakao.maps.MarkerImage(HomeMarker, DaimMarkerSize),
    position: daimPosition
  });

  const restaurants: RestaurantInMap[] = props.restaurants.map(r => ({
    restaurant: r,
    marker: new kakao.maps.Marker({
      title: r.name,
      clickable: true,
      map,
      image: new kakao.maps.MarkerImage(getMarkerFromCategory(r.category), RestaurantMarkerSize),
      position: new kakao.maps.LatLng(r.position.latitude, r.position.longitude)
    }),
    infoWindow: makeInfoWindow(r)
  }))

  kakao.maps.event.addListener(map, 'click', function () {
    emit('unfocus')
  })

  restaurants.forEach(r => {
    kakao.maps.event.addListener(r.marker, 'mouseover', function () {
      r.infoWindow.open(map!, r.marker)
    })
    kakao.maps.event.addListener(r.marker, 'mouseout', function () {
      r.infoWindow.close()
      r.infoWindow = makeInfoWindow(r.restaurant)
    })
    kakao.maps.event.addListener(r.marker, 'click', function () {
      lastShowedInfoWindow.value?.[1].close()
      r.infoWindow.open(map!, r.marker)
      lastShowedInfoWindow.value = [r.restaurant, r.infoWindow]
      emit('focus', r.restaurant.id)
    })
  })

  restaurantsInMap.value = restaurants
})

watch(props, ({ filteredRestaurants }) => {
  restaurantsInMap.value.forEach(restaurantInMap => {
    restaurantInMap.marker.setMap(filteredRestaurants.some(r => r.id === restaurantInMap.restaurant.id)
      ? map.value!
      : null)
  })
})

watch(props, ({ focusedRestaurant }) => {
  const focusedRestaurantInMap = restaurantsInMap.value.find(r => r.restaurant.id === focusedRestaurant?.id)

  if (focusedRestaurantInMap) {
    focusedMarker.value?.setPosition(new kakao.maps.LatLng(
      focusedRestaurantInMap.restaurant.position.latitude,
      focusedRestaurantInMap.restaurant.position.longitude
    ))
    focusedMarker.value?.setMap(map.value!)
    focusedRestaurantInMap.infoWindow.open(map.value!)
    lastShowedInfoWindow.value?.[1].close()
    lastShowedInfoWindow.value = [focusedRestaurantInMap.restaurant, focusedRestaurantInMap.infoWindow]
    map.value?.panTo(new kakao.maps.LatLng(focusedRestaurantInMap.restaurant.position.latitude, focusedRestaurantInMap.restaurant.position.longitude))
  } else {
    focusedMarker.value?.setMap(null)
  }
})

function setMapCenterToDaim() {
  map.value?.panTo(daimPosition)
}
</script>

<template>
  <div class="mapWrapper">
    <div class="map" ref="mapRef"></div>
    <div class="customControls">
      <button type="button" @click="setMapCenterToDaim">회사로 이동</button>
    </div>
  </div>
</template>

<style scoped>
.mapWrapper {
  position: relative;
  min-width: 100%;
  min-height: 400px;
  height: 40vh;

  margin-left: auto;
  margin-right: auto;
}

.map {
  width: 100%;
  height: 100%;
}

.customControls {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
}

.customControls button {
  background: #fff;
  background: linear-gradient(#fff, #e6e6e6);
}

.customControls button:hover {
  background: #f5f5f5;
  background: linear-gradient(#f5f5f5, #e3e3e3);
}
</style>