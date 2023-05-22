import express from 'express';
import * as reviewController from '../controllers/reviewController';
import { isAccessTokenValid } from '../middlewares';

export const reviewRoute = express();

// 리뷰 등록
reviewRoute.post('/', isAccessTokenValid, reviewController.addReviewHandler);

// 리뷰 상세 조회
reviewRoute.get('/:review_id',isAccessTokenValid,  reviewController.getReviewHandler);

// 장소별 리뷰 전체 조회
reviewRoute.get('/',isAccessTokenValid,  reviewController.getAllReviewsHandler);

// 리뷰 수정
reviewRoute.post('/:review_id', isAccessTokenValid, reviewController.updateReviewHandler);

// 리뷰 삭제
reviewRoute.delete('/:review_id',isAccessTokenValid,  reviewController.deleteReviewHandler);
