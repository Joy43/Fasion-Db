// src/swagger/couponDocs.ts

export const couponDocs = {
  "/coupon": {
    post: {
      tags: ["Coupon"],
      summary: "Create a new coupon",
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
              required: [
                "code",
                "shop",
                "discountType",
                "discountValue",
                "startDate",
                "endDate",
              ],
              properties: {
                code: { type: "string", example: "SAVE20" },
                shop: { type: "string", example: "6702ab23f0a421d70e8df332" },
                discountType: {
                  type: "string",
                  enum: ["Flat", "Percentage"],
                  example: "Percentage",
                },
                discountValue: { type: "number", example: 20 },
                minOrderAmount: { type: "number", example: 500 },
                maxDiscountAmount: { type: "number", example: 1000 },
                startDate: {
                  type: "string",
                  format: "date-time",
                  example: "2025-01-01T00:00:00Z",
                },
                endDate: {
                  type: "string",
                  format: "date-time",
                  example: "2025-02-01T00:00:00Z",
                },
              },
            },
          },
        },
      },
      responses: {
        201: { description: "Coupon created successfully" },
        400: { description: "Validation error" },
      },
    },
    get: {
      tags: ["Coupon"],
      summary: "Get all coupons",
      AuthorizationToken: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: "Put your accessToken here ",
      },
      responses: {
        200: { description: "List of all coupons" },
      },
    },
  },

  "/coupon/{couponCode}": {
    post: {
      tags: ["Coupon"],
      summary: "Get coupon details by code",
      AuthorizationToken: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: "Put your accessToken here ",
      },
      parameters: [
        {
          in: "path",
          name: "couponCode",
          required: true,
          schema: { type: "string" },
          description: "The coupon code (e.g. SAVE20)",
        },
      ],
      responses: {
        200: { description: "Coupon found" },
        404: { description: "Coupon not found" },
      },
    },
  },

  "/coupon/{couponCode}/update-coupon": {
    patch: {
      tags: ["Coupon"],
      summary: "Update coupon by code",
      AuthorizationToken: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: "Put your accessToken here ",
      },
      parameters: [
        {
          in: "path",
          name: "couponCode",
          required: true,
          schema: { type: "string" },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                discountValue: { type: "number", example: 25 },
                isActive: { type: "boolean", example: true },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Coupon updated successfully" },
        404: { description: "Coupon not found" },
      },
    },
  },

  "/coupon/{couponId}": {
    delete: {
      tags: ["Coupon"],
      summary: "Delete coupon by ID",
      AuthorizationToken: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: "Put your accessToken here ",
      },
      parameters: [
        {
          in: "path",
          name: "couponId",
          required: true,
          schema: { type: "string" },
          description: "The coupon ID",
        },
      ],
      responses: {
        200: { description: "Coupon deleted successfully" },
        404: { description: "Coupon not found" },
      },
    },
  },
};
