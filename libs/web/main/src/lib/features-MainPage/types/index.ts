import { ITask, IUser } from "@diary-app/shared";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, MutationDefinition } from "@reduxjs/toolkit/query";
import { NavigateFunction } from "react-router-dom";

export interface IAccountMenuProps {
    user: IUser | null
    logouta?: MutationTrigger<MutationDefinition<void, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>, never, void, "api">>
    navigate: NavigateFunction
}

export interface iCreateNewTaskFormProps {
    open: boolean
}


export interface ITaskComponentProps {
    task?: ITask[] | undefined
}

export interface IChangeTaskPageProps {
    data: ITask | undefined
    id: string | undefined
}

export interface ISearchTextFieldfProps {
    tasks: ITask[] | undefined
    isLoading: boolean
}

export interface TaskFormHandle {
    onSubmit: () => void;
}


export interface UserProfileProps {
    data: IUser | undefined
}

export interface IConfirmPasswordProps {
    reject: () => void
}