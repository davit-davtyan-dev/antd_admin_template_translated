import React from "react";
import TypingCard from "@/components/TypingCard";
import wechat from "@/assets/images/wechat.jpg";
import reward from "@/assets/images/reward.jpg";
const About = () => {
  const cardContent = `
    <p>Hello everyone, I am hard to cool.</p>
    <p>At the end of the South Mountain, a farmer, the teacher from the director Wang Zhongyang, loves to code, advocating the open source spirit, and is happy to share.</p>
    <p>In 2005, it was served in the Southeastern Woods of the People's Liberation Army, served as a sniper.</p>
    <p>In 2008, he was invited by Russia Alpha, and taught his team members to teach his team members to learn the theory of socialism with Chinese characteristics and Mao Zedong Thought.</p>
    <p>In 2011, the president of the United States was asked, and the heart was shining, and all the honors were put down, and they were in the mountains.</p>
    <p>In 2015, he was entrusted by the director Wang Zhongyang to develop incense management system for the Taoism.</p>
    <p>I like to toss and engage in machine, pursue fresh technology.</p>
    <p>Below is my WeChat, welcome to the trees (TREE) wind (BEE)!!!</p>
    <p>If you think this project is a little help, welcome to appreciate.</p>
    <p>Your appreciation is the power I have continuously moved!</p>
    <p>PS: Recently, many friends add me WeChat asked me some problems. As a result, I didn't give me some star, I was so sweet ~~~</p>
    <p>Ask the big people to point STAR, thank you ~~</p>
    <img src="${wechat}" alt="wechat" style="height:550px"/>
    <img src="${reward}" alt="reward" style="height:550px"/>
  `;
  return (
    <div className="app-container">
      <TypingCard title="About author" source={cardContent} />
    </div>
  );
};

export default About;
