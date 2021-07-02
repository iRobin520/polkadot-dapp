// import {PolkadotDappHelper} from "./index";
type CoinType = 'DOT' | 'KSM' | 'KAR';

interface Window {
    polkadotHelper?: {
        address: string;
        coinType: string;
        requestAccounts(coinType: string, callback: (err: any, res: { result: string }) => void): void; //获取当前钱包地址
        requestAllAccounts(coinType: string, callback: (err: any, res: { result: string }) => void): void; //获取所有钱包地址
        requestKeyringPair(callback: (err: string, keyPair: any) => void): void;
    };
}