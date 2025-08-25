package com.jeevan.reviewms.review;

import java.util.List;

public interface ReviewService {

    // Get all reviews for a given company
    List<Review> getAllReviews(Long companyId);

    // Add a review to a specific company
    boolean addReview(Long companyId, Review review);

    // Get a single review by its ID
    Review getReview(Long reviewId);

    // Update a review by its ID
    boolean updateReview(Long reviewId, Review review);

    // Delete a review by its ID
    boolean deleteReview(Long reviewId);
}
