import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class EmailVerificationGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const isNoConfirmedEmail = !request.user?.isEmailConfirmed;
    if (isNoConfirmedEmail) throw new UnauthorizedException('NO_EMAIL_CONFIRM');

    return true;
  }
}
