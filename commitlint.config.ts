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
        },
        {
          name: "ui",
        },
        {
          name: "storybook",
        },
      ],
    ],
  },
}
