export const formatJSONResponse = ({
  statusCode = 200,
  data = {},
  headers,
}: {
  statusCode?: number;
  data?: unknown;
  headers?: Record<string, string>;
}) => {
  return {
    statusCode,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };
};
