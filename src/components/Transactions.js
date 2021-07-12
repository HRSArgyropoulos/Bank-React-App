import React, { useEffect, useState } from 'react';
import TransactionItem from './TransactionItem';

const Transactions = (props) => {
  const { cardId } = props;
  const [cardTransactions, setCardTransactions] =
    useState([]);
  const [cardCurrency, setCardCurrency] = useState('');

  //fetch transactions
  useEffect(() => {
    const getTransactions = async (id) => {
      const url = `data/transactions${id}.json`;
      console.log(url);
      const res = await fetch(
        `data/transactions${id}.json`
      );
      const transactions = await res.json();
      setCardTransactions(transactions.transactions);
      setCardCurrency(transactions.currency);
    };
    getTransactions(cardId);
    console.log(cardId);
  }, [cardId, cardCurrency]);

  return (
    <ul className="card-transactions">
      {cardTransactions.map((transaction) => (
        <TransactionItem
          cardId={cardId}
          data={transaction}
          currency={cardCurrency}
        />
      ))}
    </ul>
  );
};

export default Transactions;
