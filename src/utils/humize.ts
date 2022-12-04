import { RestaurantCategory } from "../types/RestaurantCategory";

function humanizeRestaurantCategory(category: RestaurantCategory) {
  switch (category) {
    case "56111":
      return "한식-일반";
    case "56112":
      return "한식-면";
    case "56113":
      return "한식-육류";
    case "56114":
      return "한식-해산물";
    case "56121":
      return "중식";
    case "56122":
      return "일식";
    case "56123":
      return "서양식";
    case "56129":
      return "기타외국식";
    case "56130":
      return "기관구내식당";
    case "56141":
      return "출장음식";
    case "56142":
      return "이동";
    case "56191":
      return "제과점업";
    case "56192":
      return "피자햄버거샌드위치";
    case "56193":
      return "치킨";
    case "56194":
      return "김밥및기타간이";
    case "56199":
      return "간이음식포장";
    case "56211":
      return "유흥";
    case "56213":
      return "생맥주";
    case "56219":
      return "주점업";
    case "56221":
      return "커피";
    case "56229":
      return "기타비알코올";

    default:
      break;
  }
}

export { humanizeRestaurantCategory };
