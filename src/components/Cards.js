import React, { useState, useEffect } from 'react';
import Card from './Card';

const Cards = () => {
  const [cardsInfo, setCardsInfo] = useState([]);

  useEffect(() => {
    // get info from json and update cards state
    const getCardsInfo = async () => {
      const res = await fetch(
        'data/cardsDetails.json'
      );
      const cardsFetchInfo = await res.json();
      setCardsInfo(cardsFetchInfo);
    };
    getCardsInfo();
  }, []);
  return (
    <ul className="cards">
      {cardsInfo.length
        ? cardsInfo.map((cardInfo) => (
            <Card
              key={cardInfo.index}
              data={cardInfo}
            />
          ))
        : 'Loading'}
    </ul>
  );
};

export default Cards;
