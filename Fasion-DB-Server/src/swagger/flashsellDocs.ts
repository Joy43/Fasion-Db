export const flashSaleDocs = {
  "/api/v1/flash-sale": {
    get: {
      tags: ["FlashSale"],
      summary: "Get Active Flash Sales",
      description:
        "Retrieve active flash sales with populated product details, including offer prices. Supports pagination and filtering (e.g., minPrice, maxPrice).",
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
          name: "minPrice",
          in: "query",
          description: "Minimum product price filter",
          required: false,
          schema: { type: "number", example: 10, minimum: 0 },
        },
        {
          name: "maxPrice",
          in: "query",
          description: "Maximum product price filter",
          required: false,
          schema: { type: "number", example: 1000, minimum: 0 },
        },
        {
          name: "search",
          in: "query",
          description: "Search term for products",
          required: false,
          schema: { type: "string", example: "electronics" },
        },
        {
          name: "sort",
          in: "query",
          description: "Sort by field (e.g., price, createdAt)",
          required: false,
          schema: { type: "string", example: "-price" },
        },
        {
          name: "fields",
          in: "query",
          description: "Fields to include in response",
          required: false,
          schema: { type: "string", example: "name,price,offerPrice" },
        },
      ],
      responses: {
        200: {
          description: "Successfully retrieved active flash sales",
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
                    items: { $ref: "#/components/schemas/ProductWithOffer" },
                  },
                },
              },
            },
          },
        },
      },
    },
    post: {
      tags: ["FlashSale"],
      summary: "Create Flash Sale",
      description:
        "Create one or more flash sales for specified products with a discount percentage. Requires authentication as a USER with an active shop.",
      AuthorizationToken: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: "Put your accessToken here",
      },
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["products", "discountPercentage"],
              properties: {
                products: {
                  type: "array",
                  items: {
                    type: "string",
                    description: "Product ID",
                    example: "6502aab3f0a421d70e8df999",
                  },
                  minItems: 1,
                },
                discountPercentage: {
                  type: "number",
                  minimum: 0,
                  maximum: 100,
                  example: 20,
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Flash sales created successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/BulkWriteResult" },
            },
          },
        },
        400: { description: "Validation error or invalid discount percentage" },
        401: { description: "Unauthorized" },
        404: { description: "User or shop not found" },
      },
    },
  },
};

export const flashSaleComponents = {
  schemas: {
    FlashSale: {
      type: "object",
      properties: {
        _id: { type: "string", example: "6502aab3f0a421d70e8df999" },
        product: { type: "string", example: "6502aab3f0a421d70e8df999" },
        discountPercentage: { type: "number", example: 20 },
        createdBy: { type: "string", example: "6702cc43f0a421d70e8df411" },
        createdAt: {
          type: "string",
          format: "date-time",
          example: "2025-11-07T10:00:00Z",
        },
        updatedAt: {
          type: "string",
          format: "date-time",
          example: "2025-11-07T10:00:00Z",
        },
      },
    },
    BulkWriteResult: {
      type: "object",
      properties: {
        acknowledged: { type: "boolean", example: true },
        modifiedCount: { type: "integer", example: 0 },
        matchedCount: { type: "integer", example: 0 },
        upsertedCount: { type: "integer", example: 3 },
        upserted: {
          type: "array",
          items: {
            type: "object",
            properties: {
              index: { type: "integer", example: 0 },
              _id: { type: "string", example: "6502aab3f0a421d70e8df999" },
            },
          },
        },
      },
    },
    ProductWithOffer: {
      type: "object",
      properties: {
        _id: { type: "string", example: "6502aab3f0a421d70e8df999" },
        name: { type: "string", example: "Wireless Headphones" },
        price: { type: "number", example: 100 },
        offerPrice: { type: "number", nullable: true, example: 80 },
        category: {
          type: "object",
          properties: { name: { type: "string", example: "Electronics" } },
        },
        shop: {
          type: "object",
          properties: {
            shopName: { type: "string", example: "Joy Electronics" },
          },
        },
        brand: {
          type: "object",
          properties: { name: { type: "string", example: "Sony" } },
        },
        // Add other product properties as needed
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
