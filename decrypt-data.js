import NodeRSA from 'node-rsa';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

(async () => {
        const privateKey = process.env.PRIVATE_KEY;
        if (!privateKey) {
          console.error('Private key not found in environment variables');
          process.exit(1);
        }
  const encryptedData = fs.readFileSync(process.argv[2], 'utf8'); 

  const key = new NodeRSA();
  key.importKey(privateKey,'private');

  const decrypted = key.decrypt(encryptedData, 'utf8');
  console.log('Decrypted data:', decrypted);
})();
