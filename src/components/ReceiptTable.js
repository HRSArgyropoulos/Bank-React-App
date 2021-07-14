import React from 'react';

const ReceiptTable = (props) => {
  const {
    store,
    address,
    items,
    count,
    currency,
    totalValues,
  } = props.receiptData;
  return (
    <table>
      <thead>
        <tr>
          <th colSpan="1">{store}</th>
          <td colSpan="6">{address}</td>
        </tr>
        <tr>
          <th>Code</th>
          <th>Title</th>
          <th>Quantity</th>
          <th>Value (before tax)*</th>
          <th>Discount*</th>
          <th>Tax*</th>
          <th>Total Value</th>
        </tr>
      </thead>
      <tbody>
        {count &&
          items.map((item) => (
            <tr key={item.code}>
              <td>{item.code}</td>
              <td>{item.title}</td>
              <td>{item.quantity}</td>
              <td>
                {currency}
                {item.beforeTax}
              </td>
              <td>
                {currency}
                {item.discountValue}
                <br />({item.discount}%)
              </td>
              <td>
                {currency}
                {item.taxValue}
                <br />({item.taxPercent}%)
              </td>
              <td>
                {currency}
                {item.totalValue}
              </td>
            </tr>
          ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="2">
            <small>* values per 1 item</small>
          </td>
          <th
            colSpan="4"
            style={{ textAlign: 'right' }}>
            Total:
          </th>
          <td>
            {currency}
            {totalValues}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default ReceiptTable;
