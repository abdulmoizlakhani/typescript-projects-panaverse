import BankAccount from "./BankAccount.mjs";
import { v4 as uuidv4 } from "uuid";
const customers = [];
class Customer {
    customerId;
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    bankAccount;
    pinCode;
    constructor(data) {
        this.customerId = uuidv4();
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.gender = data.gender;
        this.age = data.age;
        this.mobileNumber = data.mobileNumber;
        this.bankAccount = new BankAccount();
        this.pinCode = data.pinCode;
    }
    static createNewCustomer(customerInfo) {
        const customer = new Customer(customerInfo);
        customers.push(customer);
    }
    static getCustomerInfo(pCode) {
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
        }
        else {
            return "Invalid Pin Code or Account doesn't exist!";
        }
    }
    static creditAmount(pCode, amount) {
        const customer = customers.find((c) => c.pinCode === pCode);
        return customer.bankAccount.credit(amount);
    }
    static debitAmount(pCode, amount) {
        const customer = customers.find((c) => c.pinCode === pCode);
        return customer.bankAccount.debit(amount);
    }
}
export default Customer;
//# sourceMappingURL=Customer.mjs.map