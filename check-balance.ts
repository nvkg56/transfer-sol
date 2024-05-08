import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const balance = await connection.getBalance(senderKeypair.publicKey);
const balanceInSol = balance / LAMPORTS_PER_SOL;

console.log(
  `Current balance of the address ${senderKeypair.publicKey} is ${balanceInSol} Sol`
);
