import React from 'react';
import TypingCard from '@/components/TypingCard'
const GuestPage = () => {
  const cardContent = `This page can only be accessed by Admin and Editor characters.`
  return (
    <div className="app-container">
      <TypingCard title='Editor page' source={cardContent}/>
    </div>
  );
}

export default GuestPage;