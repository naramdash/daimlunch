<script setup lang="ts">
import { ref, watch } from 'vue';
import { DaimPosition } from '../data/Daim';
import { Restaurant } from '../types/Restaurant';
import RedMarker from '../assets/redmarker.png'
import OrangeMarker from '../assets/orangemarker.png'
import { humanizeRestaurantCategory } from '../utils/humize';
import { UUID } from '../types/UUID';

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

const focusedMarker = new kakao.maps.Marker({
  // zIndex: 100
})


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
    image: new kakao.maps.MarkerImage(OrangeMarker, DaimMarkerSize),
    position: daimPosition
  });

  const restaurants: RestaurantInMap[] = props.restaurants.map(r => ({
    restaurant: r,
    marker: new kakao.maps.Marker({
      title: r.name,
      clickable: true,
      map,
      image: new kakao.maps.MarkerImage(RedMarker, RestaurantMarkerSize),
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
    focusedMarker.setPosition(new kakao.maps.LatLng(
      focusedRestaurantInMap.restaurant.position.latitude,
      focusedRestaurantInMap.restaurant.position.longitude
    ))
    focusedMarker.setMap(map.value!)
  } else {
    focusedMarker.setMap(null)
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
  height: 350px;

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