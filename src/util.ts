import { Keyring } from '@polkadot/keyring';
import { cryptoWaitReady, mnemonicGenerate } from '@polkadot/util-crypto';
import importPrivateKey from '@substrate/txwrapper/lib/importPrivateKey';
import {deriveAddress} from '@substrate/txwrapper/lib/deriveAddress';

export enum SupportedSS58Format {
    'DOT' = 0,
    'KSM' = 2,
    'KAR' = 8,
}

export default class PolkadotDappUtil {

    /**
     * generateMnemonic
     */
    generateMnemonic = async function (coinType: string, callback) {
        // wait for the lib load ready
        await cryptoWaitReady();
        const mnemonic = mnemonicGenerate();
        this.getAddress(coinType, mnemonic, function (error, address){
            const result = {'mnemonic': mnemonic, 'address': address};
            if (callback) {
                callback(null, result);
            }
        });
    };

    /**
     * get address from mnemonic and coinType
     * @param coinType
     * @param mnemonic
     * @param callback
     */
    getAddress = function (coinType: string, mnemonic: string, callback) {
        const keyring = new Keyring({ type: 'sr25519' });
        const pair = keyring.addFromUri(mnemonic);
        const ss58Format = SupportedSS58Format[coinType];
        const address = deriveAddress(pair.publicKey, ss58Format);
        callback(null, address);
    }
}