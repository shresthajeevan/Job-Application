//package com.example.firstjobapp.review.impl;
//
//import com.example.firstjobapp.company.CompanyService;
//import com.example.firstjobapp.review.Review;
//import com.example.firstjobapp.review.ReviewRepository;
//import com.example.firstjobapp.review.ReviewService;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class ReviewServiceImpl implements ReviewService {
//
//    private final ReviewRepository reviewRepository;
//    private final CompanyService companyService;
//
//    public ReviewServiceImpl(ReviewRepository reviewRepository, CompanyService companyService) {
//        this.reviewRepository = reviewRepository;
//        this.companyService = companyService;
//    }
//
//    @Override
//    public List<Review> getAllReviews(Long companyId) {
//        return reviewRepository.findByCompanyId(companyId);
//    }
//
//    @Override
//    public boolean addReview(Long companyId, Review review) {
//        return companyService.getCompanyById(companyId)
//                .map(company -> {
//                    review.setCompany(company);
//                    reviewRepository.save(review);
//                    return true;
//                })
//                .orElse(false);
//    }
//
//    @Override
//    public Review getReview(Long companyId, Long reviewId) {
//        List <Review> reviews = reviewRepository.findByCompanyId(companyId);
//        return reviews.stream().filter(review -> review.getId().equals(reviewId)).findFirst().orElse(null);
//    }
//
//}
//
//@Override
//public boolean updateReview(Long companyId, Long reviewId, Review updatedReview) {
//    if(companyService.getCompanyById(companyId) != null){
//        updatedReview.setCompany(companyService.getCompanyById(companyId));
//        updatedReview.setId(reviewId);
//        reviewRepository.save(updatedReview);
//        return true;
//    } else{
//        return false;
//    }
//
//}
//
//}
//

package com.example.firstjobapp.review.impl;

import com.example.firstjobapp.company.Company;
import com.example.firstjobapp.company.CompanyService;
import com.example.firstjobapp.review.Review;
import com.example.firstjobapp.review.ReviewRepository;
import com.example.firstjobapp.review.ReviewService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final CompanyService companyService;

    public ReviewServiceImpl(ReviewRepository reviewRepository, CompanyService companyService) {
        this.reviewRepository = reviewRepository;
        this.companyService = companyService;
    }

    @Override
    public List<Review> getAllReviews(Long companyId) {
        return reviewRepository.findByCompanyId(companyId);
    }

    @Override
    public boolean addReview(Long companyId, Review review) {
        return companyService.getCompanyById(companyId)
                .map(company -> {
                    review.setCompany(company);
                    reviewRepository.save(review);
                    return true;
                })
                .orElse(false);
    }

    @Override
    public Review getReview(Long companyId, Long reviewId) {
        return reviewRepository.findByCompanyId(companyId)
                .stream()
                .filter(review -> review.getId().equals(reviewId))
                .findFirst()
                .orElse(null);
    }

    @Override
    public boolean updateReview(Long companyId, Long reviewId, Review updatedReview) {
        return companyService.getCompanyById(companyId)
                .map(company -> {
                    updatedReview.setCompany(company);
                    updatedReview.setId(reviewId);
                    reviewRepository.save(updatedReview);
                    return true;
                })
                .orElse(false);
    }

    @Override
    public boolean deleteReview(Long companyId, Long reviewId) {
        return companyService.getCompanyById(companyId)
                .map(company -> {
                    if (reviewRepository.existsById(reviewId)) {
                        reviewRepository.deleteById(reviewId);
                        return true;
                    }
                    return false;
                })
                .orElse(false);
    }

}

