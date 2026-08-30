export const favoriteSwaggerDoc = {
  "/favourite": {
    post: {
      summary: "Add a product to wishlist",
      description: "Add a product to the logged-in user's wishlist.",
      tags: ["Favourite"],
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
                product: {
                  type: "string",
                  description: "Product ID to add to wishlist",
                  example: "6702bcd0d2b2b7e1e8a2c3f1",
                },
              },
              required: ["product"],
            },
          },
        },
      },
      responses: {
        201: {
          description: "Product added to wishlist successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: {
                    type: "string",
                    example: "Product added to wishlist successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      _id: { type: "string" },
                      user: { type: "string" },
                      product: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Invalid input or product already in wishlist for user",
        },
      },
    },
    get: {
      summary: "Get wishlist for logged-in user",
      description: "Retrieve all wishlist items for the current user.",
      tags: ["Favourite"],
        AuthorizationToken: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: "Put your accessToken here ",
      },
      responses: {
        200: {
          description: "List of wishlist items",
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
                        user: { type: "string" },
                        product: { type: "object" },
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

  "/favourite/{id}": {
    delete: {
      summary: "Delete wishlist item",
      description: "Remove a product from the wishlist by its ID.",
      tags: ["Favourite"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Wishlist item ID",
          schema: { type: "string", example: "6702bcd0d2b2b7e1e8a2c3f1" },
        },
      ],
      responses: {
        200: {
          description: "Wishlist item deleted successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: {
                    type: "string",
                    example: "Wishlist item deleted successfully",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Wishlist item not found",
        },
      },
    },
  },
};
