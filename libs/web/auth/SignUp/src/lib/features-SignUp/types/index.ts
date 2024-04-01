import { IUserReq } from "@diary-app/shared"
import { FieldErrors, Control, UseFormHandleSubmit, SubmitHandler } from "react-hook-form"

export interface ISignUp {
    username: string
    password: string
    confirmPassword: string
}

export interface ISignUpFormProps {
    submit: UseFormHandleSubmit<ISignUp, undefined>
    control: Control<ISignUp, any>
    errors: FieldErrors<ISignUp>
    onSubmit: SubmitHandler<IUserReq>
}