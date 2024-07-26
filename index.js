import inquirer from 'inquirer';
import chalk from 'chalk';
import NodeRSA from 'node-rsa';
import fs from 'fs';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer'

dotenv.config();

    const sendEmail = async (encryptedEmail) => {
        try {
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS, 
            },
          });
      
          const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'bourdierkelvin@gmail.com',
            subject: 'Encrypted Email Address',
            text: `Here is the encrypted email address: ${encryptedEmail}`,
          };
      
          await transporter.sendMail(mailOptions);
          console.log('Email sent successfully');
        } catch (error) {
          console.error('Failed to send email:', error.message);
        }
      };
      
      (async () => {
        const answers = await inquirer.prompt([
          {
            type: 'input',
            name: 'email',
            message: "What's your email address?",
          },
        ]);
      
        const keyData = fs.readFileSync('public.key', 'utf8');
      
        const key = new NodeRSA();
        key.importKey(keyData);
      
        const encrypted = key.encrypt(answers.email, 'base64');
        console.log(chalk.yellow('------ copy below ------'));
        console.log(chalk.green(encrypted));
        console.log(chalk.yellow('------ copy above ------'));
      
        await sendEmail(encrypted);
      
        console.log(`
          ${chalk.blueBright('Step 1:')} Copy the green text above - it's your encrypted email. Nobody can read it but me.
          ${chalk.blueBright('Step 2:')} You will receive a sticker pack virtually soon!
        `);

})();
