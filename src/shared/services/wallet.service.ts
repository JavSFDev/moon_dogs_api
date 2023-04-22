import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class WalletService {
  private logger: Logger;
  constructor() {
    this.logger = new Logger(WalletService.name);
  }

  verifySigner(address: string, signature: string) {
    if (!signature || !address) {
      this.logger.log('No data provided for verify request');

      throw new UnauthorizedException({
        message: 'No auth token provided',
        code: 'Invalid signature',
      });
    }

    const signerAddr = ethers.utils.verifyMessage(address, signature);
    if (signerAddr !== address) {
      this.logger.log('Failed to verify address');

      throw new UnauthorizedException({
        message: 'Failed to verify address.',
        code: 'Invalid signature',
      });
    }
    return true;
  }

  verifyAddress(address: string) {
    if (ethers.utils.isAddress(address)) return;

    this.logger.log('Address type is invalid.');
    throw new BadRequestException('Invalid address');
  }
}
