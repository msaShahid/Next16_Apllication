import { z } from "zod";

const requiredString = (message: string) => z.string().trim().min(1, message);

const passwordSchema = z.string().min(8, "Password must be at least 8 characters long");

export const authSchema = z.object({
  name: requiredString("Name is required"),
  email: z.string().email("Invalid email").trim(),
  password: passwordSchema,
});

export type AuthSchema = z.infer<typeof authSchema>;

export const authValidation = {
  register: authSchema
    .extend({
      confirmPassword: passwordSchema,
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    }),

  login: authSchema.pick({
    email: true,
    password: true,
  }),

  update: authSchema.omit({
    email: true,
    password: true,
  }),

  updatePasswordForm: z
    .object({
      oldPassword: passwordSchema,
      newPassword: passwordSchema,
      confirmNewPassword: passwordSchema,
    })
    .refine((data) => data.newPassword !== data.oldPassword, {
      path: ["newPassword"],
      message: "New password cannot be the same as the old password",
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      path: ["confirmNewPassword"],
      message: "Passwords do not match",
    }),

  updatePasswordRoute: z
    .object({
      oldPassword: passwordSchema,
      newPassword: passwordSchema,
    })
    .refine((data) => data.newPassword !== data.oldPassword, {
      path: ["newPassword"],
      message: "New password cannot be the same as the old password",
    }),

  forgotPasswordForm: z.object({
    email: authSchema.shape.email,
  }),

  resetPassword: z
    .object({
      newPassword: passwordSchema,
      confirmNewPassword: passwordSchema,
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      path: ["confirmNewPassword"],
      message: "Passwords do not match",
    }),
};