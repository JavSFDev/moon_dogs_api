import { Injectable, PipeTransform } from '@nestjs/common';
import { SignatureParams } from '../../user/params/signature.params';
import { WalletService } from '../services/wallet.service';

@Injectable()
export class SignaturePipe
  implements PipeTransform<SignatureParams, Promise<boolean>>
{
  constructor(private walletService: WalletService) {}

  async transform(signatureParams: SignatureParams): Promise<boolean> {
    this.walletService.verifySigner(
      signatureParams.address,
      signatureParams.signature,
    );
    return true;
  }
}
