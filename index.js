import chalk from 'chalk';
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let username;
let data;

let map = new Map();

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
} else {
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
    } else {
        console.log('Create account');
        createAccount();
    }
}

async function login(){
    const usernameInput = await inquirer.prompt({
        name: 'askUsername',
        type: 'input',
        message: 'Enter your username',
    });

    username = usernameInput.askUsername;

    const passwordInput = await inquirer.prompt({
        name: 'askPassword',
        type: 'input',
        message: 'Enter your password',
    });

    let password = passwordInput.askPassword;

    const spinner = createSpinner('Checking answer...\n').start();
    await sleep();
    let isValid = false;
    if (map.size == 0) {
        spinner.error({ text: `Invalid credentials` });
        login();
    } else if (map.get(username).password == (password)) { isValid = true; }

    if (isValid){
        spinner.success({ text: `Logged in` });
        data = map.get(username);
        action();
    } else {
        spinner.error({ text: `Invalid credentials` });
        login();
    }
}

async function createAccount(){

    let newUser;
    let newPassword;

    while (1){
        const usernameInput = await inquirer.prompt({
            name: 'askUsername',
            type: 'input',
            message: 'Enter your new username',
        });
    
        newUser = usernameInput.askUsername;
        if (map.size == 0) { break; }
        if (map.get(newUser).username != null )
        {
            console.log('Username already exists, please pick different one\n');
        } else { break; }
    }

    const passwordInput = await inquirer.prompt({
        name: 'askPassword',
        type: 'input',
        message: 'Enter your new password',
    });

    newPassword = passwordInput.askPassword;
    let newData = {username: newUser, password:newPassword, balance: 0};
    map.set(newUser, newData);
    console.log("Your account has been sucessfully created\n");
    promptUser();
}

async function action(){
    const actions =  await inquirer.prompt({
        name: 'askAction',
        type: 'list',
        message: 'What would you like to do today?\n',
        choices: [
            'Check my balance',
            'Make a deposit',
            'Make a withdrawal',
            'Log out',
            'Exit'
        ],
    });

    if (actions.askAction == 'Check my balance'){
        checkBalance();
    } else if (actions.askAction == 'Make a deposit') {
        deposit();
    } else if (actions.askAction == 'Make a withdrawal') {
        withdrawal();
    } else if (actions.askAction == 'Log out') {
        username = "";
        data = "";
        console.log('Loggout sucessful\n');
        promptUser();
    } else if (actions.askAction == 'Exit') {
        exit();
    }
}

function checkBalance () {
    console.log('Your current balance is: '+ data.balance + '\n');
    action();
}

async function deposit() {
    const input = await inquirer.prompt({
        name: 'askDeposit',
        type: 'input',
        message: 'How much would you like to deposit?',
    });
    data.balance += +input.askDeposit;
    map.set(username, data);
    console.log('Deposit sucessfully completed.\n');
    action();
}

async function withdrawal() {
    const input = await inquirer.prompt({
        name: 'askWithdrawal',
        type: 'input',
        message: 'How much would you like to withdraw?',
    });
    if (+data.balance < +input.askWithdrawal) {
        console.log(chalk.bgRed('The amount you have entered exceeds your balance\n'));
    } else {
        data.balance -= +input.askWithdrawal;
        map.set(username, data);
        console.log('Withdrawal sucessfully completed. Your current balance is: ' + data.balance + '\n');
    }
    action();   
}

function exit() {
    console.log(chalk.bgBlue('Have a great day!'));
    return;
}