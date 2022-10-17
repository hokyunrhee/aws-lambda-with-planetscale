import type { AWS } from "@serverless/typescript";

export const functions: AWS["functions"] = {
  createUser: {
    handler: "src/functions/create-user.handler",
    events: [
      {
        httpApi: {
          path: "/users",
          method: "post",
        },
      },
    ],
  },
};
