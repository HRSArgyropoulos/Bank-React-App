import React from 'react';

const Card = (props) => {
  console.log(props);
  const card = props.data;
  return (
    <>
      <img
        src={`./images/cards/${card.provider.toLowerCase()}.png`}
        alt={card.provider}
      />
      <span>{card.bank}</span>
      <span>{card['card-number']}</span>
    </>
  );
};

export default Card;
