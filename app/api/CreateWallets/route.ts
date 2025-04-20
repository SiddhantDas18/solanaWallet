import { NextRequest, NextResponse } from "next/server";
import { Keypair } from "@solana/web3.js";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import bs58 from "bs58";

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

        // Convert secret key to base58 string
        const secretKeyString = bs58.encode(Buffer.from(keypair.secretKey));

        return NextResponse.json({
            status: "success",
            wallet: {
                publicKey: keypair.publicKey.toString(),
                secretKey: secretKeyString,
                index: count
            }
        });

    } catch(e) {
        console.error('Error creating wallet:', e);
        return NextResponse.json({
            error: (e as Error).message,
            status: "error"
        }, { status: 500 });
    }
}