import React, { useEffect, useState } from 'react';
import Receipt from './Receipt';

const TransactionItem = (props) => {
  const { data, currency, cardId } = props;

  const price =
    (data.type === 'refund' ? '+' : '-') +
    currency +
    data.value;

  const [showReceipt, setShowReceipt] = useState({
    transactionId: '',
    show: false,
  });

  // on card change set all show to false
  useEffect(() => {
    setShowReceipt({ show: false });
  }, [cardId]);

  return (
    <>
      <li
        className="transaction"
        key={data.id}
        onClick={() =>
          setShowReceipt({
            transactionId: data.id,
            show: !showReceipt.show,
          })
        }>
        <img
          src={`images/companies/${data.description.replace(
            ' ',
            '-'
          )}.png`}
          alt={data.description}
        />
        <span className="description">
          {data.description}
        </span>
        <small className="date">{data.time}</small>
        <span className="price">{price}</span>
      </li>
      {showReceipt.show &&
        data.id === showReceipt.transactionId && (
          <Receipt transactionId={data.id} />
        )}
    </>
  );
};

export default TransactionItem;
