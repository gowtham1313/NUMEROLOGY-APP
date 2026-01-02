import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* @Component({
  selector: 'app-root',
  template: `
    <h2>Numerology Calculator</h2>

    <input [(ngModel)]="name" placeholder="Enter name" />
    <input [(ngModel)]="dadInitial" placeholder="Dad initial" />
    <input [(ngModel)]="momInitial" placeholder="Mom initial" />

    <div style="margin-top: 10px;">
      <button (click)="calculate()">Calculate</button>
      <button (click)="clear()" style="margin-left: 10px;">Clear</button>
    </div>

    <p *ngIf="result !== null">Result: {{ result }}</p>
  `
})*/
  @Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <div class="card">
        <h2>Numerology Calculator</h2>

        <div class="field">
          <label>Name</label>
          <input [(ngModel)]="name" />
        </div>

        <div class="settings">
          <h3>Settings</h3>

          <div class="field">
            <label>Father Initial (optional)</label>
            <input maxlength="1" [(ngModel)]="dadInitial" />
          </div>

          <div class="field">
            <label>Mother Initial (optional)</label>
            <input maxlength="1" [(ngModel)]="momInitial" />
          </div>

          <div class="field">
            <label>Round-off Number (optional)</label>
            <input type="number" [(ngModel)]="roundOffNumber" />
          </div>
        </div>

        <div class="buttons">
          <button class="primary" (click)="calculate()">Calculate</button>
          <button class="secondary" (click)="clear()">Clear</button>
        </div>

        <div class="result" *ngIf="result !== null">
          Numerology Number: <strong>{{ result }}</strong>
        </div>

        <div class="result success" *ngIf="matched === true">
          ✅ Matched
        </div>

        <div class="result error" *ngIf="matched === false">
          ❌ Not Matched
        </div>
      </div>
    </div>
  `
})
export class AppComponent {
  name = '';
  dadInitial = '';
  momInitial = '';
  result: number | null = null;

  API = 'https://numerology-api-rz4d.onrender.com';

  constructor(private http: HttpClient) {}

  calculate() {
    this.http.post<any>(`${this.API}/numerology`, {
      name: this.name,
      dadInitial: this.dadInitial,
      momInitial: this.momInitial
    }).subscribe(res => {
      this.result = res.number;
    });
  }

  clear() {
    this.name = '';
    this.dadInitial = '';
    this.momInitial = '';
    this.result = null;
  }
      }
