import {
    AuthEvents,
    ConnectOptions,
    Handler,
    Provider,
    SignerTx,
    SignedTx,
    TypedData,
    UserData,
} from '@waves/signer';

import { libs, signTx } from '@waves/waves-transactions';

export type ProviderSignedTx = SignedTx<SignerTx>;

export class ProviderSeed implements Provider {
    private readonly _seed: string;
    private _options: ConnectOptions = {
        NETWORK_BYTE: 'W'.charCodeAt(0),
        NODE_URL: 'https://nodes.wavesplatform.com',
    };

    public user: UserData | null = null;

    constructor(seed?: string) {
        this._seed = seed || libs.crypto.randomSeed();
    }

    public connect(options: ConnectOptions): Promise<void> {
        this._options = options;
        return Promise.resolve();
    }

    public sign(
        list: Array<SignerTx>
    ): Promise<Array<ProviderSignedTx>> {
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

    public login(): Promise<UserData> {
        this.user = {
            address: libs.crypto.address(
                this._seed,
                this._options.NETWORK_BYTE
            ),
            publicKey: libs.crypto.publicKey(this._seed),
        };

        return Promise.resolve(this.user);
    }

    public logout(): Promise<void> {
        return Promise.resolve();
    }

    public signTypedData(data: Array<TypedData>): Promise<string> {
        return Promise.resolve('// TODO'); // TODO
    }

    public signMessage(data: string | number): Promise<string> {
        return Promise.resolve('// TODO'); // TODO
    }

    public on<EVENT extends keyof AuthEvents>(
        event: EVENT,
        handler: Handler<AuthEvents[EVENT]>,
    ): Provider {
        console.error('Not implemented');
        return this;
    }

    public once<EVENT extends keyof AuthEvents>(
        event: EVENT,
        handler: Handler<AuthEvents[EVENT]>,
    ): Provider{
        console.error('Not implemented');
        return this;
    };

    public off<EVENT extends keyof AuthEvents>(
        event: EVENT,
        handler: Handler<AuthEvents[EVENT]>,
    ): Provider {
        console.error('Not implemented');
        return this;
    }

}
