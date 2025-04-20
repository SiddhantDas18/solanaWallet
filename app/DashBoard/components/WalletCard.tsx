'use client'

import { WalletWithBalance } from '@/app/DashBoard/types'

interface WalletCardProps {
    wallet: WalletWithBalance;
    index: number;
    isPrivateKeyVisible: boolean;
    onTogglePrivateKey: () => void;
    onDelete: () => void;
}

export default function WalletCard({ 
    wallet, 
    index, 
    isPrivateKeyVisible, 
    onTogglePrivateKey, 
    onDelete 
}: WalletCardProps) {
    return (
        <div className="bg-gray-800 p-4 rounded-lg relative border border-gray-700">
            <button 
                onClick={onDelete}
                className="absolute top-2 right-2 text-red-400 hover:text-red-300"
                title="Delete Wallet"
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M6 18L18 6M6 6l12 12" 
                    />
                </svg>
            </button>

            <div className="flex justify-between items-center mb-2">
                <p className="font-bold text-gray-100">Wallet {index + 1}</p>
                <p className="text-green-400 font-semibold">
                    {wallet.balance?.toFixed(4) || '0'} SOL
                </p>
            </div>

            <p className="break-all text-gray-300">
                Public Key: {wallet.publicKey}
            </p>

            <div className="mt-2 flex items-center gap-2">
                <p className="break-all text-sm text-gray-400">
                    Private Key: {isPrivateKeyVisible 
                        ? wallet.secretKey 
                        : '••••••••••••••••••••'}
                </p>
                <button
                    onClick={onTogglePrivateKey}
                    className="text-blue-400 hover:text-blue-300"
                    title={isPrivateKeyVisible ? "Hide Private Key" : "Show Private Key"}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d={isPrivateKeyVisible
                            ? "M13.875 7.375l-2.375 2.375-2.375-2.375-.875.875 2.375 2.375-2.375 2.375.875.875 2.375-2.375 2.375 2.375.875-.875-2.375-2.375 2.375-2.375-.875-.875z"
                            : "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        }/>
                    </svg>
                </button>
            </div>
        </div>
    )
}