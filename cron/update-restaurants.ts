// CONST - START
const endpoint = "https://dl-server-production.up.railway.app/gql";
const graphql = JSON.stringify({
  query:
    "query {\nRestaurants{\nid\nname\nposition {\nlatitude\nlongitude\n}\ncategory\naddress\nphone\n}\n}",
});
const requestOptions = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: graphql,
};
const filePath = "./src/data/RawRestaurants.ts";
// CONST - END

const response = await fetch(endpoint, requestOptions).then((response) =>
  response.json()
);

const latestRestaurants = response.data.Restaurants;

console.log(`latestRestaurants count: ${latestRestaurants.length}`);

const originFileString = Deno.readTextFileSync(filePath);
const fileHeader = originFileString.split("\n").slice(0, 4).join("\n");
const updateFileString = fileHeader + "\n" + JSON.stringify(latestRestaurants);

Deno.writeTextFileSync(filePath, updateFileString);

console.log(`${new Date().toLocaleString()}: UPDATE COMPLETE`);
