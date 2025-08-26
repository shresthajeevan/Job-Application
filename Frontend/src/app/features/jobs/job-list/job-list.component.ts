import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../../../core/services/job.service';
import { ReviewService } from '../../../core/services/review.service';
import { JobWithCompany } from '../../../core/models/job.model';
import { Review } from '../../../core/models/review.model';
import { CompanyService } from '../../../core/services/company.service';
import { Company } from '../../../core/models/company.model';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class JobListComponent implements OnInit {
  jobs: JobWithCompany[] = [];
  jobReviews: Map<number, Review[]> = new Map();
  loading = false;
  error?: string;

  constructor(
    private jobService: JobService,
    private reviewService: ReviewService,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.fetchJobs();
  }

  // Fetch all jobs with company info
  fetchJobs(): void {
    this.loading = true;
    this.jobService.getAllJobs().subscribe({
      next: (data) => {
        this.jobs = data;
        this.loading = false;

        // Load reviews for each company
        this.jobs.forEach(jobWithCompany => {
          if (jobWithCompany.company?.id) {
            this.loadCompanyReviews(jobWithCompany.company.id);
          }
        });
      },
      error: (error) => {
        this.error = 'Failed to load jobs';
        this.loading = false;
        console.error('Error fetching jobs:', error);
      }
    });
  }

  // Load reviews for a given company
  loadCompanyReviews(companyId: number): void {
    this.reviewService.getReviewsByCompanyId(companyId).subscribe({
      next: (reviews) => this.jobReviews.set(companyId, reviews),
      error: (error) => {
        console.error(`Error loading reviews for company ${companyId}:`, error);
        this.jobReviews.set(companyId, []);
      }
    });
  }

  getCompanyReviews(companyId: number): Review[] {
    return this.jobReviews.get(companyId) || [];
  }

  getAverageRating(companyId: number): number {
    const reviews = this.getCompanyReviews(companyId);
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  }

  getStarRating(rating: number): string[] {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) stars.push('★');
    if (hasHalfStar) stars.push('☆');
    for (let i = stars.length; i < 5; i++) stars.push('☆');

    return stars;
  }

  getSalaryRange(minSalary: string, maxSalary: string): string {
    return `$${minSalary} - $${maxSalary}`;
  }

  // Add sample company and job
  addSampleCompanyAndJob(): void {
    const sampleCompany: Company = {
      name: 'TechCorp',
      description: 'Leading technology company'
    };

    this.companyService.createCompany(sampleCompany).subscribe({
      next: (companyResponse: any) => {
        console.log('Sample company created:', companyResponse);

        // Use the real company ID returned by the backend
        const sampleJob = {
          title: 'Software Engineer',
          description: 'Join our team to build amazing products.',
          minSalary: '80000',
          maxSalary: '120000',
          location: 'San Francisco, CA',
          companyId: companyResponse.id // <- critical fix
        };

        this.jobService.createJob(sampleJob).subscribe({
          next: () => {
            console.log('Sample job created successfully');
            this.fetchJobs(); // reload jobs after creation
          },
          error: (error) => {
            console.error('Error creating sample job:', error);
            this.error = 'Failed to create sample job';
          }
        });
      },
      error: (error) => {
        console.error('Error creating sample company:', error);
        this.error = 'Failed to create sample company';
      }
    });
  }
}
