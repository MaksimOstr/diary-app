import { object, string, ref } from "yup";

export const formSchema = object().shape({
  username: string()
    .required("Username is required")
    .min(3, "Username length should be at least 3 characters")
    .matches(/^[a-zA-Z,0-9]+$/, 'Is not in correct format'),
});