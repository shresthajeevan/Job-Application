import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../../../core/services/review.service';
import { CompanyService } from '../../../core/services/company.service';
import { Review } from '../../../core/models/review.model';
import { Company } from '../../../core/models/company.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ReviewListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() companyId?: number;

  reviews: Review[] = [];
  companies: Company[] = [];
  totalReviewsCount = 0;  // ✅ total counter
  loading = false;
  error?: string;

  currentIndex = 0; // for slider
  private reviewsSubscription?: Subscription;

  constructor(
    private reviewService: ReviewService,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    // Subscribe to review updates
    this.reviewsSubscription = this.reviewService.reviewsUpdated$.subscribe(() => {
      const cid = this.companyId ?? this.companies[0]?.id;
      if (cid !== undefined) this.fetchReviews(cid);
      this.fetchTotalReviewsCount();
    });

    if (this.companyId !== undefined) {
      this.fetchReviews(this.companyId);
      this.fetchTotalReviewsCount();
    } else {
      // Load companies and fetch reviews for the first company
      this.companyService.getAllCompanies().subscribe({
        next: (data) => {
          this.companies = data;
          const firstId = this.companies[0]?.id;
          if (firstId !== undefined) {
            this.fetchReviews(firstId);
            this.fetchTotalReviewsCount();
          } else {
            this.error = 'No companies available';
          }
        },
        error: (err) => {
          console.error('Error fetching companies:', err);
          this.error = 'Failed to load companies';
        }
      });
    }
  }

  ngOnChanges(): void {
    if (this.companyId !== undefined) {
      this.fetchReviews(this.companyId);
      this.fetchTotalReviewsCount();
    }
  }

  ngOnDestroy(): void {
    this.reviewsSubscription?.unsubscribe();
  }

  fetchReviews(companyId: number): void {
    this.loading = true;
    this.error = undefined;
    this.reviewService.getReviewsByCompanyId(companyId).subscribe({
      next: (data) => {
        this.reviews = data;
        this.loading = false;
        this.currentIndex = 0; // reset slider
      },
      error: (error) => {
        console.error('Error fetching reviews:', error);
        this.error = 'Failed to load reviews';
        this.loading = false;
      }
    });
  }

  fetchTotalReviewsCount(): void {
    this.reviewService.getTotalReviewsCount().subscribe({
      next: (count) => this.totalReviewsCount = count,
      error: (err) => {
        console.error('Error fetching total reviews count:', err);
        this.totalReviewsCount = 0;
      }
    });
  }

  // Slider navigation
  prevReview(): void {
    if (this.reviews.length === 0) return;
    this.currentIndex = (this.currentIndex - 1 + this.reviews.length) % this.reviews.length;
  }

  nextReview(): void {
    if (this.reviews.length === 0) return;
    this.currentIndex = (this.currentIndex + 1) % this.reviews.length;
  }

  getCompanyName(companyId?: number): string {
    if (!companyId) return 'Unknown Company';
    const company = this.companies.find(c => c.id === companyId);
    return company ? company.name : 'Unknown Company';
  }

  getAverageRating(): number {
    if (this.reviews.length === 0) return 0;
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.round((sum / this.reviews.length) * 10) / 10;
  }

  getStarRating(rating?: number): string[] {
    const safeRating = rating ?? 0;
    const stars: string[] = [];
    const fullStars = Math.floor(safeRating);
    const hasHalfStar = safeRating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) stars.push('★');
    if (hasHalfStar) stars.push('☆');
    while (stars.length < 5) stars.push('☆');

    return stars;
  }

  addSampleReview(): void {
    const cid = this.companyId ?? this.companies[0]?.id;
    if (cid === undefined) {
      this.error = 'No company available to add reviews for';
      return;
    }

    const sampleReview: Review = {
      title: 'Great Company to Work For',
      description: 'Excellent work environment and great team collaboration.',
      rating: 4.5,
      companyId: cid
    };

    this.reviewService.createReviewAndNotify(cid, sampleReview).subscribe({
      next: () => {
        // fetchReviews will be triggered automatically via reviewsUpdated$ subscription
      },
      error: (error) => {
        console.error('Error creating sample review:', error);
        this.error = 'Failed to create sample review';
      }
    });
  }
}
