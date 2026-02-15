// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
// import { ApiService } from '../services/api.service';

// @Component({
//   selector: 'app-clerk-dashboard',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   template: `
//     <div class="page">
//       <h2>Clerk Dashboard</h2>
//       <div class="grid two">
//         <div class="card">
//           <h3>Account Queries</h3>
//           <label>Account Number</label>
//           <input type="number" [formControl]="accountIdControl" />
//           <div>
//             <button (click)="getAllAccounts()">All Accounts</button>
//             <button (click)="getAccountById()">By Account</button>
//             <button (click)="getAccountWithTx()">With Transactions</button>
//             <button (click)="getSummary()">Summary</button>
//             <button (click)="getSummaryByAccount()">Summary by Account</button>
//           </div>
//           <div class="inline-error" *ngIf="errorMessage">{{ errorMessage }}</div>
//           <pre class="result">{{ resultText }}</pre>
//         </div>

//         <div class="card">
//           <h3>Transactions</h3>
//           <form [formGroup]="depositForm" (ngSubmit)="deposit()">
//             <label>Deposit - Account Number</label><input type="number" formControlName="accountId" />
//             <label>Amount</label><input type="number" formControlName="amount" />
//             <button type="submit">Deposit</button>
//           </form>

//           <form [formGroup]="withdrawForm" (ngSubmit)="withdraw()">
//             <label>Withdraw - Account Number</label><input type="number" formControlName="accountId" />
//             <label>Amount</label><input type="number" formControlName="amount" />
//             <button type="submit">Withdraw</button>
//           </form>

//           <form [formGroup]="transferForm" (ngSubmit)="transfer()">
//             <label>From Account</label><input type="number" formControlName="fromAccountId" />
//             <label>To Account</label><input type="number" formControlName="toAccountId" />
//             <label>Amount</label><input type="number" formControlName="amount" />
//             <button type="submit">Transfer</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   `
// })
// export class ClerkDashboardComponent {
//   errorMessage = '';
//   resultText = 'Awaiting action...';
//   accountIdControl = this.fb.control<number | null>(null);

//   depositForm = this.fb.group({ accountId: [0, Validators.required], amount: [0, Validators.required] });
//   withdrawForm = this.fb.group({ accountId: [0, Validators.required], amount: [0, Validators.required] });
//   transferForm = this.fb.group({ fromAccountId: [0, Validators.required], toAccountId: [0, Validators.required], amount: [0, Validators.required] });

//   constructor(private fb: FormBuilder, private api: ApiService) {}

//   getAllAccounts(): void { this.execute(() => this.api.getAllAccounts()); }
//   getAccountById(): void { this.executeWithAccountId((id) => this.api.getAccountById(id)); }
//   getAccountWithTx(): void { this.executeWithAccountId((id) => this.api.getAccountWithTransactions(id)); }
//   getSummary(): void { this.execute(() => this.api.getAccountSummary()); }
//   getSummaryByAccount(): void { this.executeWithAccountId((id) => this.api.getAccountSummaryByAccount(id)); }

//   deposit(): void {
//     const { accountId, amount } = this.depositForm.getRawValue();
//     if (!accountId || !amount || accountId <= 0 || amount <= 0) return this.invalidInfo();
//     this.execute(() => this.api.deposit({ accountId, amount }));
//   }

//   withdraw(): void {
//     const { accountId, amount } = this.withdrawForm.getRawValue();
//     if (!accountId || !amount || accountId <= 0 || amount <= 0) return this.invalidInfo();
//     this.execute(() => this.api.withdraw({ accountId, amount }));
//   }

//   transfer(): void {
//     const { amount, fromAccountId, toAccountId } = this.transferForm.getRawValue();
//     if (!amount || !fromAccountId || !toAccountId || amount <= 0 || fromAccountId <= 0 || toAccountId <= 0) return this.invalidInfo();
//     this.execute(() => this.api.transfer({ fromAccountId, toAccountId, amount }));
//   }

//   private executeWithAccountId(request: (id: number) => any): void {
//     const id = this.accountIdControl.value ?? 0;
//     if (id <= 0) return this.invalidInfo();
//     this.execute(() => request(id));
//   }

//   private execute(request: () => any): void {
//     this.errorMessage = '';
//     request().subscribe({
//       next: (res: unknown) => (this.resultText = JSON.stringify(res, null, 2)),
//       error: () => this.invalidInfo()
//     });
//   }

