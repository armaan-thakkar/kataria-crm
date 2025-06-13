export const DEFAULT_API_CALL_DEBOUNCE = 500;
export const DEFAULT_AXOIS_TIMEOUT = 9000;
export const AXOIS_TIMEOUT_5_MINUTES = 300000;
export const AXOIS_TIMEOUT_2_MINUTES = 120000;
export const MAX_RECORDS_LIMIT = 10000;

export const LS = {
  ACCESS_TOKEN: "access-token",
  USER_INFO: "user-info",
};

export const CK = {
  ACCESS_TOKEN: "access-token",
};
// formik error constants

export const FORMIK = {
  REQUIRED: "Input required",

  INVALID_URL: {
    VALUE: /^(http:\/\/|https:\/\/)/,
    MESSAGE: "Invalid url",
  },
  INVALID_EMAIL: {
    VALUE:
      /^(?=.{1,64}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/,
    MESSAGE: "Please enter a valid email address",
  },

  INVALID_CONTACT_NUMBER: {
    VALUE: /^\+\d{1,3}-\d{6,15}$/,
    MESSAGE: "Invalid contact number",
  },

  PASSWORD_UPPER_CASE: {
    VALUE: /[A-Z]/,
    MESSAGE: "Password contains one uppercase letter",
  },
  PASSWORD_LOWER_CASE: {
    VALUE: /[a-z]/,
    MESSAGE: "Password contains one lowercase letter",
  },
  PASSWORD_NUMBER: {
    VALUE: /\d/,
    MESSAGE: "Password contains one number",
  },
  PASSWORD_SPECIAL_CHARACTER: {
    VALUE: /[!@#$%&*()\-+=^]/,
    MESSAGE: "Password contains one special character",
  },
  INVALID_PASSWORD: {
    VALUE: /^[A-Za-z0-9#\-_.^~@$!%*?&\\[\]\\(\\)\\|]+$/,
    MESSAGE: "Invalid password",
  },

  MIN_1: { VALUE: 1, MESSAGE: "Minimum 1 characters are required." },
  MIN_3: { VALUE: 3, MESSAGE: "Minimum 3 characters are required." },
  MIN_4: { VALUE: 4, MESSAGE: "Minimum 4 characters are required." },
  MIN_7: { VALUE: 7, MESSAGE: "Minimum 7 digits" },
  MIN_8: { VALUE: 8, MESSAGE: "Minimum 8 characters are required." },
  MIN_2: { VALUE: 2, MESSAGE: "Minimum 2 characters are required." },
  MIN_6: { VALUE: 6, MESSAGE: "Minimum 6 characters are required." },
  MAX_12: { VALUE: 12, MESSAGE: "Maximum 12 Digits" },
  MAX_15: { VALUE: 15, MESSAGE: "Maximum 15 Digits" },
  MAX_4: { VALUE: 4, MESSAGE: "Maximun 4 digits" },
  MAX_10: { VALUE: 10, MESSAGE: "Maximun 10 characters are allowed." },
  MAX_21: { VALUE: 21, MESSAGE: "Maximun 21 characters are allowed." },
  MAX_20: { VALUE: 20, MESSAGE: "Maximun 20 characters are allowed." },
  MAX_30: { VALUE: 30, MESSAGE: "Maximun 30 characters are allowed." },
  MAX_32: { VALUE: 32, MESSAGE: "Maximun 32 characters are allowed." },
  MAX_64: { VALUE: 64, MESSAGE: "Maximun 64 characters are allowed." },
  MAX_168: { VALUE: 168, MESSAGE: "Maximun 168 characters are allowed." },
  MAX_255: {
    VALUE: 255,
    MESSAGE: "Maximun 255 characters are allowed.",
  },
  MAX_512: { VALUE: 512, MESSAGE: "Maximun 512 characters are allowed." },
  MAX_2048: {
    VALUE: 2048,
    MESSAGE: "Maximun 2048 characters are allowed.",
  },
  MAX_EMAIL_320: { VALUE: 320, MESSAGE: "Maximun 320 characters are allowed." },
  MAX_1024: { VALUE: 1024, MESSAGE: "Maximun 1024 characters are allowed." },
};

export const PAGE_SIZE = [50, 100, 200, 500, 1000];

export const MASTERS_KEY = {
  SERVICE_TYPE: "SERVICE_TYPE",
  SERVICE_STATION: "SERVICE_STATION",
  MODEL: "MODEL",
  VARIANT: "VARIANT",
  FUEL_TYPE: "FUEL_TYPE",
  CITY: "CITY",
  CHANNEL: "CHANNEL",
  SALE_DEALER: "SALE_DEALER",
};

export const API_ERROR_CODES = {
  FIELD_ERROR: -1,
};
