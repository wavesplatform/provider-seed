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

type SeedMaker = string | (() => Promise<string>);

export class ProviderSeed implements Provider {
    private _seed?: string;
    private _seedMaker?: () => Promise<string>;
    private _options: ConnectOptions = {
        NETWORK_BYTE: 'W'.charCodeAt(0),
        NODE_URL: 'https://nodes.wavesplatform.com',
    };

    public user: UserData | null = null;

    constructor(seed?: SeedMaker) {
        if (seed) {
            if (typeof seed === 'string') {
                this._seed = seed;
            } else if (typeof seed === 'function') {
                this._seedMaker = seed;
            }
        }
    }

    public connect(options: ConnectOptions): Promise<void> {
        this._options = options;

        return Promise.resolve();
    }

    public async sign(
        list: Array<SignerTx>
    ): Promise<Array<ProviderSignedTx>> {
        const seed = await this.getSeed();

        return Promise.resolve(
            list.map((params) =>
                signTx(
                    {
                        chainId: this._options.NETWORK_BYTE,
                        ...params,
                    } as any,
                    seed
                )
            )
        ) as any;
    }

    public async login(): Promise<UserData> {
        const seed = await this.getSeed();

        this.user = {
            address: libs.crypto.address(
                seed,
                this._options.NETWORK_BYTE
            ),
            publicKey: libs.crypto.publicKey(seed),
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

    private async getSeed(): Promise<string> {
        if (!this._seed) {
            if (this._seedMaker) {
                this._seed = await this._seedMaker();
            } else {
                this._seed = libs.crypto.randomSeed();
            }
        }

        return this._seed;
    }
}
