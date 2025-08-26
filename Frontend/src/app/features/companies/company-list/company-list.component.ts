import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyService } from '../../../core/services/company.service';
import { ReviewService } from '../../../core/services/review.service';
import { Company } from '../../../core/models/company.model';
import { Review } from '../../../core/models/review.model';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class CompanyListComponent implements OnInit {

  companies: Company[] = [];
  companyReviews: Map<number, Review[]> = new Map();
  loading = false;
  error?: string;

  constructor(
    private companyService: CompanyService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.fetchCompanies();
  }

  fetchCompanies(): void {
    this.loading = true;
    this.companyService.getAllCompanies().subscribe({
      next: (data) => {
        this.companies = data;
        this.loading = false;
        // Load reviews for each company
        this.companies.forEach(company => {
          if (company.id) {
            this.loadCompanyReviews(company.id);
          }
        });
      },
      error: () => {
        this.error = 'Failed to load companies';
        this.loading = false;
      }
    });
  }

  loadCompanyReviews(companyId: number): void {
    this.reviewService.getReviewsByCompanyId(companyId).subscribe({
      next: (reviews) => {
        this.companyReviews.set(companyId, reviews);
      },
      error: (error) => {
        console.error(`Error loading reviews for company ${companyId}:`, error);
        this.companyReviews.set(companyId, []);
      }
    });
  }

  getCompanyReviews(companyId: number): Review[] {
    return this.companyReviews.get(companyId) || [];
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
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    
    if (hasHalfStar) {
      stars.push('☆');
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push('☆');
    }
    
    return stars;
  }

  // Method to add sample company data for testing
  addSampleCompany(): void {
    const sampleCompany: Company = {
      name: 'TechCorp',
      description: 'Leading technology company'
    };

    this.companyService.createCompany(sampleCompany).subscribe({
      next: (response) => {
        console.log('Sample company created:', response);
        this.fetchCompanies(); // Reload data
      },
      error: (error) => {
        console.error('Error creating sample company:', error);
        this.error = 'Failed to create sample company';
      }
    });
  }

  // Method to add sample review data for testing
  addSampleReview(companyId: number): void {
    const sampleReview: Review = {
      title: 'Great Company to Work For',
      description: 'Excellent work environment and great team collaboration.',
      rating: 4.5,
      companyId: companyId
    };

    this.reviewService.createReview(companyId, sampleReview).subscribe({
      next: (response) => {
        console.log('Sample review created:', response);
        this.loadCompanyReviews(companyId); // Reload reviews for this company
      },
      error: (error) => {
        console.error('Error creating sample review:', error);
        this.error = 'Failed to create sample review';
      }
    });
  }
}
