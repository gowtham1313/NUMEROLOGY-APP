import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `
    <h2>Numerology Calculator</h2>

    <input [(ngModel)]="name" placeholder="Enter name" />
    <input [(ngModel)]="dfl" placeholder="Dad initial" />
    <input [(ngModel)]="mfl" placeholder="Mom initial" />
    <button (click)="calculate()">Calculate</button>

    <p *ngIf="result !== null">Result: {{ result }}</p>
  `
})
export class AppComponent {
  name = '';
  dfl = '';
  mfl = '';
  result: number | null = null;

  API = 'https://numerology-api-rz4d.onrender.com';

  constructor(private http: HttpClient) {}

  calculate() {
    this.http.post<any>(`${this.API}/numerology`, { name: this.name,dfl : this.dfl,mfl : this.mfl})
      .subscribe({
        next: (res) => {
          console.log('API response:', res);
          this.result = res.number;
        },
        error: (err) => {
          console.error('API error:', err);
          alert('API call failed');
        }
      });
  }
}
