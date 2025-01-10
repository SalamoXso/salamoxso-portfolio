'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Simulate an API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          const shouldError = Math.random() > 0.8; // Simulate a 20% chance of error
          if (shouldError) {
            reject(new Error('Something went wrong. Please try again later.'));
          } else {
            resolve('Success');
          }
        }, 1000);
      });

      setSubmitMessage('Thank you for your message. I\'ll get back to you soon!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto space-y-8 p-4"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Contact Me</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <motion.div variants={fadeInUp}>
          <label htmlFor="name" className="block mb-2 text-gray-700 dark:text-gray-300">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            aria-label="Your name"
          />
        </motion.div>

        {/* Email Field */}
        <motion.div variants={fadeInUp}>
          <label htmlFor="email" className="block mb-2 text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            aria-label="Your email"
          />
        </motion.div>

        {/* Message Field */}
        <motion.div variants={fadeInUp}>
          <label htmlFor="message" className="block mb-2 text-gray-700 dark:text-gray-300">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            aria-label="Your message"
          />
        </motion.div>

        {/* Submit Button */}
        <motion.div variants={fadeInUp}>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
            aria-label="Submit form"
          >
            {isSubmitting ? 'Submitting...' : 'Send Message'}
          </button>
        </motion.div>
      </form>

      {/* Success Message */}
      {submitMessage && (
        <motion.div
          className="mt-4 p-4 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-100 rounded-md"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          {submitMessage}
        </motion.div>
      )}

      {/* Error Message */}
      {submitError && (
        <motion.div
          className="mt-4 p-4 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-100 rounded-md"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          {submitError}
        </motion.div>
      )}
    </motion.div>
  );
}