import React, { useState, useEffect } from 'react';
import Card from './Card';

const Cards = () => {
  const [cardsInfo, setCardsInfo] = useState([]);
  const [selectedCard, setSelectedCard] = useState(0);

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

  useEffect(() => {
    console.log('render');
  }, [selectedCard]);

  return (
    <div className="cards">
      <ul>
        {cardsInfo.length
          ? cardsInfo.map((cardInfo, index) => (
              <li
                className={
                  'card ' +
                  (index === selectedCard &&
                    'selected')
                }
                key={index}
                onClick={() => {
                  console.log(index);
                  setSelectedCard(index);
                }}>
                <Card data={cardInfo} />
              </li>
            ))
          : 'Loading'}
      </ul>
    </div>
  );
};

export default Cards;
