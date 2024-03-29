import { Position } from "./Position";
import { RestaurantCategory } from "./RestaurantCategory";
import type { UUID } from "./UUID";

type Restaurant = {
  id: UUID;
  category: RestaurantCategory;
  name: string;
  position: Position;
  url?: string;

  address: string;
  phone: string;
};

type RestaurantWithDistance = Restaurant & { distance: number };

export type { Restaurant, RestaurantWithDistance };
