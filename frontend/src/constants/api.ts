export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_APP_API_URL || "http://0.0.0.0:8000/api/v1",
  ENDPOINTS: {
    APPOINTMENTS: "/appointments/",
    USERS: "/users/",
    AUTH_LOGIN: "/auth/login",
    VERIFY_TOKEN: "/auth/verify-token",
    CLIENTS: "/clients/",
    SCULPING_NAIL_SIZE: "/sculping_nail_size/",
    NAIL_SERVICE: "/nail_services/",
    NAIL_DESIGN: "/nail_desings/",
  },
  TIMEOUT: 5000, // ms
};
