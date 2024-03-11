import { object, string } from "yup";

export const formSchema = object().shape({
    username: string()
        .required("Username is required")
        .matches(/^[a-zA-Z,0-9]+$/, 'Is not in correct format')
        .min(3, "Username length should be at least 3 characters"),
    password: string()
      .required("Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters")
      .matches(/^[a-zA-Z,0-9]+$/, 'Is not in correct format'),
  });

