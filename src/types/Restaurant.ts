import { Position } from "./Position";
import { RestaurantCategory } from "./RestaurantCategory";
import { UUID } from "./UUID";

type Restaurant = {
  id: UUID;
  category: RestaurantCategory;
  name: string;
  position: Position;
  url?: string;
};

type RestaurantWithDistance = Restaurant & { distance: number };

export { Restaurant, RestaurantWithDistance };
