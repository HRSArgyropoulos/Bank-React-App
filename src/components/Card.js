import React from 'react';

const Card = (props) => {
  console.log(props);
  const card = props.data;
  return (
    <li className="card">
      <img
        src={`./images/cards/${card.provider.toLowerCase()}.png`}
        alt={card.provider}
      />
      <span>{card.bank}</span>
      <span>{card['card-number']}</span>
    </li>
  );
};

export default Card;
