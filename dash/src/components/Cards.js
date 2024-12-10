import React, { useState, useEffect } from 'react';
import data from '../api/info';
import Card from './Card'; 

function Cards() {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        setCards(data.cards || []);
    }, []);

    return (
        <div>
            {cards && cards.length > 0 && cards.map(card => (
                <Card key={card._id} card={card} />
            ))}
        </div>
    );
}

export default Cards;
