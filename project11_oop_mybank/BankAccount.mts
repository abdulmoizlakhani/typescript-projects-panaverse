import { IBankAccount } from "./interfaces/index.js";

class BankAccount implements IBankAccount {
  // set accountBalance(balance: number) {
  //   this.accountBalance = balance;
  // }

  // get accountBalance() {
  //   return this.accountBalance;
  // }

  public accountBalance: number;

  constructor() {
    this.accountBalance = 100;
  }

  public debit(amount: number): string {
    let msg = "Sorry, you have insufficient balance!";

    if (amount > 0) {
      msg = "The amount you entered is wrong!";

      if (this.accountBalance > amount) {
        this.accountBalance = this.accountBalance - amount;
        msg = `Transaction successful! New account balance is ${this.accountBalance}.`;
      } else {
        msg = "You don't have enough money to do this transaction.";
      }
    }

    return msg;
  }

  credit(amount: number): string {
    let msg = "Transaction failed!";

    if (amount > 0) {
      this.accountBalance = this.accountBalance + amount;

      if (amount > 100) {
        this.accountBalance = this.accountBalance - 1;
      }

      msg = "You account has been credited successfully!";
    }

    return msg;
  }
}

export default BankAccount;
