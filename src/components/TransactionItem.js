import React from 'react';

const TransactionItem = (props) => {
  const { data, currency } = props;
  const price =
    (data.type === 'refund' ? '+' : '-') +
    currency +
    data.value;
  return (
    <>
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
    </>
  );
};

export default TransactionItem;
