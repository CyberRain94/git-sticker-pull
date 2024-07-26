const NodeRSA = require('node-rsa');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

(async () => {
        const privateKey = process.env.PRIVATE_KEY;
        if (!privateKey) {
          console.error('Private key not found in environment variables');
          process.exit(1);
        }
  const encryptedData = fs.readFileSync(process.argv[2], 'utf8'); // Example file path from command line arguments

  const key = new NodeRSA();
  key.importKey(privateKey,'private');

  const decrypted = key.decrypt(encryptedData, 'utf8');
  console.log('Decrypted data:', decrypted);
})();
