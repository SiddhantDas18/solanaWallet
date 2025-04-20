'use client'

interface MnemonicDisplayProps {
    mnemonic: string;
    showMnemonic: boolean;
    setShowMnemonic: (show: boolean) => void;
}

export default function MnemonicDisplay({ mnemonic, showMnemonic, setShowMnemonic }: MnemonicDisplayProps) {
    return (
        <div className="w-full max-w-2xl mb-4">
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h2 className="text-xl font-bold mb-2 text-gray-100">Current Mnemonic Phrase</h2>
                <div className="relative">
                    <p className="break-all bg-gray-700 p-3 rounded border border-gray-600 text-sm">
                        {showMnemonic ? mnemonic : '••••••••••••••••••••'}
                    </p>
                </div>
            </div>
        </div>
    )
}