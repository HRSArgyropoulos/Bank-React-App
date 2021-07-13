import React, { useState, useEffect } from 'react';
import {
  taxCalculation,
  discountCalculation,
} from '../helpers/calculations';
import { getReceipt } from '../services/getReceipt';

// the Tax and Discount calculation for the total price
// should take place in the server but for the purpose
// of this project we will do it in the front-end

const Receipt = (props) => {
  const { transactionId, storeName } = props;
  const [receipt, setReceipt] = useState({});
  // save discount and tax values after calculation for each item
  const [itemValues, setItemValues] = useState([{}]);

  useEffect(() => {
    //fetch receipt based on transaction id
    getReceipt(transactionId)
      .then((res) => res.json())
      .then((data) => {
        let totalValues = 0;
        // calculate discount and tax for each item and save state
        for (const item of data.receipt.items) {
          const { discountValue } =
            discountCalculation(
              item.beforeTax,
              item.discount
            );
          const { taxValue, taxPercent } =
            taxCalculation(
              item.beforeTax,
              item.taxCategory
            );
          const totalValue =
            item.quantity *
            (item.beforeTax -
              discountValue +
              taxValue);
          setItemValues([
            ...itemValues,
            {
              discountValue,
              taxValue,
              taxPercent,
              totalValue,
            },
          ]);
          // update total price of all items
          totalValues += totalValue;
        }
        setReceipt({ totalValues, ...data });
      });
  }, [transactionId]);

  return (
    <li className="receipt">
      <img
        src={`images/companies/header-img/${receipt.store}.png`}
        alt={`${storeName} Store`}
      />
      <table>
        <thead>
          <tr>
            <th colSpan="1">{receipt.store}</th>
            <td colSpan="6">{receipt.address}</td>
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
          {receipt.count &&
            receipt.receipt.items.map(
              (item, index) => (
                <tr key={item.code}>
                  <td>{item.code}</td>
                  <td>{item.title}</td>
                  <td>{item.quantity}</td>
                  <td>
                    {receipt.currency}
                    {item.beforeTax}
                  </td>
                  <td>
                    {receipt.currency}
                    {itemValues[index].discountValue}
                    <br />({item.discount}%)
                  </td>
                  <td>
                    {receipt.currency}
                    {itemValues[index].taxValue}
                    <br />(
                    {itemValues[index].taxPercent}%)
                  </td>
                  <td>
                    {receipt.currency}
                    {itemValues[index].totalValue}
                  </td>
                </tr>
              )
            )}
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
              {receipt.currency}
              {receipt.totalValues}
            </td>
          </tr>
        </tfoot>
      </table>
    </li>
  );
};

export default Receipt;
