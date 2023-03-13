import React from 'react';
import QuestionsItem from './QuestionsItem';
import './questions.scss'

const QuestionsContent = () => {
    const questionData = [
        {
            title: 'Что такое подарок-впечатление?',
            content: `Это сертификат, упакованный в дизайнерский конверт, дающий право на получение услуги.`
        },
        {
            title: 'Могу ли я поменять сертификат на другой?',
            content: `До момента активации сертификата Вы можете поменять сертификат на более дорогой с доплатой.`
        },
        {
            title: 'Сколько дейтвует сертификат?',
            content: `Срок действия сертификата - 12 месяцев с момента покупки.`
        },
        {
            title: 'Могу ли я купить сертификат в подарок?',
            content: `Сертификаты не привязаны к личности, Вы можете купить сертификат в подарок.`
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
                    <QuestionsItem title={title} content={content} key={title} />
                ))}
            </div>
        </div>
    );
};

export default QuestionsContent;