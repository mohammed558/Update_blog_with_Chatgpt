// src/components/UpdatePostsButton.js
import React, { useState } from 'react';

function UpdatePostsButton({ onUpdate }) {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdatePosts = async () => {
    try {
      setMessage('');
      setError('');
      setLoading(true);

      const response = await fetch('http://localhost:5000/api/update-posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Unknown error occurred');
      }

      const data = await response.json();
      setMessage(data.message || 'Blog posts updated successfully.');

      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.error('Error updating posts:', error);
      setError(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleUpdatePosts} disabled={loading}>
        {loading ? 'Updating...' : 'Update Blog Posts'}
      </button>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default UpdatePostsButton;
