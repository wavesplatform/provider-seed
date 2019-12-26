import { ProviderSeed } from '../src';
import { Signer } from '@waves/signer';
import { libs } from '@waves/waves-transactions';

it('Check transfer', async () => {
    const seed = libs.crypto.randomSeed();
    const signer = new Signer();
    const provider = new ProviderSeed(seed);

    signer.setProvider(provider);

    const user = await signer.login();
    const [transfer] = await signer
        .transfer({
            amount: 1,
            recipient: user.address,
        })
        .sign();
    expect(transfer.assetId).toBe(null);
});
