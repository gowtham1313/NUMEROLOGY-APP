import { Component } from '@angular/core';
import { NumerologyService } from '../numerology.service';

@Component({
  selector: 'app-numerology',
  templateUrl: './numerology.component.html',
  styleUrls: ['./numerology.component.css']
})
export class NumerologyComponent {

  name = '';
  bulkNames = '';
  singleResult: number | null = null;
  bulkResult: any[] = [];

  loading = false;
  error = '';

  constructor(private service: NumerologyService) {}

  calculateSingle() {
    this.reset();
    if (!this.name.trim()) return;

    this.loading = true;
    this.service.getNumber(this.name).subscribe({
      next: res => {
        this.singleResult = res.number;
        this.loading = false;
      },
      error: () => this.handleError()
    });
  }

  calculateBulk() {
    this.reset();
    const names = this.bulkNames
      .split(',')
      .map(n => n.trim())
      .filter(Boolean);

    if (!names.length) return;

    this.loading = true;
    this.service.getBulkNumbers(names).subscribe({
      next: res => {
        this.bulkResult = res;
        this.loading = false;
      },
      error: () => this.handleError()
    });
  }

  private reset() {
    this.error = '';
    this.singleResult = null;
    this.bulkResult = [];
  }

  private handleError() {
    this.loading = false;
    this.error = 'Something went wrong. Try again.';
  }
}
