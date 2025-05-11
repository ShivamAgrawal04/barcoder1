import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 10, // number of virtual users
  duration: "30s", // test duration
};

export default function () {
  const url = "http://localhost:5000/api/v1/auth/register";

  // Unique email per request (to avoid duplication error)
  const randomId = Math.floor(Math.random() * 100000);
  const payload = JSON.stringify({
    name: `User${randomId}`,
    email: `user${randomId}@example.com`,
    password: "123456",
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    "status is 201": (r) => r.status === 201,
    "response has userId": (r) => r.body.includes("userId"),
  });

  sleep(1); // small pause between requests
}
