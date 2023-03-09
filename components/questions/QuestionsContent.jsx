import React from 'react';
import QuestionsItem from './QuestionsItem';
import './questions.scss'

const QuestionsContent = () => {
    const questionData = [
        {
            title: 'Что такое подарок-впечатление?',
            content: `Это сертификат, упакованный в стильную коробочку и дающий право на получение услуги.`
        },
        {
            title: 'Могу ли я поменять сертификат на другой?',
            content: `Чо покайфу то и делайте`
        },
        {
            title: 'Сколько дейтвует сертификат?',
            content: `Срок действия сертификата - 500 дней`
        },
        {
            title: 'Могу ли я купить сертификат в подарок?',
            content: `Чо покайфу то и делайте`
        },
        {
            title: 'Могу ли я воспользоваться услугой, не входящей в мой подарок?',
            content: `Вы можете воспользоваться только той услугой, которая входит в подарок и описана в буклете.`
        },
    ];

    return (
        <div className="questions container">
            <h1 className="questions-header">Часто задаваемые вопросы</h1>
            <div className="accordion ">
                {questionData.map(({ title, content }) => (
                    <QuestionsItem title={title} content={content} key={title}/>
                ))}
            </div>
        </div>
    );
};

export default QuestionsContent;