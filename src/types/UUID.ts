declare global {
  interface Crypto {
    randomUUID: () => string;
  }
}

type UUID = string;

export { UUID };
