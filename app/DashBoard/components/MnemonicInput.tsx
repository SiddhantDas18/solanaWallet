'use client'

import { useState } from 'react'

interface MnemonicInputProps {
    customMnemonic: string;
    setCustomMnemonic: (value: string) => void;
    onCreateWallet: (useCustom: boolean) => void;
}

export default function MnemonicInput({ 
    customMnemonic, 
    setCustomMnemonic, 
    onCreateWallet 
}: MnemonicInputProps) {
    const [showMnemonic, setShowMnemonic] = useState(false);

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-100">Create New Wallet</h2>
                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <label htmlFor="mnemonic" className="block text-sm font-medium text-gray-300">
                                Enter Custom Mnemonic (Optional)
                            </label>
                            <button
                                onClick={() => setShowMnemonic(!showMnemonic)}
                                className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-700 text-blue-400 hover:text-blue-300 transition-all duration-200"
                                title={showMnemonic ? "Hide Mnemonic" : "Show Mnemonic"}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d={showMnemonic
                                        ? "M13.875 7.375l-2.375 2.375-2.375-2.375-.875.875 2.375 2.375-2.375 2.375.875.875 2.375-2.375 2.375 2.375.875-.875-2.375-2.375 2.375-2.375-.875-.875z"
                                        : "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    }/>
                                </svg>
                            </button>
                        </div>
                        <div className="relative">
                            <textarea
                                id="mnemonic"
                                value={showMnemonic ? customMnemonic : ''}
                                onChange={(e) => setCustomMnemonic(e.target.value)}
                                className="w-full bg-gray-700/30 border border-gray-600/50 rounded-lg p-4 text-gray-100 text-sm font-mono placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
                                placeholder={showMnemonic ? "Enter your 12 or 24 word mnemonic phrase" : ""}
                                rows={3}
                            />
                            {!showMnemonic && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="text-gray-500 text-sm font-mono">
                                        {Array(customMnemonic.split(' ').length).fill('••••••••').join(' ')}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => onCreateWallet(false)}
                            className="flex-1 bg-blue-600/80 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/20"
                        >
                            Generate New Wallet
                        </button>
                        {customMnemonic && (
                            <button
                                onClick={() => onCreateWallet(true)}
                                className="flex-1 bg-green-600/80 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-green-500/20"
                            >
                                Use Custom Mnemonic
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}