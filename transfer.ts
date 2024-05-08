import {
  Connection,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  PublicKey,
} from "@solana/web3.js";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const suppliedToPubkey = process.argv[2] || null;

if (!suppliedToPubkey) {
  console.log(`Please provide a public key to send to`);
  process.exit(1);
}

const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");
const toPubkey = new PublicKey(suppliedToPubkey);

console.log(`Your adress to send : ${senderKeypair.publicKey}`);
console.log(`You will send SOL to : ${toPubkey}`);

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

console.log(
  `Loaded own keypair, destination address, connected to Chain Solana`
);

const transaction = new Transaction();

const LAMPORTS_TO_SEND = 100000000;

const sendSolInstruction = SystemProgram.transfer({
  fromPubkey: senderKeypair.publicKey,
  toPubkey,
  lamports: LAMPORTS_TO_SEND,
});

transaction.add(sendSolInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [
  senderKeypair,
]);

console.log(`Finished ! SEnt ${LAMPORTS_TO_SEND} to the address ${toPubkey}`);
console.log(`TRansaction signature is ${signature}`);
