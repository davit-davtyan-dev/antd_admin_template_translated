import React from 'react';
import TypingCard from '@/components/TypingCard'
const Doc = () => {
  const cardContent = `
    Author blog, please poke here <a href="https://nlrx-wjc.github.io/Blog/" target="_blank">Hard and blood blog</a>。
    Welcome everyone with me, if you feel that your blog is good, you also have trouble to give your blog to a Star.
  `
  return (
    <div className="app-container">
      <TypingCard title='Author blog' source={cardContent}/>
    </div>
  );
}

export default Doc;