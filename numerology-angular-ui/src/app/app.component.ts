import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `
    <h2>Numerology Calculator</h2>

    <input [(ngModel)]="name" placeholder="Enter name" />
    <button (click)="calculate()">Calculate</button>

    <p *ngIf="result">Result: {{ result }}</p>
  `
})
export class AppComponent {
  name = '';
  result: number | null = null;

  API = 'https://numerology-api-rz4d.onrender.com';

  constructor(private http: HttpClient) {}

  calculate() {
    this.http.post<any>(`${this.API}/numerology`, { name: this.name })
      .subscribe(res => this.result = res.number);
  }
}
