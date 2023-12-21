import * as BankData from './bankList.json';
import * as userData from './bankUser.json';

interface User{
    pin: number;
    balance: number;
    bankId: string;
    userId: string;
}


class Bank{
    bankName: string;
    outsideWithdrawalCharge: number;
    outsideBalanceCheckCharge: number;
    tempPin=0;
    // currentUser: User | null = null;

    constructor(bankName: string, outsideWithdrawalCharge: number,
        outsideBalanceCheckCharge: number){
        this.bankName = bankName;
        this.outsideWithdrawalCharge = outsideWithdrawalCharge;
        this.outsideBalanceCheckCharge = outsideBalanceCheckCharge;
        }

        pickBank(user: User, pin: number): void{
            console.log("");
            console.log(this.bankName);

            // if (user.userId !== this.currentUser?.userId) {
            //     console.log("INVALID USER");
            //     this.currentUser = user;
            // }else{
            //     console.log("Welcome ", this.currentUser.userId)
            // }

            if(user.pin !== pin){
                console.log("INVALID PIN");
                this.tempPin = pin;
            }else{
                console.log("PIN: ****");
             }
        }


        deposit(user: User, inputDeposit: number): void {
            if(this.tempPin == 0){
                console.log("");
                console.log("DEPOSIT");
                if (inputDeposit <= 0) {
                    console.log("Deposit must be higher than 0.")
                }
                else{  
                user.balance += inputDeposit;
                console.log("You deposited ", inputDeposit, ".");
                }}
          }

        checkBalance(user: User): void {
            if(this.tempPin == 0){
                console.log("");
                console.log("CHECK BALANCE");
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
            if(this.tempPin == 0){
                console.log("");
                console.log("WITHDRAW");
                if((inputWithdraw + this.outsideWithdrawalCharge) > user.balance) {
                    console.log("Insufficient Balance")
                }else if(inputWithdraw < 0){
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

const bankList = BankData;
const bankUserList = userData;

const pnbBank = new Bank
(
    bankList.bank01.bankName,
    bankList.bank01.outsideWithdrawalCharge,
    bankList.bank01.outsideBalanceCheckCharge,
  );

  const bdoBank = new Bank(
    bankList.bank02.bankName,
    bankList.bank02.outsideWithdrawalCharge,
    bankList.bank02.outsideBalanceCheckCharge,

  );

  const secBank = new Bank(
    bankList.bank03.bankName,
    bankList.bank03.outsideWithdrawalCharge,
    bankList.bank03.outsideBalanceCheckCharge,

  );

    const user01 = bankUserList.user01;
    const user02 = bankUserList.user02;
    const user03 = bankUserList.user03;

    // //Normal Flow - same bank
    // pnbBank.pickBank(user02, user02.pin);
    // pnbBank.checkBalance(user01);
    // pnbBank.deposit(user01, -5000 );
    // pnbBank.checkBalance(user01);
    // pnbBank.withdraw(user02, 30000);
    // pnbBank.checkBalance(user02);

    //Multiple Users
    pnbBank.pickBank(user01, user01.pin)
    pnbBank.pickBank(user02, user02.pin)
    pnbBank.deposit(user01, 5000)
    pnbBank.checkBalance(user02)
    pnbBank.checkBalance(user01)
    pnbBank.deposit(user02, 10000)
    pnbBank.checkBalance(user01)
    pnbBank.checkBalance(user02)



