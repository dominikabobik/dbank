import chalk from 'chalk';
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let account;
let password;

let map = new Map();
//map.set('ka', 'kl');

const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

console.log(figlet.textSync('Welcome to DBank!', {}));


const hasAccount =  await inquirer.prompt({
    name: 'askAccount',
    type: 'list',
    message: 'Do you have an account?\n',
    choices: [
        'Yes',
        'No',
    ],
});

if (hasAccount.askAccount.localeCompare("Yes") == 0) {
    login();
}
else {
    console.log('Create account');
    createAccount();
}

async function promptUser() {
    const hasAccount =  await inquirer.prompt({
        name: 'askAccount',
        type: 'list',
        message: 'Do you have an account?\n',
        choices: [
            'Yes',
            'No',
        ],
    });
    
    if (hasAccount.askAccount.localeCompare("Yes") == 0) {
        login();
    }
    else {
        console.log('Create account');
        createAccount();
    }
}

async function login(){
    const accountInput = await inquirer.prompt({
        name: 'askLogin',
        type: 'input',
        message: 'Enter your login',
    });

    account = accountInput.askLogin;

    const passwordInput = await inquirer.prompt({
        name: 'askPassword',
        type: 'input',
        message: 'Enter your password',
    });

    password = passwordInput.askPassword;

    const spinner = createSpinner('Checking answer...\n').start();
    await sleep();
    let isValid = false;
    if (map.get(account) == (password)) { isValid = true; }
    if (isValid){
        spinner.success({ text: `Logged in` });
    }
    else {
        spinner.error({ text: `Invalid credentials` });
    }
}

async function createAccount(){

    let newUser;
    let newPassword;

    while (1){
        const userInput = await inquirer.prompt({
            name: 'askUsername',
            type: 'input',
            message: 'Enter your new username',
        });
    
        newUser = userInput.askUsername;
        if (map.get(newUser) != null )
        {
            console.log('Username already exists, please pick different one\n');
        }
        else { break; }
    }

    const passwordInput = await inquirer.prompt({
        name: 'askPassword',
        type: 'input',
        message: 'Enter your new password',
    });

    newPassword = passwordInput.askPassword;
    
    map.set(newUser, newPassword);
    console.log("Your account has been sucessfully created\n");
    promptUser();
}