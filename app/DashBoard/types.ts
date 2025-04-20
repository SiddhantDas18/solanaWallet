export interface Wallet {
    publicKey: string;
    secretKey: string;
    index: number;
}

export interface WalletWithBalance extends Wallet {
    balance: number;
}