import { Restaurant, RestaurantWithDistance } from "../types/Restaurant";
import { calcCrow } from "../utils/distance";
import { DaimPosition } from "./Daim";
import { Restaurants } from "./RawRestaurants";

const DistanceCalcedRestaurants: RestaurantWithDistance[] = Restaurants.map(
  (r) => ({ ...r, distance: calcCrow(DaimPosition, r.position) })
).sort((a, b) => a.distance - b.distance);

export { DistanceCalcedRestaurants };
