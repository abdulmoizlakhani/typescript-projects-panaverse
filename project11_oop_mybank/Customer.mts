import BankAccount from "./BankAccount.mjs";
import { v4 as uuidv4 } from "uuid";

interface CustomerProp {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  mobileNumber: string;
  pinCode: string;
}

const customers: Customer[] = [];

class Customer {
  private customerId: string;
  public firstName: string;
  public lastName: string;
  public gender: string;
  public age: number;
  public mobileNumber: string;
  public bankAccount: BankAccount;
  public pinCode: string;

  constructor(data: CustomerProp) {
    this.customerId = uuidv4();
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.gender = data.gender;
    this.age = data.age;
    this.mobileNumber = data.mobileNumber;
    this.bankAccount = new BankAccount();
    this.pinCode = data.pinCode;
  }

  static createNewCustomer(customerInfo: CustomerProp) {
    const customer = new Customer(customerInfo);
    customers.push(customer);
  }

  static getCustomerInfo(pCode: string): string {
    const customer = customers.find((c) => c.pinCode === pCode);
    if (customer) {
      return `
        Customer ID: ${customer.customerId}
        Name: ${customer.firstName} ${customer.lastName}
        Age: ${customer.age}
        Gender: ${customer.gender}
        Mobile: ${customer.mobileNumber}
        Account Balance: ${customer.bankAccount.accountBalance}
      `;
    } else {
      return "Invalid Pin Code or Account doesn't exist!";
    }
  }

  static creditAmount(pCode: string, amount: number): string {
    const customer = customers.find((c) => c.pinCode === pCode);
    return customer.bankAccount.credit(amount);
  }

  static debitAmount(pCode: string, amount: number): string {
    const customer = customers.find((c) => c.pinCode === pCode);
    return customer.bankAccount.debit(amount);
  }

  // Setters
  // set firstName(fName: string) {
  //   this.firstName = fName;
  // }
  // set lastName(lName: string) {
  //   this.lastName = lName;
  // }
  // set gender(gender: string) {
  //   this.gender = gender;
  // }
  // set age(age: number) {
  //   this.age = age;
  // }
  // set mobileNumber(mobileNumber: string) {
  //   this.mobileNumber = mobileNumber;
  // }
  // set bankAccount(bAccount: BankAccount) {
  //   this.bankAccount = bAccount;
  // }
  // set pinCode(pCode: string) {
  //   this.pinCode = pCode;
  // }

  // Getters
  // get firstName() {
  //   return this.firstName;
  // }
  // get lastName() {
  //   return this.lastName;
  // }
  // get gender() {
  //   return this.gender;
  // }
  // get age() {
  //   return this.age;
  // }
  // get mobileNumber() {
  //   return this.mobileNumber;
  // }
  // get bankAccount() {
  //   return this.bankAccount;
  // }
}

export default Customer;
