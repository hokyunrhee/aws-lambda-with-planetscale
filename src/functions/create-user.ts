import { APIGatewayProxyEvent } from "aws-lambda";
import { PrismaClient } from "@/generated/client";

import { formatJSONResponse } from "@/libs/api-gateway";

const prisma = new PrismaClient();

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const body = JSON.parse(event.body);
    const { name, email } = body;

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    return formatJSONResponse({ data: newUser });
  } catch (error) {
    console.log("error", error);

    return formatJSONResponse({
      statusCode: 502,
      data: {
        message: error.message,
      },
    });
  }
};
