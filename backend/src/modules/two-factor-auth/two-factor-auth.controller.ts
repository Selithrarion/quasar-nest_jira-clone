import { Body, Controller, HttpCode, Post, Request, Response, UnauthorizedException } from '@nestjs/common';
import { TwoFactorAuthService } from './two-factor-auth.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';

@ApiTags('2fa')
@Controller('2fa')
export class TwoFactorAuthController {
  constructor(private readonly twoFactorAuthService: TwoFactorAuthService, private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Generate QR-code' })
  @ApiResponse({ status: 200, description: 'Generated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @Post('generate')
  async generate(@Response() response, @Request() request): Promise<void> {
    const { otpURL } = await this.twoFactorAuthService.generateSecret(request.user.id);
    return this.twoFactorAuthService.pipeQrCodeStream(response, otpURL);
  }

  @Post('enable')
  @HttpCode(200)
  async enable(@Body('code') code: string, @Request() request): Promise<void> {
    const userID = request.user.id;

    const isValid = this.twoFactorAuthService.isValid(code, userID);
    if (!isValid) throw new UnauthorizedException('WRONG_OTP_CODE');

    await this.userService.enable2FA(userID);
  }
}
