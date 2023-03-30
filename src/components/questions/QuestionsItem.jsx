import React, { useState } from 'react';
import questionsClose from '../../assets/questionsClose.png';
import questionsOpen from '../../assets/questionsOpen.png'

const QuestionsItem = ({ title, content }) => {
    const [isActive, setIsActive] = useState(false);

    return (
      <div className="questions-item" key={title}>
            <div className="questions-title" onClick={() => setIsActive(!isActive)}>
                <div className="questions-title__width">{title}</div>
                <img className="questions-arrow" src={isActive ? questionsClose : questionsOpen} alt="close" />
            </div>
            {isActive && <div className="questions-content">{content}</div>}
        </div>
    );
};

export default QuestionsItem;