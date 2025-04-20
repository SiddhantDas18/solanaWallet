import { NextRequest, NextResponse } from "next/server";
import { Keypair } from "@solana/web3.js";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import bs58 from "bs58";  // Add this import

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const { mnemonic, count } = data;

        if (!mnemonic) {
            return NextResponse.json({
                status: "error",
                message: "Mnemonic is required"
            }, { status: 400 });
        }

        // Generate seed from mnemonic
        const seed = mnemonicToSeedSync(mnemonic);
        
        // Derive path for Solana (BIP44)
        const path = `m/44'/501'/${count}'/0'`;
        const derivedSeed = derivePath(path, seed.toString('hex')).key;
        
        // Create Solana keypair
        const keypair = Keypair.fromSeed(derivedSeed);

        return NextResponse.json({
            status: "success",
            wallet: {
                publicKey: keypair.publicKey.toString(),
                secretKey: bs58.encode(keypair.secretKey), // Convert to base58
                index: count
            }
        });

    } catch(e) {
        return NextResponse.json({
            error: (e as Error).toString(),
            status: "error"
        }, { status: 500 });
    }
}