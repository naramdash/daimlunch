import { RestaurantCategory } from "../types/RestaurantCategory";

function humanizeRestaurantCategory(category: RestaurantCategory) {
  switch (category) {
    case RestaurantCategory.Korean:
      return "한식";
    case RestaurantCategory.Western:
      return "양식";
    case RestaurantCategory.Chinese:
      return "중식";
    case RestaurantCategory.Japanese:
      return "일식";
    case RestaurantCategory.SnackBar:
      return "분식";
    case RestaurantCategory.CafeBakeryFastFood:
      return "카페/베이커리/패스트푸드";
    case RestaurantCategory.Asian:
      return "아시안푸드";
    case RestaurantCategory.ConvenienceStore:
      return "편의점";

    default:
      break;
  }
}

export { humanizeRestaurantCategory };
