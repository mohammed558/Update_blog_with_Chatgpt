import React, { useState } from 'react';
import UpdatePostsButton from './components/UpdatePostsButton';
import BlogPostsList from './components/BlogPostsList';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((oldKey) => oldKey + 1); // Trigger re-render of BlogPostsList
  };

  return (
    <div className="App">
      <h1>My Blog Admin Panel</h1>
      <UpdatePostsButton onUpdate={handleRefresh} />
      <BlogPostsList key={refreshKey} />
    </div>
  );
}

export default App;
