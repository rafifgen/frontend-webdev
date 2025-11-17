'use client';

import { useEffect, useState } from 'react';
import { apiClient, Testimonial } from '../../../lib/api';
import toast from 'react-hot-toast';
import TestimonialsTable from '../../../components/admin/TestimonialsTable';
import TestimonialForm from '../../../components/admin/TestimonialForm';
import withAdminAuth from '../../../components/withAdminAuth';

function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.getTestimonials(1, 100); // Fetching up to 100 testimonials
      setTestimonials(response.data);
    } catch (error) {
      toast.error('Failed to fetch testimonials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingTestimonial(null);
    setIsFormOpen(true);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await apiClient.deleteTestimonial(id);
        toast.success('Testimonial deleted successfully.');
        fetchTestimonials();
      } catch (error) {
        toast.error('Failed to delete testimonial.');
      }
    }
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    fetchTestimonials();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Testimonials Management</h1>
        <button
          onClick={handleCreate}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Create New
        </button>
      </div>

      <TestimonialsTable
        testimonials={testimonials}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isFormOpen && (
        <TestimonialForm
          testimonial={editingTestimonial}
          onClose={() => setIsFormOpen(false)}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}

export default withAdminAuth(TestimonialsPage);
