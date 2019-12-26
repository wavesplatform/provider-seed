import {
    IConnectOptions,
    IProvider,
    ITypedData,
    IUserData,
    TLong,
    TTransactionParamWithType,
} from '@waves/signer';
import { IWithId, TTransactionWithProofs } from '@waves/ts-types';
import { libs, signTx } from '@waves/waves-transactions';

export class ProviderSeed implements IProvider {
    private readonly _seed: string;
    private _options: IConnectOptions = {
        NETWORK_BYTE: 'W'.charCodeAt(0),
        NODE_URL: 'https://nodes.wavesplatform.com',
    };

    constructor(seed?: string) {
        this._seed = seed || libs.crypto.randomSeed();
    }

    public connect(options: IConnectOptions): Promise<void> {
        this._options = options;
        return Promise.resolve();
    }

    public sign(
        list: Array<TTransactionParamWithType>
    ): Promise<Array<TTransactionWithProofs<TLong> & IWithId>> {
        return Promise.resolve(
            list.map((params) =>
                signTx(
                    {
                        chainId: this._options.NETWORK_BYTE,
                        ...params,
                    } as any,
                    this._seed
                )
            )
        ) as any;
    }

    public login(): Promise<IUserData> {
        return Promise.resolve({
            address: libs.crypto.address(
                this._seed,
                this._options.NETWORK_BYTE
            ),
            publicKey: libs.crypto.publicKey(this._seed),
        });
    }

    public logout(): Promise<void> {
        return Promise.resolve();
    }

    public signTypedData(data: Array<ITypedData>): Promise<string> {
        return Promise.resolve('// TODO'); // TODO
    }

    public signMessage(data: string | number): Promise<string> {
        return Promise.resolve('// TODO'); // TODO
    }
}
