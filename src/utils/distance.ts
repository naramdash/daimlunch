import { Position } from "../types/Position";

// https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function calcCrow(position1: Position, position2: Position) {
  const R = 6371; // km
  const dLat = toRad(position2.latitude - position1.latitude);
  const dLon = toRad(position2.longitude - position1.longitude);
  const lat1 = toRad(position1.latitude);
  const lat2 = toRad(position2.latitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d * 1000; // as meter
}

// Converts numeric degrees to radians
function toRad(value: number) {
  return (value * Math.PI) / 180;
}

export { calcCrow };
