import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NumerologyService {
  private API = 'https://numerology-api.onrender.com';

  constructor(private http: HttpClient) {}

  getNumber(name: string) {
    return this.http.post<any>(`${this.API}/numerology`, { name });
  }

  getBulkNumbers(names: string[]) {
    return this.http.post<any>(`${this.API}/numerology/bulk`, { names });
  }
}
