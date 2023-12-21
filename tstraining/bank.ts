import * as BankData from './bankList.json';
import * as userData from './bankUser.json';

interface User{
    pin: number;
    balance: number;
    bankId: string;
    userId: string;
}
interface Bank{
    bankName: string;
    outsideWithdrawalCharge: number;
    outsideBalanceCheckCharge: number;
}

class Bank{
    cPin = 0;
    cUser = "";

    constructor(bankName: string, outsideWithdrawalCharge: number,
        outsideBalanceCheckCharge: number){
        this.bankName = bankName;
        this.outsideWithdrawalCharge = outsideWithdrawalCharge;
        this.outsideBalanceCheckCharge = outsideBalanceCheckCharge;
        }

        inputPin(user: User, userId: string, pin: number): void{
            console.log("");
            console.log(this.bankName);

            if(user.userId !== userId){
                console.log("INVALID USER");
                this.cUser = userId;
            }else if(user.pin !== pin){
                console.log("INVALID PIN");
                this.cPin = pin;
            }
            else{
                console.log("Welcome", user.userId);
            }
        }

        deposit(user: User, inputDeposit: number): void {
            if(this.cPin == 0 && this.cUser == ""){
                console.log("");
                console.log("DEPOSIT [",this.bankName,",",user.userId,"]:");
                if (inputDeposit <= 0) {
                    console.log("Amount Error:", inputDeposit)
                    console.log("Deposit must be higher than 0.")
                }
                else{  
                user.balance += inputDeposit;
                console.log("You deposited ", inputDeposit, ".");
                }}
          }

        checkBalance(user: User): void {
            if(this.cPin == 0 && this.cUser == ""){
                console.log("");
                console.log("CHECK BALANCE [",this.bankName,",",user.userId,"]:");
                if (user.bankId !== this.bankName) {
                    if((user.balance - this.outsideBalanceCheckCharge) >= this.outsideBalanceCheckCharge ){
                        console.log("Outside bank balance check fee will be applied which is ", this.outsideBalanceCheckCharge, ".")
                        console.log("Current balance: ", user.balance -= this.outsideBalanceCheckCharge);
                    }else{
                        console.log("Insufficient balance")
                    }
                }
                else{
                    console.log("Current balance: ", user.balance);
                }}
            }

        withdraw(user: User, inputWithdraw: number): void {
            if(this.cPin == 0 && this.cUser == ""){
                console.log("");
                console.log("WITHDRAW [",this.bankName,",",user.userId,"]:");
                if((inputWithdraw + this.outsideWithdrawalCharge) > user.balance) {
                    console.log("Amount Error:", inputWithdraw)
                    console.log("Insufficient Balance")
                }else if(inputWithdraw < 0){
                    console.log("Amount Error:", inputWithdraw)
                    console.log("Invalid amount")
                }else{
                    if (user.bankId !== this.bankName) {
                        console.log("Outside bank withdrawal fee will be applied which is ", this.outsideWithdrawalCharge, ".")
                        user.balance -= this.outsideWithdrawalCharge;
                        user.balance -= inputWithdraw;
                        console.log("You withdrew ", inputWithdraw, ".");
                    }else{
                        user.balance -= inputWithdraw;
                        console.log("You withdrew ", inputWithdraw, ".");
                    }
                }}
        }
}

const bankList = BankData; const bankUserList = userData;

const bank01 = bankList.bank01;
const PNB01 = new Bank(
    bank01.bankName, bank01.outsideWithdrawalCharge, bank01.outsideBalanceCheckCharge
);
const PNB02 = new Bank(
    bank01.bankName, bank01.outsideWithdrawalCharge, bank01.outsideBalanceCheckCharge
);
const bank02 = bankList.bank02;
const BPI01 = new Bank(
    bank02.bankName, bank02.outsideWithdrawalCharge, bank02.outsideBalanceCheckCharge
);
const BPI02 = new Bank(
    bank02.bankName, bank02.outsideWithdrawalCharge, bank02.outsideBalanceCheckCharge
);


const user01 = bankUserList.users.user01; const user02 = bankUserList.users.user02;

const negInput = -5000;
const highInput = 50000;


// WHICH USER OR WHAT PIN
const userId = "user01";
const userPin = 1111;

//for test case #17
const userId01 = "user01"; const userPin01 = 1111;
const userId02 = "user02"; const userPin02 = 2222;


//////////////////TEST CASES///////////////////////////////

    // //#1
    // PNB01.inputPin(user01, userId, userPin);

    // //#2
    // PNB02.inputPin(user02, userId, userPin);

    // //#3
    // PNB01.inputPin(user01, "user14", userPin);

    // //#4 
    // PNB01.inputPin(user01, userId, userPin);
    // PNB01.deposit(user01, 5000);
    // PNB01.checkBalance(user01);

    // //#5
    // PNB02.inputPin(user02, userId, userPin);
    // PNB02.deposit(user02, negInput );
    // PNB02.checkBalance(user02);

    // //#6
    // PNB01.inputPin(user01, userId, userPin);
    // PNB01.withdraw(user01, negInput);
    // PNB01.checkBalance(user01);

    // //#7
    // PNB01.inputPin(user01, userId, userPin);
    // PNB01.withdraw(user01, 50000);
    // PNB01.checkBalance(user01);

    // //#8
    // PNB02.inputPin(user02, userId, userPin);
    // PNB02.withdraw(user02, 15000);
    // PNB02.checkBalance(user02);

    // //#9
    // BPI02.inputPin(user02, userId, userPin);

    // //#10
    // BPI01.inputPin(user01, userId, userPin);

    // //#11
    // BPI02.inputPin(user02, userId, userPin);
    // BPI02.withdraw(user02, 15000);
    // BPI02.checkBalance(user02);

    // //#12
    // BPI01.inputPin(user01, userId, userPin);
    // BPI01.withdraw(user01, negInput)

    // //#13
    // BPI01.inputPin(user01, userId, userPin);
    // BPI01.withdraw(user01, 30000);

    // //#14
    // BPI02.inputPin(user02, userId, userPin);
    // BPI02.withdraw(user02, 30000);

    // //#15
    // BPI01.inputPin(user01, userId, userPin);
    // BPI01.checkBalance(user01)

    // //#16
    // BPI02.inputPin(user02, userId, userPin);
    // BPI02.checkBalance(user02); //change balance to less than 3

    // //#17
    // BPI01.inputPin(user01, userId01, userPin01); BPI02.inputPin(user02, userId02, userPin02);
    // BPI01.withdraw(user01, 15000); BPI02.withdraw(user02, 15000);
    // BPI01.checkBalance(user01); BPI02.checkBalance(user02);

    // //#18
    // //same bank
    // PNB01.inputPin(user01, userId, userPin);
    // PNB01.withdraw(user01, 5000);
    // PNB01.checkBalance(user01);
    // //different bank
    // PNB02.inputPin(user01, userId, userPin);
    // PNB02.withdraw(user01, 5000);
    // PNB02.checkBalance(user01);


