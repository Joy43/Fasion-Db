export const paymentDocs = {
  "/api/v1/payment": {
    get: {
      tags: ["Payment"],
      summary: "Get All Payments",
      description:
        "Retrieve all payments with optional pagination and filtering. Supports population of related entities like user, order, and shop.",
      parameters: [
        {
          name: "page",
          in: "query",
          description: "Page number for pagination",
          required: false,
          schema: { type: "integer", example: 1, minimum: 1 },
        },
        {
          name: "limit",
          in: "query",
          description: "Number of items per page",
          required: false,
          schema: { type: "integer", example: 10, minimum: 1, maximum: 100 },
        },
        {
          name: "search",
          in: "query",
          description:
            "Search term for payments (e.g., by transactionId or status)",
          required: false,
          schema: { type: "string", example: "Pending" },
        },
        {
          name: "sort",
          in: "query",
          description: "Sort by field (e.g., amount, createdAt)",
          required: false,
          schema: { type: "string", example: "-amount" },
        },
        {
          name: "fields",
          in: "query",
          description: "Fields to include in response",
          required: false,
          schema: { type: "string", example: "amount,status,transactionId" },
        },
        {
          name: "status",
          in: "query",
          description: "Filter by payment status",
          required: false,
          schema: {
            type: "string",
            enum: ["Pending", "Paid", "Failed"],
            example: "Paid",
          },
        },
        {
          name: "method",
          in: "query",
          description: "Filter by payment method",
          required: false,
          schema: {
            type: "string",
            enum: ["COD", "Online"],
            example: "Online",
          },
        },
      ],
      responses: {
        200: {
          description: "Successfully retrieved all payments",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  meta: {
                    type: "object",
                    properties: {
                      page: { type: "integer", example: 1 },
                      limit: { type: "integer", example: 10 },
                      total: { type: "integer", example: 50 },
                    },
                  },
                  result: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Payment" },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const paymentComponents = {
  schemas: {
    Payment: {
      type: "object",
      properties: {
        _id: { type: "string", example: "6502aab3f0a421d70e8df999" },
        user: { type: "string", example: "6702cc43f0a421d70e8df411" },
        order: { type: "string", example: "6502aab3f0a421d70e8df000" },
        shop: { type: "string", example: "6502aab3f0a421d70e8df111" },
        method: { type: "string", enum: ["COD", "Online"], example: "Online" },
        status: {
          type: "string",
          enum: ["Pending", "Paid", "Failed"],
          example: "Paid",
        },
        transactionId: {
          type: "string",
          nullable: true,
          example: "TXN123456789",
        },
        amount: { type: "number", example: 99.99 },
        gatewayResponse: {
          type: "object",
          additionalProperties: true,
          nullable: true,
          example: { bankStatus: "success", approvalCode: "APPROVED" },
        },
        createdAt: {
          type: "string",
          format: "date-time",
          example: "2025-11-07T10:00:00Z",
        },
        updatedAt: {
          type: "string",
          format: "date-time",
          example: "2025-11-07T10:05:00Z",
        },
      },
    },
  },
  securitySchemes: {
    AuthorizationToken: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description: "Put your accessToken here",
    },
  },
};
