import { IUserReq } from "@diary-app/shared"
import { Control, FieldErrors, SubmitHandler, UseFormHandleSubmit } from "react-hook-form"

export interface ISignInFormProps {
    submit:  UseFormHandleSubmit<IUserReq, undefined>
    control: Control<IUserReq, any>
    errors: FieldErrors<IUserReq>
    onSubmit: SubmitHandler<IUserReq>
}