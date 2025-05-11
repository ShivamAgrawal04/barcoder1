import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 100, // virtual users
  duration: "30s", // test duration
};

export default function () {
  const res = http.get(
    "http://localhost:5000/api/products/681e5a0695368c90ed5f68d3"
  );
  check(res, { "status is 200": (r) => r.status === 200 });
  sleep(1); // wait between requests
}
