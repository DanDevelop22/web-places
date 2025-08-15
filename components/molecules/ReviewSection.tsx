'use client';

import React, { useState } from 'react';
import { ReviewSectionProps } from '@/types';
import Rating from '@/components/atoms/Rating';
import Button from '@/components/atoms/Button';
import { Star, MessageSquare, Plus } from 'lucide-react';

const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews, placeId, onAddReview }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.comment) {
      onAddReview(placeId, newReview);
      setNewReview({ rating: 5, comment: '' });
      setShowAddForm(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Reseñas ({reviews.length})
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Añadir reseña
        </Button>
      </div>

      {showAddForm && (
        <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Calificación
            </label>
            <Rating
              rating={newReview.rating}
              size="lg"
              className="cursor-pointer"
            />
            <input
              type="range"
              min="1"
              max="5"
              step="0.5"
              value={newReview.rating}
              onChange={(e) => setNewReview({ ...newReview, rating: parseFloat(e.target.value) })}
              className="w-full mt-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Comentario
            </label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          
          <div className="flex gap-2">
            <Button type="submit" variant="primary">
              Enviar reseña
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowAddForm(false)}
            >
              Cancelar
            </Button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            No hay reseñas aún
          </p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Rating rating={review.rating} size="sm" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {review.author}
                  </span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(review.date).toLocaleDateString('es-ES')}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {review.comment}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
