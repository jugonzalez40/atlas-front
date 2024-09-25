// src/mocks/handlers.js
import { http, HttpResponse } from "msw";

import { setupServer } from "msw/node";

export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.post("http://192.168.0.24:8080/api/auth", () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json({
      token: "token-mock-1234",
    });
  }),
];

export const init = () => {
  const server = setupServer(...handlers);

  server.listen();
};
