import React from 'react';

const ReceiptTable = (props) => {
  const { receiptData } = props;
  return (
    <table>
      <thead>
        <tr>
          <th colSpan="1">{receiptData.store}</th>
          <td colSpan="6">{receiptData.address}</td>
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
        {receiptData.count &&
          receiptData.items.map((item) => (
            <tr key={item.code}>
              <td>{item.code}</td>
              <td>{item.title}</td>
              <td>{item.quantity}</td>
              <td>
                {receiptData.currency}
                {item.beforeTax}
              </td>
              <td>
                {receiptData.currency}
                {item.discountValue}
                <br />({item.discount}%)
              </td>
              <td>
                {receiptData.currency}
                {item.taxValue}
                <br />({item.taxPercent}%)
              </td>
              <td>
                {receiptData.currency}
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
            {receiptData.currency}
            {receiptData.totalValues}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default ReceiptTable;
