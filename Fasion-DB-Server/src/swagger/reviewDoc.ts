// src/swagger/reviewDocs.ts

export const reviewDocs = {
  "/api/v1/review": {
    get: {
      tags: ["Review"],
      summary: "Get all reviews",
      security: [{ AuthorizationToken: [] }],
      responses: {
        200: {
          description: "List of all reviews",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Review",
                },
              },
            },
          },
        },
        401: { description: "Unauthorized" },
      },
    },
    post: {
      tags: ["Review"],
      summary: "Create a new review",
      security: [{ AuthorizationToken: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["review", "rating", "product"],
              properties: {
                review: { type: "string", example: "Great product!" },
                rating: { type: "number", example: 5 },
                product: { type: "string", example: "6702ab23f0a421d70e8df332" },
                isVerifiedPurchase: { type: "boolean", example: true },
              },
            },
          },
        },
      },
      responses: {
        201: { description: "Review created successfully" },
        400: { description: "Validation error" },
        401: { description: "Unauthorized" },
      },
    },
  },
  "/api/v1/review/{id}": {
    get: {
      tags: ["Review"],
      summary: "Get review by ID",
      security: [{ AuthorizationToken: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
          description: "Review ID",
        },
      ],
      responses: {
        200: { description: "Review found", content: { "application/json": { schema: { $ref: "#/components/schemas/Review" } } } },
        404: { description: "Review not found" },
      },
    },
    delete: {
      tags: ["Review"],
      summary: "Delete review by ID",
      security: [{ AuthorizationToken: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
          description: "Review ID",
        },
      ],
      responses: {
        200: { description: "Review deleted successfully" },
        404: { description: "Review not found" },
      },
    },
  },
  "api/v1/review/product/{productId}": {
    get: {
      tags: ["Review"],
      summary: "Get all reviews for a specific product",
      security: [{ AuthorizationToken: [] }],
      parameters: [
        {
          in: "path",
          name: "productId",
          required: true,
          schema: { type: "string" },
          description: "Product ID",
        },
      ],
      responses: {
        200: { description: "List of reviews for the product" },
        404: { description: "Product not found" },
      },
    },
  },
  components: {
    schemas: {
      Review: {
        type: "object",
        properties: {
          _id: { type: "string", example: "6702ab23f0a421d70e8df333" },
          review: { type: "string", example: "Great product!" },
          rating: { type: "number", example: 5 },
          user: { type: "string", example: "6702cc43f0a421d70e8df411" },
          product: { type: "string", example: "6702ab23f0a421d70e8df332" },
          isFlagged: { type: "boolean", example: false },
          flaggedReason: { type: "string", example: "" },
          isVerifiedPurchase: { type: "boolean", example: true },
          createdAt: { type: "string", format: "date-time", example: "2025-10-13T06:45:00Z" },
          updatedAt: { type: "string", format: "date-time", example: "2025-10-13T06:50:00Z" },
        },
      },
    },
  },
};
