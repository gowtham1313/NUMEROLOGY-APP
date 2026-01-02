/*import { Component } from '@angular/core';
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
*/

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  // Inputs
  name: string = '';
  dadInitial: string = '';
  momInitial: string = '';
  roundOffNumber: number | null = null;

  // Outputs
  result: number | null = null;
  matched: boolean | null = null;

  // API URL
  private API = 'https://numerology-api-rz4d.onrender.com';

  constructor(private http: HttpClient) {}

  // Called when "Calculate" button is clicked
  calculate(): void {
    // Reset previous output
    this.result = null;
    this.matched = null;

    // Basic validation
    if (!this.name || !this.name.trim()) {
      alert('Please enter a name');
      return;
    }

    const payload = {
      name: this.name.trim(),
      dadInitial: this.dadInitial?.trim() || '',
      momInitial: this.momInitial?.trim() || '',
      roundOffNumber: this.roundOffNumber
    };

    this.http.post<any>(`${this.API}/numerology`, payload)
      .subscribe({
        next: (res) => {
          // Case 1: Round-off number was provided → matched logic
          if (res.matched !== undefined) {
            this.matched = res.matched;
          }
          // Case 2: No round-off → return numerology number
          else if (res.number !== undefined) {
            this.result = res.number;
          }
        },
        error: (err) => {
          console.error('API error:', err);
          alert('Something went wrong. Please try again.');
        }
      });
  }

  // Called when "Clear" button is clicked
  clear(): void {
    this.name = '';
    this.dadInitial = '';
    this.momInitial = '';
    this.roundOffNumber = null;

    this.result = null;
    this.matched = null;
  }
      }
