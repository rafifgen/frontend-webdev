'use client';

import { useState, useEffect } from 'react';
import { apiClient, Testimonial, CreateTestimonialRequest, UpdateTestimonialRequest } from '../../lib/api';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';

interface TestimonialFormProps {
  testimonial: Testimonial | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function TestimonialForm({ testimonial, onClose, onSuccess }: TestimonialFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    content: '',
    rating: 5,
    isActive: true,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (testimonial) {
      setFormData({
        name: testimonial.name,
        position: testimonial.position,
        content: testimonial.content,
        rating: testimonial.rating,
        isActive: testimonial.isActive,
      });
    }
  }, [testimonial]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    // @ts-ignore
    const inputValue = isCheckbox ? e.target.checked : value;
    setFormData(prev => ({ ...prev, [name]: inputValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (testimonial) {
        // Update existing testimonial
        const updateData: UpdateTestimonialRequest = { ...formData };
        await apiClient.updateTestimonial(testimonial.id, updateData);
        toast.success('Testimonial updated successfully.');
      } else {
        // Create new testimonial
        const createData: CreateTestimonialRequest = { ...formData };
        await apiClient.createTestimonial(createData);
        toast.success('Testimonial created successfully.');
      }
      onSuccess();
    } catch (error) {
      toast.error('An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6">{testimonial ? 'Edit Testimonial' : 'Create Testimonial'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>
          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700">Position</label>
            <input
              type="text"
              name="position"
              id="position"
              value={formData.position}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              name="content"
              id="content"
              value={formData.content}
              onChange={handleInputChange}
              rows={4}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating (1-5)</label>
            <input
              type="number"
              name="rating"
              id="rating"
              value={formData.rating}
              onChange={handleInputChange}
              min="1"
              max="5"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="isActive"
              id="isActive"
              checked={formData.isActive}
              onChange={handleInputChange}
              className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">Active</label>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 disabled:bg-primary-400"
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
