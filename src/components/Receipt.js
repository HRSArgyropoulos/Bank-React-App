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
  const { transactionId } = props;
  const [receipt, setReceipt] = useState({});

  useEffect(() => {
    //fetch receipt based on transaction id
    getReceipt(transactionId)
      .then((res) => res.json())
      .then((data) => {
        // calculate discount and tax for each item and save to state
        const calculatedData = [];
        // calculate total value and new receipt item data based on calculations
        const totalValues = data.items.reduce(
          (acc, item) => {
            // do calculations for current item
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

            // preserve data key values and add calculation values to it
            // push to new array which will be our receipt state later on
            calculatedData.push({
              ...item,
              discountValue,
              taxValue,
              taxPercent,
              totalValue,
            });

            // add item total value to the accumulator
            return acc + totalValue;
          },
          0
        );

        // preserve other fetched object data but overwrite items object
        // with the new array of calculated object values
        setReceipt({
          ...data,
          items: calculatedData,
          totalValues,
        });
      });
  }, [transactionId]);

  return (
    <li className="receipt">
      <img
        src={`images/companies/header-img/${receipt.store}.png`}
        alt={`${receipt.store} Store`}
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
            receipt.items.map((item) => (
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
                  {item.discountValue}
                  <br />({item.discount}%)
                </td>
                <td>
                  {receipt.currency}
                  {item.taxValue}
                  <br />({item.taxPercent}%)
                </td>
                <td>
                  {receipt.currency}
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
