'use client'

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
    return (
        <div className="flex flex-col gap-4">
            
        </div>
    )
}