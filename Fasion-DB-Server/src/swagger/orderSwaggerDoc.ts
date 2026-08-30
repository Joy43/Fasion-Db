export const orderwaggerDoc = {
  "/api/v1/order": {
    post: {
      tags: ["order"],
      summary: "Create a new order",
      description: "Allows a user to place an order with one or more products.",
      AuthorizationToken: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: "Put your accessToken here ",
      },
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                shop: { type: "string", example: "68459ea76dfcb8bc57b68ce8" },
                products: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      product: {
                        type: "string",
                        example: "6845a1d06dfcb8bc57b68d14",
                      },
                      quantity: { type: "number", example: 2 },
                      unitPrice: { type: "number", example: 250 },
                      color: { type: "string", example: "Red" },
                    },
                  },
                },
                coupon: { type: "string", example: null },
                totalAmount: { type: "number", example: 500 },
                discount: { type: "number", example: 50 },
                deliveryCharge: { type: "number", example: 30 },
                finalAmount: { type: "number", example: 480 },
                shippingAddress: {
                  type: "string",
                  example: "123 Dhaka Street, Bangladesh",
                },
                paymentMethod: {
                  type: "string",
                  enum: ["Cash", "Card", "Online"],
                  example: "Online",
                },
              },
              required: [
                "shop",
                "products",
                "totalAmount",
                "finalAmount",
                "shippingAddress",
                "paymentMethod",
              ],
            },
          },
        },
      },
      responses: {
        201: { description: "Order created successfully" },
        400: { description: "Validation error" },
        401: { description: "Unauthorized" },
      },
    },
  },

  "/api/v1/order/my-order": {
    get: {
      tags: ["order"],
      summary: "Get user's own order",
      description: "Fetch all order placed by the currently logged-in user.",
      AuthorizationToken: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: "Put your accessToken here ",
      },
      responses: {
        200: { description: "order fetched successfully" },
        401: { description: "Unauthorized" },
      },
    },
  },

  "/api/v1/order/my-shop-order": {
    get: {
      tags: ["order"],
      summary: "Get order for user's shop",
      description:
        "Fetch all order related to the user's shop (for shop owners).",
      AuthorizationToken: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: "Put your accessToken here ",
      },
      responses: {
        200: { description: "Shop order fetched successfully" },
        401: { description: "Unauthorized" },
      },
    },
  },

  "/api/v1/order/{orderId}": {
    get: {
      tags: ["order"],
      summary: "Get order details",
      description:
        "Retrieve detailed information about a specific order by ID.",
      AuthorizationToken: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: "Put your accessToken here ",
      },
      parameters: [
        {
          name: "orderId",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "MongoDB ObjectId of the order",
          example: "652fcb84b0d0d7d34e0a7b11",
        },
      ],
      responses: {
        200: { description: "Order details fetched successfully" },
        404: { description: "Order not found" },
      },
    },
  },

  "/api/v1/order/{orderId}/status": {
    patch: {
      tags: ["order"],
      summary: "Change order status",
      description:
        "Allows updating an order’s status (Pending, Processing, Completed, Cancelled).",
      AuthorizationToken: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: "Put your accessToken here ",
      },
      parameters: [
        {
          name: "orderId",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Order ID",
          example: "652fcb84b0d0d7d34e0a7b11",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "string",
                  enum: ["Pending", "Processing", "Completed", "Cancelled"],
                  example: "Completed",
                },
              },
              required: ["status"],
            },
          },
        },
      },
      responses: {
        200: { description: "Order status updated successfully" },
        400: { description: "Invalid status or bad request" },
        401: { description: "Unauthorized" },
      },
    },
  },
};
