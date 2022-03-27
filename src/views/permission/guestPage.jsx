import React from 'react';
import TypingCard from '@/components/TypingCard'
const GuestPage = () => {
  const cardContent = `This page can only be accessed by admin and guest characters, and the Editor role can't see`
  return (
    <div className="app-container">
      <TypingCard title='Guest page' source={cardContent}/>
    </div>
  );
}

export default GuestPage;