interface IBankAccount {
  debit(d: number): string;
  credit(d: number): string;
}

export { IBankAccount };
