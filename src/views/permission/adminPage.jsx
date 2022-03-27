import React from 'react';
import TypingCard from '@/components/TypingCard'
const AdminPage = () => {
  const cardContent = `This page can only be accessed, Guest and Editor characters cannot be visited.`
  return (
    <div className="app-container">
      <TypingCard title='Admin page' source={cardContent}/>
    </div>
  );
}

export default AdminPage;