'use client'

interface MnemonicDisplayProps {
    mnemonic: string;
    showMnemonic: boolean;
    setShowMnemonic: (show: boolean) => void;
}

export default function MnemonicDisplay({ mnemonic, showMnemonic, setShowMnemonic }: MnemonicDisplayProps) {
    const copyToClipboard = () => {
        if (showMnemonic) {
            navigator.clipboard.writeText(mnemonic);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto mb-6">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-100">Current Mnemonic Phrase</h2>
                    <div className="flex gap-3">
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
                        {showMnemonic && (
                            <button
                                onClick={copyToClipboard}
                                className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-700 text-gray-400 hover:text-gray-300 transition-all duration-200"
                                title="Copy to Clipboard"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
                <div className="relative">
                    <p className="break-all bg-gray-700/30 p-4 rounded-lg border border-gray-600/50 text-sm font-mono leading-relaxed">
                        {showMnemonic ? mnemonic : '••••••••••••••••••••'}
                    </p>
                </div>
            </div>
        </div>
    )
}