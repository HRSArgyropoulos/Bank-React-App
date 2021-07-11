import React, { useState, useEffect } from 'react';
import Card from './Card';
import Transactions from './Transactions';

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
      // set selected card after fetch 'default' to be the middle one of all cards
      setSelectedCard(
        cardsFetchInfo[
          parseInt(cardsFetchInfo.length / 2)
        ]['card-number']
      );
    };
    getCardsInfo();
  }, []);

  useEffect(() => {
    console.log('render');
  }, [selectedCard]);

  return (
    <>
      <div className="cards">
        <ul>
          {cardsInfo.length
            ? cardsInfo.map((cardInfo, index) => (
                <li
                  className={
                    'card ' +
                    (cardInfo['card-number'] ===
                      selectedCard && 'selected')
                  }
                  key={index}
                  onClick={() => {
                    console.log(
                      cardInfo['card-number']
                    );
                    setSelectedCard(
                      cardInfo['card-number']
                    );
                  }}>
                  <Card data={cardInfo} />
                </li>
              ))
            : 'Loading'}
        </ul>
      </div>
      <Transactions cardId={selectedCard} />
    </>
  );
};

export default Cards;
