import * as web3 from "@solana/web3.js";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const payer = getKeypairFromEnvironment("SECRET_KEY");
const connection = new web3.Connection(
  "https://api.devnet.solana.com",
  "confirmed"
);
const PING_PROGRAM_ADDRESS = new web3.PublicKey(
  "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa"
);
const PING_DATA_ADDRESS = new web3.PublicKey(
  "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod"
);

const instruction = new web3.TransactionInstruction({
  keys: [
    {
      pubkey: PING_DATA_ADDRESS,
      isSigner: false,
      isWritable: true,
    },
  ],
  programId: PING_PROGRAM_ADDRESS,
});

const transaction = new web3.Transaction();
transaction.add(instruction);

const signature = await web3.sendAndConfirmTransaction(
  connection,
  transaction,
  [payer]
);

console.log(`TRansaction completed ! Signature is ${signature}`);
