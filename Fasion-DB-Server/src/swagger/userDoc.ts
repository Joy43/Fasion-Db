export const userDocs = {
  "/api/v1/user": {
    get: {
      tags: ["Users"],
      summary: "Get all users (Admin only)",
      description: "Fetch all users. Only accessible by Admins.",
         AuthorizationToken: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: "Put your accessToken here ",
      },
      responses: {
        200: { description: "Users fetched successfully" },
        401: { description: "Unauthorized" },
      },
    },
  },

  "/api/v1/user/me": {
    get: {
      tags: ["Users"],
      summary: "Get current logged-in user's profile",
      description: "Retrieve profile of the currently authenticated user.",
         AuthorizationToken: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: "Put your accessToken here ",
      },
      responses: {
        200: {
          description: "Current user profile",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  _id: { type: "string", example: "64f0a1a1c1a2b3c4d5e6f7g8" },
                  email: { type: "string", example: "user@example.com" },
                  name: { type: "string", example: "John Doe" },
                  role: { type: "string", example: "user" },
                  hasShop: { type: "boolean", example: false },
                  clientInfo: {
                    type: "object",
                    properties: {
                      device: { type: "string", example: "pc" },
                      browser: { type: "string", example: "Chrome" },
                      ipAddress: { type: "string", example: "192.168.0.1" },
                      pcName: { type: "string", example: "My-PC" },
                      os: { type: "string", example: "Windows 10" },
                      userAgent: { type: "string", example: "Mozilla/5.0" },
                    },
                  },
                  isActive: { type: "boolean", example: true },
                },
              },
            },
          },
        },
        401: { description: "Unauthorized" },
      },
    },
  },

  "/api/v1/user/update-profile": {
    patch: {
      tags: ["Users"],
      summary: "Update logged-in user's profile",
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
                name: { type: "string", example: "Jane Doe" },
                photo: {
                  type: "string",
                  example: "https://example.com/photo.jpg",
                },
                address: { type: "string", example: "123 Main Street" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Profile updated successfully" },
        400: { description: "Validation error" },
        401: { description: "Unauthorized" },
      },
    },
  },

  "/api/v1/user/{id}/status": {
    patch: {
      tags: ["Users"],
      summary: "Update user's active status (Admin only)",
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
          description: "User ID",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                isActive: { type: "boolean", example: true },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "User status updated successfully" },
        400: { description: "Validation error" },
        401: { description: "Unauthorized" },
      },
    },
  },
};
