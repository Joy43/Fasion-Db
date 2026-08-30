export const shopDocs = {
  "/api/v1/shop/my-shop": {
    get: {
      tags: ["Shop"],
      summary: "Get My Shop",
      description: "Retrieve the shop associated with the authenticated user.",
      AuthorizationToken: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: "Put your accessToken here ",
      },
      responses: {
        200: {
          description: "Successfully retrieved user's shop",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Shop" },
            },
          },
        },
        401: { description: "Unauthorized" },
        404: { description: "Shop not found" },
      },
    },
  },

  "/api/v1/shop": {
    post: {
      tags: ["Shop"],
      summary: "Create a Shop",
      description: "Create a new shop for the authenticated user.",
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
                "shopName",
                "businessLicenseNumber",
                "address",
                "contactNumber",
                "servicesOffered",
                "establishedYear",
                "taxIdentificationNumber",
              ],
              properties: {
                shopName: { type: "string", example: "Joy Electronics" },
                businessLicenseNumber: {
                  type: "string",
                  example: "BLN-123456",
                },
                address: { type: "string", example: "123 Main Street, Dhaka" },
                contactNumber: { type: "string", example: "+880123456789" },
                website: {
                  type: "string",
                  format: "url",
                  nullable: true,
                  example: "https://joyelectronics.com",
                },
                servicesOffered: {
                  type: "array",
                  items: { type: "string" },
                  example: ["Electronics Repair", "Home Appliances Sale"],
                },
                ratings: {
                  type: "number",
                  minimum: 0,
                  maximum: 5,
                  example: 4.5,
                },
                establishedYear: { type: "number", example: 2010 },
                socialMediaLinks: {
                  type: "object",
                  additionalProperties: { type: "string" },
                  nullable: true,
                  example: {
                    facebook: "https://facebook.com/joyelectronics",
                    instagram: "https://instagram.com/joyelectronics",
                  },
                },
                taxIdentificationNumber: {
                  type: "string",
                  example: "TIN-987654321",
                },
                logo: {
                  type: "string",
                  nullable: true,
                  example: "https://cdn.example.com/logos/joy-logo.png",
                },
                isActive: { type: "boolean", example: true },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Shop created successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Shop" },
            },
          },
        },
        400: { description: "Validation error" },
        401: { description: "Unauthorized" },
      },
    },
  },
};

export const shopComponents = {
  schemas: {
    Shop: {
      type: "object",
      properties: {
        _id: { type: "string", example: "6502aab3f0a421d70e8df999" },
        shopName: { type: "string", example: "Joy Electronics" },
        businessLicenseNumber: { type: "string", example: "BLN-123456" },
        address: { type: "string", example: "123 Main Street, Dhaka" },
        contactNumber: { type: "string", example: "+880123456789" },
        website: {
          type: "string",
          nullable: true,
          example: "https://joyelectronics.com",
        },
        user: { type: "string", example: "6702cc43f0a421d70e8df411" },
        servicesOffered: {
          type: "array",
          items: { type: "string" },
          example: ["Electronics Repair", "Home Appliances Sale"],
        },
        ratings: { type: "number", example: 4.5 },
        establishedYear: { type: "number", example: 2010 },
        socialMediaLinks: {
          type: "object",
          additionalProperties: { type: "string" },
          nullable: true,
          example: {
            facebook: "https://facebook.com/joyelectronics",
            instagram: "https://instagram.com/joyelectronics",
          },
        },
        taxIdentificationNumber: { type: "string", example: "TIN-987654321" },
        logo: {
          type: "string",
          nullable: true,
          example: "https://cdn.example.com/logos/joy-logo.png",
        },
        isActive: { type: "boolean", example: true },
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
  securitySchemes: {
    AuthorizationToken: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description: "Put your accessToken here ",
    },
  },
};
