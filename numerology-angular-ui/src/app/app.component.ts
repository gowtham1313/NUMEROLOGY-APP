import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  name = '';
  dadInitial = '';
  momInitial = '';
  roundOffNumber: number | null = null;

  result: number | null = null;
  matched: boolean | null = null;

  API = 'https://numerology-api-rz4d.onrender.com';

  constructor(private http: HttpClient) {}

  calculate() {
    this.http.post<any>(`${this.API}/numerology`, {
      name: this.name,
      dadInitial: this.dadInitial,
      momInitial: this.momInitial,
      roundOffNumber: this.roundOffNumber
    }).subscribe(res => {
      if (res.matched !== undefined) {
        this.matched = res.matched;
        this.result = null;
      } else {
        this.result = res.number;
        this.matched = null;
      }
    });
  }

  clear() {
    this.name = '';
    this.dadInitial = '';
    this.momInitial = '';
    this.roundOffNumber = null;
    this.result = null;
    this.matched = null;
  }
}