//   private invalidInfo(): void {
//     this.errorMessage = 'Invalid info entered.';
//   }
// }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-clerk-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="page">
      <section class="welcome">
        <h2>Clerk Dashboard</h2>
        <p>Clerk actions: account queries, deposit, withdraw, transfer.</p>
      </section>
      
      <span class="role-badge">ROLE_CLERK</span>

      <div class="grid two">
        <div class="card">
          <h3>Account Queries</h3>
          <label>Account Number</label>
          <input type="number" [formControl]="accountIdControl" placeholder="1001" />
          
          <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px;">
            <button class="small" (click)="getAllAccounts()">All Accounts</button>
            <button class="small" (click)="getAccountById()">By Account</button>
            <button class="small" (click)="getAccountWithTx()">With Transactions</button>
            <button class="small" (click)="getSummary()">Summary</button>
            <button class="small" (click)="getSummaryByAccount()">Summary by Account</button>
          </div>
        </div>

        <div class="card">
          <h3>Transactions</h3>
          
          <form [formGroup]="depositForm" (ngSubmit)="deposit()">
            <label>Deposit Account</label>
            <input type="number" formControlName="accountId" placeholder="1001" />
            <label>Amount</label>
            <input type="number" formControlName="amount" placeholder="500" />
            <button type="submit" style="width: 100%;">Deposit</button>
          </form>

          <form [formGroup]="withdrawForm" (ngSubmit)="withdraw()">
            <label>Withdraw Account</label>
            <input type="number" formControlName="accountId" placeholder="1001" />
            <label>Amount</label>
            <input type="number" formControlName="amount" placeholder="300" />
            <button type="submit" style="width: 100%;">Withdraw</button>
          </form>

          <form [formGroup]="transferForm" (ngSubmit)="transfer()">
            <label>From Account</label>
            <input type="number" formControlName="fromAccountId" placeholder="1001" />
            <label>To Account</label>
            <input type="number" formControlName="toAccountId" placeholder="1002" />
            <label>Amount</label>
            <input type="number" formControlName="amount" placeholder="200" />
            <button type="submit" style="width: 100%;">Transfer</button>
          </form>
        </div>
      </div>

      <div class="inline-error" *ngIf="errorMessage">{{ errorMessage }}</div>
      <pre class="result" *ngIf="resultText !== 'Awaiting action...'">{{ resultText }}</pre>
    </div>
  `
})
export class ClerkDashboardComponent {
  errorMessage = '';
  resultText = 'Awaiting action...';
  accountIdControl = this.fb.control<number | null>(null);

  depositForm = this.fb.group({ accountId: [0, Validators.required], amount: [0, Validators.required] });
  withdrawForm = this.fb.group({ accountId: [0, Validators.required], amount: [0, Validators.required] });
  transferForm = this.fb.group({ fromAccountId: [0, Validators.required], toAccountId: [0, Validators.required], amount: [0, Validators.required] });

  constructor(private fb: FormBuilder, private api: ApiService) {}

  getAllAccounts(): void { this.execute(() => this.api.getAllAccounts()); }
  getAccountById(): void { this.executeWithAccountId((id) => this.api.getAccountById(id)); }
  getAccountWithTx(): void { this.executeWithAccountId((id) => this.api.getAccountWithTransactions(id)); }
  getSummary(): void { this.execute(() => this.api.getAccountSummary()); }
  getSummaryByAccount(): void { this.executeWithAccountId((id) => this.api.getAccountSummaryByAccount(id)); }

  deposit(): void {
    const { accountId, amount } = this.depositForm.getRawValue();
    if (!accountId || !amount || accountId <= 0 || amount <= 0) return this.invalidInfo();
    this.execute(() => this.api.deposit({ accountId, amount }));
  }

  withdraw(): void {
    const { accountId, amount } = this.withdrawForm.getRawValue();
    if (!accountId || !amount || accountId <= 0 || amount <= 0) return this.invalidInfo();
    this.execute(() => this.api.withdraw({ accountId, amount }));
  }

  transfer(): void {
    const { amount, fromAccountId, toAccountId } = this.transferForm.getRawValue();
    if (!amount || !fromAccountId || !toAccountId || amount <= 0 || fromAccountId <= 0 || toAccountId <= 0) return this.invalidInfo();
    this.execute(() => this.api.transfer({ fromAccountId, toAccountId, amount }));
  }

  private executeWithAccountId(request: (id: number) => any): void {
    const id = this.accountIdControl.value ?? 0;
    if (id <= 0) return this.invalidInfo();
    this.execute(() => request(id));
  }

  private execute(request: () => any): void {
    this.errorMessage = '';
    request().subscribe({
      next: (res: unknown) => (this.resultText = JSON.stringify(res, null, 2)),
      error: () => this.invalidInfo()
    });
  }

  private invalidInfo(): void {
    this.errorMessage = 'Invalid info entered.';
  }
}

