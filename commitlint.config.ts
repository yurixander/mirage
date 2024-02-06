// TODO: Add appropriate type for the config.
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [
      2,
      "always",
      [
        {
          name: "auth",
          description: "Authentication related changes",
        },
        {
          name: "ui",
          description: "User interface related changes",
        },
      ],
    ],
    "scope-case": "lowerCase",
    "scope-pattern": "^[a-z0-9-]+$",
  },
}
