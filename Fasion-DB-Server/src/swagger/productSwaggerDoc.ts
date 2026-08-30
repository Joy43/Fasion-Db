export const productSwaggerDoc = {
  "/api/v1/product": {
    post: {
      summary: "Create a new product",
      description: "Create a new product by an authenticated shop or admin.",
      tags: ["Product"],
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
                name: { type: "string", example: "Men's Leather Jacket" },
                description: { type: "string", example: "High-quality leather jacket for men." },
                price: { type: "number", example: 199.99 },
                stock: { type: "number", example: 50 },
                weight: { type: "number", example: 1.2 },
                offer: { type: "number", example: 10 },
                category: { type: "string", example: "6702bcd0d2b2b7e1e8a2c3f1" },
                shop: { type: "string", example: "6702bcd0d2b2b7e1e8a2c3f9" },
                brand: { type: "string", example: "6702bcd0d2b2b7e1e8a2c3f8" },
                imageUrls: {
                  type: "array",
                  items: { type: "string", example: "https://example.com/image1.jpg" },
                },
                availableColors: {
                  type: "array",
                  items: { type: "string", example: "Black" },
                },
                specification: {
                  type: "object",
                  example: { material: "Leather", size: "L" },
                },
                keyFeatures: {
                  type: "array",
                  items: { type: "string" },
                  example: ["Soft leather", "Slim fit", "Durable zipper"],
                },
              },
              required: [
                "name",
                "description",
                "price",
                "stock",
                "category",
                "shop",
                "brand",
                "imageUrls",
                "availableColors",
              ],
            },
          },
        },
      },
      responses: {
        201: {
          description: "Product created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: { type: "string", example: "Product created successfully" },
                  data: { type: "object" },
                },
              },
            },
          },
        },
      },
    },

    get: {
      summary: "Get all products",
      description: "Retrieve a list of all products (supports search & filters).",
      tags: ["Product"],
      parameters: [
        {
          name: "searchTerm",
          in: "query",
          required: false,
          description: "Search products by name, slug, or description",
          schema: { type: "string", example: "jacket" },
        },
        {
          name: "category",
          in: "query",
          required: false,
          description: "Filter by category ID",
          schema: { type: "string" },
        },
        {
          name: "brand",
          in: "query",
          required: false,
          description: "Filter by brand ID",
          schema: { type: "string" },
        },
      ],
      responses: {
        200: {
          description: "List of products",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        _id: { type: "string" },
                        name: { type: "string" },
                        price: { type: "number" },
                        stock: { type: "number" },
                        averageRating: { type: "number" },
                        brand: { type: "string" },
                        category: { type: "string" },
                        imageUrls: { type: "array", items: { type: "string" } },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  "/product/{id}": {
    get: {
      summary: "Get product by ID",
      description: "Retrieve details of a single product by its ID.",
      tags: ["Product"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Product ID",
          schema: { type: "string" },
        },
      ],
      responses: {
        200: {
          description: "Product details",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  data: { type: "object" },
                },
              },
            },
          },
        },
        404: { description: "Product not found" },
      },
    },

    patch: {
      summary: "Update product by ID",
      description: "Update one or more fields of a product.",
      tags: ["Product"],
         AuthorizationToken: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: "Put your accessToken here ",
      },
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Product ID",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                price: 179.99,
                stock: 40,
                offer: 15,
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Product updated successfully" },
        404: { description: "Product not found" },
      },
    },

    delete: {
      summary: "Delete product by ID",
      description: "Remove a product permanently from the database.",
      tags: ["Product"],
         AuthorizationToken: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: "Put your accessToken here ",
      },
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Product ID",
          schema: { type: "string" },
        },
      ],
      responses: {
        200: {
          description: "Product deleted successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: { type: "string", example: "Product deleted successfully" },
                },
              },
            },
          },
        },
        404: { description: "Product not found" },
      },
    },
  },
};
