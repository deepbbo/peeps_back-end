import express, { Request, Response, NextFunction } from 'express';
import { Review } from '../database/models/review.entity';
import { createReviewInput, updateReviewInput } from '../database/models';
import * as reveiwRepo from '../database/daos/review.repo';
import { deleteReviewHandler, getReviewHandler } from '../controllers';

// 리뷰 등록
export const addReview = async (inputData: createReviewInput) => {
  try {
    const createdReview = await reveiwRepo.createReview(inputData);

    const newreview = await reveiwRepo.findReviewById(createdReview.review_id);
    if (!newreview) throw new Error('[ 게시글 등록 에러 ] 등록된 게시글이 없습니다.');

    return newreview;
  } catch (error: any) {
    //if (error instanceof AppError) throw error;
    // else {
    console.log(error);
    // throw new AppError(500, error.message || null);
    // }
  }
};

// review_id 특정 리뷰 조회
export const getReview = async (review_id: number): Promise<Review> => {
  try {
    const review = await reveiwRepo.findReviewById(review_id);

    if (review === undefined) throw new Error('[ 리뷰 조회 에러 ] 리뷰가 존재하지 않습니다.');

    return review;
  } catch (error: any) {
    console.log(error);
    throw new Error('리뷰 조회에 실패했습니다.'); // Todo: if..else 문으로 변경하기
    // if (error instanceof AppError) throw error;
    // else throw new AppError(404, error.message);
  }
};

// location_id에 따른 전체 리뷰 조회
export const getALlReview = async (location_id: string): Promise<Review[]> => {
  try {
    const reviews = await reveiwRepo.findReviewByLocation(location_id);

    if (reviews === undefined) throw new Error('[ 리뷰 조회 에러 ] 리뷰가 존재하지 않습니다.');

    return reviews;
  } catch (error: any) {
    console.log(error);
    throw new Error('리뷰 조회에 실패했습니다.'); // Todo: if..else 문으로 변경하기
    // if (error instanceof AppError) throw error;
    // else throw new AppError(404, error.message);
  }
};

// 리뷰 수정
export const updateReview = async (
  review_id: number,
  updateData: updateReviewInput
): Promise<Review> => {
  try {
    const review = await reveiwRepo.findReviewById(review_id);

    if (review === undefined) throw new Error('[ 리뷰 수정 에러 ] 리뷰가 존재하지 않습니다.');

    const updateReview = await reveiwRepo.updateReview(review_id, updateData);
    return updateReview;
  } catch (error: any) {
    console.log(error);
    throw new Error('리뷰 수정에 실패했습니다.'); // Todo: if..else 문으로 변경하기
    // if (error instanceof AppError) throw error;
    // else throw new AppError(404, error.message);
  }
};

// 리뷰 삭제
export const deleteReview = async (review_id: number): Promise<Review> => {
  try {
    const review = await reveiwRepo.findReviewById(review_id);

    if (review === undefined) throw new Error('[ 리뷰 삭제 에러 ] 리뷰가 존재하지 않습니다.');

    const updateReview = await reveiwRepo.deleteReview(review_id);
    return updateReview;
  } catch (error: any) {
    console.log(error);
    throw new Error('리뷰 삭제에 실패했습니다.'); // Todo: if..else 문으로 변경하기
    // if (error instanceof AppError) throw error;
    // else throw new AppError(404, error.message);
  }
};