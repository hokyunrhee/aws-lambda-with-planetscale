import type { AWS } from "@serverless/typescript";

import { functions } from "./serverless/functions";

const serverlessConfiguration: AWS = {
  service: "aws-lambda-with-planetscale",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild", "serverless-offline"],
  useDotenv: true,
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region: "ap-northeast-2",
    profile: "serverlessUser",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      DATABASE_URL: "${env:DATABASE_URL}",
    },
  },
  functions,
  package: {
    individually: true,
    patterns: [
      "src/generated/client/schema.prisma",
      "!src/generated/client/libquery_engine-*",
      "src/generated/client/libquery_engine-rhel-*",
      "!node_modules/prisma/libquery_engine-*",
      "!node_modules/@prisma/engines/**",
    ],
  },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
