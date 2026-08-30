export const authDocs = {
  "/api/v1/auth/login": {
    post: {
      tags: ["Auth"],
      summary: "User Login",
      description:
        "Login using email and password. Returns access and refresh tokens.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  example: "user@gmail.com",
                },
                password: {
                  type: "string",
                  example: "12345678",
                },
              },
              required: ["email", "password"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "User logged in successfully",
        },
        400: {
          description: "Invalid credentials",
        },
      },
    },
  },

  "/api/v1/auth/refresh-token": {
    post: {
      tags: ["Auth"],
      summary: "Refresh JWT Token",
      description:
        "Generates a new access token using a valid refresh token from cookies.",
      responses: {
        200: {
          description: "Token refreshed successfully",
        },
        401: {
          description: "Invalid or expired refresh token",
        },
      },
    },
  },

  "/api/v1/auth/change-password": {
    post: {
      tags: ["Auth"],
      summary: "Change Password",
      AuthorizationToken: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: "Put your accessToken here ",
      },
      description: "Allows authenticated users to change their password.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                oldPassword: {
                  type: "string",
                  example: "oldPass123",
                },
                newPassword: {
                  type: "string",
                  example: "newPass456",
                },
              },
              required: ["oldPassword", "newPassword"],
            },
          },
        },
      },
      responses: {
        200: { description: "Password changed successfully" },
        400: { description: "Validation error" },
        401: { description: "Unauthorized" },
      },
    },
  },

  "/api/v1/auth/forgot-password": {
    post: {
      tags: ["Auth"],
      summary: "Forgot Password",
      description: "Send an OTP to user's email for password reset.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  example: "user@example.com",
                },
              },
              required: ["email"],
            },
          },
        },
      },
      responses: {
        200: { description: "OTP sent successfully" },
        404: { description: "User not found" },
      },
    },
  },

  "/api/v1/auth/verify-otp": {
    post: {
      tags: ["Auth"],
      summary: "Verify OTP",
      description: "Verify the OTP sent to user's email.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: { type: "string", example: "user@example.com" },
                otp: { type: "string", example: "123456" },
              },
              required: ["email", "otp"],
            },
          },
        },
      },
      responses: {
        200: { description: "OTP verified successfully" },
        400: { description: "Invalid OTP" },
      },
    },
  },

  "/api/v1/auth/reset-password": {
    post: {
      tags: ["Auth"],
      summary: "Reset Password",
      description: "Reset password using a valid OTP verification.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: { type: "string", example: "user@example.com" },
                newPassword: {
                  type: "string",
                  example: "newSecurePassword123",
                },
              },
              required: ["email", "newPassword"],
            },
          },
        },
      },
      responses: {
        200: { description: "Password reset successful" },
        400: { description: "Invalid or expired OTP" },
      },
    },
  },
};
