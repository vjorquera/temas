import { ChangeDetectionStrategy, Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  status: string;
}

@Component({
  selector: 'app-shared-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './shared-dashboard.html',
  styleUrl: './shared-dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedDashboardComponent {

  // Sample data
  private allTransactions = signal<Transaction[]>([
    { id: 1, date: '2023-10-01', description: 'Groceries', amount: 150.50, status: 'Completed' },
    { id: 2, date: '2023-10-02', description: 'Online Purchase', amount: 55.00, status: 'Completed' },
    { id: 3, date: '2023-10-03', description: 'Utility Bill', amount: 80.75, status: 'Pending' },
    { id: 4, date: '2023-10-04', description: 'Dinner Out', amount: 120.00, status: 'Completed' },
    { id: 5, date: '2023-10-05', description: 'Gas Refill', amount: 45.20, status: 'Completed' },
    { id: 6, date: '2023-10-06', description: 'Subscription', amount: 15.00, status: 'Completed' },
    { id: 7, date: '2023-10-07', description: 'Pharmacy', amount: 30.00, status: 'Pending' },
    { id: 8, date: '2023-10-08', description: 'Book Store', amount: 25.50, status: 'Completed' },
    { id: 9, date: '2023-10-09', description: 'Transport', amount: 10.00, status: 'Completed' },
    { id: 10, date: '2023-10-10', description: 'Electricity Bill', amount: 110.00, status: 'Completed' },
     { id: 11, date: '2023-10-11', description: 'Groceries', amount: 150.50, status: 'Completed' },
    { id: 12, date: '2023-10-12', description: 'Online Purchase', amount: 55.00, status: 'Completed' },
    { id: 13, date: '2023-10-13', description: 'Utility Bill', amount: 80.75, status: 'Pending' },
    { id: 14, date: '2023-10-14', description: 'Dinner Out', amount: 120.00, status: 'Completed' },
    { id: 15, date: '2023-10-15', description: 'Gas Refill', amount: 45.20, status: 'Completed' },
    { id: 16, date: '2023-10-16', description: 'Subscription', amount: 15.00, status: 'Completed' },
    { id: 17, date: '2023-10-17', description: 'Pharmacy', amount: 30.00, status: 'Pending' },
    { id: 18, date: '2023-10-18', description: 'Book Store', amount: 25.50, status: 'Completed' },
    { id: 19, date: '2023-10-19', description: 'Transport', amount: 10.00, status: 'Completed' },
    { id: 20, date: '2023-10-20', description: 'Electricity Bill', amount: 110.00, status: 'Completed' },
  ]);

  // State for filtering and pagination
  filterTerm = signal('');
  pageSize = signal(5);
  currentPage = signal(1);

  // Computed signal for filtered transactions
  filteredTransactions = computed(() => {
    const term = this.filterTerm().toLowerCase();
    return this.allTransactions().filter(transaction =>
      transaction.description.toLowerCase().includes(term) ||
      transaction.status.toLowerCase().includes(term)
    );
  });

  // Computed signal for paginated transactions
  paginatedTransactions = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return this.filteredTransactions().slice(start, end);
  });

  // Computed signal for total number of pages
  totalPages = computed(() => Math.ceil(this.filteredTransactions().length / this.pageSize()));

  // Methods for pagination controls
  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(page => page + 1);
    }
  }

  previousPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(page => page - 1);
    }
  }

  goToPage(page: number) {
      if (page >= 1 && page <= this.totalPages()){
          this.currentPage.set(page);
      }
  }

  // Method to update filter term
  onFilterChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.filterTerm.set(inputElement.value);
    this.currentPage.set(1); // Reset to first page on filter change
  }
}
