import { Controller, Post, Request, Response } from '@nestjs/common';
import { TwoFactorAuthService } from './two-factor-auth.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('2fa')
@Controller('2fa')
export class TwoFactorAuthController {
  constructor(private readonly twoFactorAuthService: TwoFactorAuthService) {}

  @ApiOperation({ summary: 'Generate QR-code' })
  @ApiResponse({ status: 200, description: 'Generated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @Post('generate')
  async register(@Response() response, @Request() request): Promise<void> {
    const { otpURL } = await this.twoFactorAuthService.generateSecret(request.user.id);
    return this.twoFactorAuthService.pipeQrCodeStream(response, otpURL);
  }
}
