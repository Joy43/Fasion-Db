export const categoryDocs = {
  "/api/v1/category": {
    get: {
      tags: ["Category"],
      summary: "Get all categories",
      description: "Retrieve a list of all categories.",
      responses: {
        200: {
          description: "Successfully retrieved list of all categories",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Category" },
              },
            },
          },
        },
      },
    },

    post: {
      tags: ["Category"],
      summary: "Create a new category",
      description:
        "Create a category with name, description, optional parent, and icon.",
      AuthorizationToken: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: "Put your accessToken here ",
      },
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              required: ["name"],
              properties: {
                name: {
                  type: "string",
                  example: "Electronics",
                },
                description: {
                  type: "string",
                  example: "Devices and gadgets",
                },
                parent: {
                  type: "string",
                  nullable: true,
                  example: "6702aab3f0a421d70e8df331",
                },
                icon: {
                  type: "string",
                  format: "binary",
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Category created successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Category" },
            },
          },
        },
        400: { description: "Validation error or duplicate category" },
      },
    },
  },

  "/api/v1/category/{id}": {
    patch: {
      tags: ["Category"],
      summary: "Update an existing category",
      description:
        "Update category fields: name, description, parent, isActive, or icon.",
      AuthorizationToken: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: "Put your accessToken here ",
      },
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
          description: "ID of the category to update",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string", example: "Updated Electronics" },
                description: {
                  type: "string",
                  example: "Updated category description",
                },
                parent: {
                  type: "string",
                  nullable: true,
                  example: "6702aab3f0a421d70e8df333",
                },
                isActive: { type: "boolean", example: true },
                icon: { type: "string", format: "binary" },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Category updated successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Category" },
            },
          },
        },
        404: { description: "Category not found" },
      },
    },

    delete: {
      tags: ["Category"],
      summary: "Delete a category by ID",
      description: "Delete a category using its ID.",
      AuthorizationToken: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: "Put your accessToken here ",
      },
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
          description: "The ID of the category to delete",
        },
      ],
      responses: {
        200: { description: "Category deleted successfully" },
        404: { description: "Category not found" },
      },
    },
  },
};

export const categoryComponents = {
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
  schemas: {
    Category: {
      type: "object",
      properties: {
        _id: { type: "string", example: "6702aab3f0a421d70e8df331" },
        name: { type: "string", example: "Electronics" },
        slug: { type: "string", example: "electronics" },
        description: {
          type: "string",
          example: "All types of electronic devices",
        },
        parent: { type: "string", nullable: true, example: null },
        isActive: { type: "boolean", example: true },
        createdBy: { type: "string", example: "6702cc43f0a421d70e8df411" },
        icon: {
          type: "string",
          example: "https://cdn.example.com/icons/electronics.png",
        },
        createdAt: {
          type: "string",
          format: "date-time",
          example: "2025-10-13T06:45:00Z",
        },
        updatedAt: {
          type: "string",
          format: "date-time",
          example: "2025-10-13T06:50:00Z",
        },
      },
    },
  },
};
