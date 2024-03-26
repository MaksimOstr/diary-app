import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { JwtPayload } from "../types/index";

export const CurrentUser = createParamDecorator((key: keyof JwtPayload, ctx: ExecutionContext): JwtPayload | Partial<JwtPayload> => {
    const request = ctx.switchToHttp().getRequest()
    console.log(request)
    return key ? request.user[key] : request.user
})