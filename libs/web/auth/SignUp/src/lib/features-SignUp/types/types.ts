export interface ISignUpMutation {
    isError: boolean
    error?: IMutationError
}

export interface IMutationError {
    data?: {
        error?: string
        message?: string
        statusCode?: number
    }
    status: number
}