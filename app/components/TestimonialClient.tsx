"use client"
import { useState } from 'react';

export default function TestimonialClient({space}: {space: string}) {
  const [testimonial, setTestimonial] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  if (!space) return <div className='text-white'>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Leave a Testimonial</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="testimonial" className="block text-sm font-medium text-gray-700 mb-2">
              Your Feedback
            </label>
            <textarea
              id="testimonial"
              rows={4}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              value={testimonial}
              onChange={(e) => setTestimonial(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Submit Testimonial
          </button>
        </form>
      </div>
    </div>
  );
}