const filePath = "./src/data/RawRestaurants.ts";
const allowedCategories = [
  "56111",
  "56112",
  "56113",
  "56114",
  "56121",
  "56122",
  "56123",
  "56129",
  "56130",
  "56141",
  "56142",
  "56191",
  "56192",
  "56193",
  "56194",
  "56199",
  "56211",
  "56213",
  "56219",
  "56221",
  "56229",
];

const response = await fetch(
  "https://zero.appplay.co.kr/zero_srch_aflt_web_r001.jct",
  {
    headers: {
      accept: "*/*",
      "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
      "cache-control": "no-cache",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      pragma: "no-cache",
      "sec-ch-ua":
      '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "XMLHttpRequest",
    },
    referrer: "https://zero.appplay.co.kr/zero_srch_aflt_web.act?ctgr=BG",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: "_JSON_=%257B%2522LAT%2522%253A37.4882522%252C%2522LNG%2522%253A127.010387%257D",
    method: "POST",
    mode: "cors",
    credentials: "include",
  }
).then((res) => res.json());
const locations = response.COMPANY_REC;
const latestRestaurants = locations
  .flatMap((location: any) =>
    location.SAME_DIS_COMP_REC.map((restaurant: any) => ({
      id: `${restaurant.COMPANY_ID}-${restaurant.ZP_COMPANY_ID}`,
      category: restaurant.UPJONG_CODE,
      name: restaurant.COMPANY_NM,
      position: {
        latitude: parseFloat(location.LAT),
        longitude: parseFloat(location.LNG),
      },
      address: `${restaurant.ADDR1} ${restaurant.ADDR2}`,
      phone: restaurant.COMPANY_PHONE,
    }))
  )
  .filter((restaurant: any) => allowedCategories.includes(restaurant.category));

console.log(`latestRestaurants count: ${latestRestaurants.length}`);

const originFileString = Deno.readTextFileSync(filePath);
const fileHeader = originFileString.split("\n").slice(0, 4).join("\n");
const updateFileString = fileHeader + "\n" + JSON.stringify(latestRestaurants);

Deno.writeTextFileSync(filePath, updateFileString);

console.log(`${new Date().toLocaleString("ko-kr")}: UPDATE COMPLETE`);
