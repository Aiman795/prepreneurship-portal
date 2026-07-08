// Run with: npm run hash-password
// Prompts for a password, prints the bcrypt hash to paste into .env as
// ADMIN_PASSWORD_HASH. This way the real password is never stored anywhere,
// only its one-way hash - so even if .env leaked, the raw password wouldn't.

const readline = require("readline");
const bcrypt = require("bcryptjs");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.question("Enter the admin password you want to hash: ", async (password) => {
  if (!password || password.length < 6) {
    console.log("Please use a password of at least 6 characters.");
    rl.close();
    return;
  }

  const hash = await bcrypt.hash(password, 10);
  console.log("\nPaste this into your .env as ADMIN_PASSWORD_HASH:\n");
  console.log(hash);
  console.log("\n(Keep the plain password somewhere safe too - you'll need it to log in.)");
  rl.close();
});
