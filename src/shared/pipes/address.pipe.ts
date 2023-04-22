import { Injectable, PipeTransform } from '@nestjs/common';
import { WalletService } from '../services/wallet.service';

@Injectable()
export class AddressPipe implements PipeTransform<string, Promise<string>> {
  constructor(private walletService: WalletService) {}

  async transform(address: string): Promise<string> {
    this.walletService.verifyAddress(address);
    return address;
  }
}
