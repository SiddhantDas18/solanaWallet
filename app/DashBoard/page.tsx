'use client'

import axios from "axios"
import { generateMnemonic } from "bip39"
import { useState, useEffect } from "react"
import bs58 from 'bs58';
import { Connection, PublicKey } from "@solana/web3.js";
import MnemonicDisplay from "./components/MnemonicDisplay"
import WalletCard from "./components/WalletCard"
import MnemonicInput from "./components/MnemonicInput"
import { WalletWithBalance } from "./types"

interface Wallet {
    publicKey: string;
    secretKey: string;
    index: number;
}

export default function Dashboard() {
    const [wallets, setWallets] = useState<WalletWithBalance[]>([]);
    const [mnemonic, setMnemonic] = useState<string>('');
    const [customMnemonic, setCustomMnemonic] = useState<string>('');
    const [showMnemonic, setShowMnemonic] = useState(false);
    const connection = new Connection("https://api.mainnet-beta.solana.com");
    const [visiblePrivateKeys, setVisiblePrivateKeys] = useState<Set<number>>(new Set());

    const togglePrivateKey = (index: number) => {
        const newVisibleKeys = new Set(visiblePrivateKeys);
        if (newVisibleKeys.has(index)) {
            newVisibleKeys.delete(index);
        } else {
            newVisibleKeys.add(index);
        }
        setVisiblePrivateKeys(newVisibleKeys);
    };

    useEffect(() => {
        const saved = localStorage.getItem('saved');
        if (saved) setMnemonic(saved);
        
        const savedWallets = localStorage.getItem('wallets');
        if (savedWallets) setWallets(JSON.parse(savedWallets));
    }, []);

    async function updateBalances() {
        const updatedWallets = await Promise.all(
            wallets.map(async (wallet) => {
                const balance = await connection.getBalance(new PublicKey(wallet.publicKey));
                return {
                    ...wallet,
                    balance: balance / 1000000000
                };
            })
        );
        setWallets(updatedWallets);
    }

    useEffect(() => {
        if (wallets.length > 0) {
            updateBalances();
        }
    }, [wallets.length]);

    async function createWallet(useCustom: boolean = false) {
        const currentMnemonic = useCustom ? customMnemonic : (mnemonic || generateMnemonic());
        
        setMnemonic(currentMnemonic);
        localStorage.setItem('saved', currentMnemonic);

        try {
            interface CreateWalletResponse {
                status: string;
                wallet: Wallet;
            }

            const response = await axios.post<CreateWalletResponse>('/api/CreateWallets', {
                mnemonic: currentMnemonic,
                count: wallets.length
            });

            if (response.data.status === "success") {
                const newWallets = [...wallets, response.data.wallet];
                setWallets(newWallets.map(wallet => ({ ...wallet, balance: 0 })));
                localStorage.setItem('wallets', JSON.stringify(newWallets));
            }
        } catch (error) {
            console.error('Error creating wallet:', error);
        }
    }

    async function deleteWallet(indexToDelete: number) {
        const newWallets = wallets.filter((_, index) => index !== indexToDelete);
        setWallets(newWallets);
        localStorage.setItem('wallets', JSON.stringify(newWallets));
    }

    return (
        <div className="flex flex-col items-center p-8 gap-6 min-h-screen bg-gray-900 text-gray-100">
            <MnemonicDisplay 
                mnemonic={mnemonic}
                showMnemonic={showMnemonic}
                setShowMnemonic={setShowMnemonic}
            />
            
            <MnemonicInput 
                customMnemonic={customMnemonic}
                setCustomMnemonic={setCustomMnemonic}
                onCreateWallet={createWallet}
            />

            <div className="w-full max-w-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-100">Your Wallets</h2>
                    <button 
                        onClick={updateBalances}
                        className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm"
                    >
                        Refresh Balances
                    </button>
                </div>
                <div className="space-y-4">
                    {wallets.map((wallet, index) => (
                        <WalletCard
                            key={wallet.publicKey}
                            wallet={wallet}
                            index={index}
                            isPrivateKeyVisible={visiblePrivateKeys.has(index)}
                            onTogglePrivateKey={() => togglePrivateKey(index)}
                            onDelete={() => deleteWallet(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}