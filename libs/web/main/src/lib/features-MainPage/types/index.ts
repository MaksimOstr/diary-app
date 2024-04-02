import { IUser } from "@diary-app/shared";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, MutationDefinition } from "@reduxjs/toolkit/query";
import { NavigateFunction } from "react-router-dom";

export interface IAccountMenuProps {
    user: IUser | null
    logout: MutationTrigger<MutationDefinition<void, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>, never, void, "api">>
    navigate: NavigateFunction
}