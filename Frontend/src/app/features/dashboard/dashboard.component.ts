import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../../core/services/job.service';
import { CompanyService } from '../../core/services/company.service';
import { ReviewService } from '../../core/services/review.service';
import { JobWithCompany } from '../../core/models/job.model';
import { Company } from '../../core/models/company.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class DashboardComponent implements OnInit {
  recentJobs: JobWithCompany[] = [];
  companies: Company[] = [];
  totalReviewsCount = 0; // counter only
  loading = false;
  error?: string;

  constructor(
    private jobService: JobService,
    private companyService: CompanyService,
    private reviewService: ReviewService // inject ReviewService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
    this.loadTotalReviewsCount(); // fetch counter
  }

  loadDashboardData(): void {
    this.loading = true;

    // Load recent jobs
    this.jobService.getAllJobs().subscribe({
      next: (jobs) => {
        this.recentJobs = jobs.slice(0, 6);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading jobs:', error);
        this.error = 'Failed to load dashboard data';
        this.loading = false;
      }
    });

    // Load companies
    this.companyService.getAllCompanies().subscribe({
      next: (companies) => this.companies = companies.slice(0, 8),
      error: (error) => console.error('Error loading companies:', error)
    });
  }

  // Load only the review counter
  loadTotalReviewsCount(): void {
    this.reviewService.getTotalReviewsCount().subscribe({
      next: (count: number) => this.totalReviewsCount = count,
      error: () => this.totalReviewsCount = 0
    });
  }

  getSalaryRange(minSalary: string, maxSalary: string): string {
    return `$${minSalary} - $${maxSalary}`;
  }

  // Sample data functions
  addSampleData(): void {
    const sampleCompany: Company = {
      name: 'TechCorp',
      description: 'Leading technology company'
    };

    this.companyService.createCompany(sampleCompany).subscribe({
      next: () => this.loadDashboardData(),
      error: (error) => console.error('Error creating sample company:', error)
    });
  }

  addSampleJob(): void {
    if (this.companies.length === 0) {
      this.error = 'No companies available to add jobs for';
      return;
    }

    const sampleJob = {
      title: 'Software Engineer',
      description: 'Join our team to build amazing products.',
      minSalary: '80000',
      maxSalary: '120000',
      location: 'San Francisco, CA',
      companyId: this.companies[0].id!
    };

    this.jobService.createJob(sampleJob).subscribe({
      next: () => this.loadDashboardData(),
      error: (error) => {
        console.error('Error creating sample job:', error);
        this.error = 'Failed to create sample job';
      }
    });
  }

  getCompanyName(companyId: number): string {
    const company = this.companies.find(c => c.id === companyId);
    return company ? company.name : 'Unknown Company';
  }
}
