import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private baseUrl = 'http://localhost:8083/reviews';
  private reviewsUpdated = new BehaviorSubject<void>(undefined);

  constructor(private http: HttpClient) {}

  // Observable to notify when reviews are updated
  get reviewsUpdated$(): Observable<void> {
    return this.reviewsUpdated.asObservable();
  }

  // Notify subscribers that reviews have been updated
  private notifyReviewsUpdated(): void {
    this.reviewsUpdated.next();
  }

  // Fetch all reviews
  getAllReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/all`);
  }

  getReviewsByCompanyId(companyId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}?companyId=${companyId}`);
  }

  getReviewById(reviewId: number): Observable<Review> {
    return this.http.get<Review>(`${this.baseUrl}/${reviewId}`);
  }

  createReview(companyId: number, review: Review): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}?companyId=${companyId}`, review);
  }

  updateReview(reviewId: number, review: Review): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/${reviewId}`, review);
  }

  deleteReview(reviewId: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${reviewId}`);
  }

  // Fetch total reviews count
  getTotalReviewsCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }

  // Enhanced methods that notify subscribers after operations
  createReviewAndNotify(companyId: number, review: Review): Observable<string> {
    return new Observable(observer => {
      this.createReview(companyId, review).subscribe({
        next: (response) => {
          this.notifyReviewsUpdated();
          observer.next(response);
          observer.complete();
        },
        error: (error) => observer.error(error)
      });
    });
  }

  updateReviewAndNotify(reviewId: number, review: Review): Observable<string> {
    return new Observable(observer => {
      this.updateReview(reviewId, review).subscribe({
        next: (response) => {
          this.notifyReviewsUpdated();
          observer.next(response);
          observer.complete();
        },
        error: (error) => observer.error(error)
      });
    });
  }

  deleteReviewAndNotify(reviewId: number): Observable<string> {
    return new Observable(observer => {
      this.deleteReview(reviewId).subscribe({
        next: (response) => {
          this.notifyReviewsUpdated();
          observer.next(response);
          observer.complete();
        },
        error: (error) => observer.error(error)
      });
    });
  }
}
