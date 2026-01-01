import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
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
