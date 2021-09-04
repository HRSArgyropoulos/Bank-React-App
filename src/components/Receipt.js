import React, { useState, useEffect } from 'react';
import {
  taxCalculation,
  discountCalculation,
} from '../helpers/calculations';
import getReceipt from '../services/getReceipt';
import ReceiptTable from './ReceiptTable';

// the Tax and Discount calculation for the total price
// should take place in the server but for the purpose
// of this project we will do it in the front-end

const Receipt = (props) => {
  const { transactionId } = props;
  const [receipt, setReceipt] = useState({});
  const [fetchStatus, setFetchStatus] = useState('pending');

  useEffect(() => {
    //fetch receipt based on transaction id
    getReceipt(transactionId)
      .then((res) => res.json())
      .then((data) => {
        // calculate discount and tax for each item and save to state
        const calculatedData = [];
        // calculate total value and new receipt item data based on calculations
        const totalValues = data.items.reduce((acc, item) => {
          // do calculations for current item
          const { discountValue } = discountCalculation(
            item.beforeTax,
            item.discount
          );
          const { taxValue, taxPercent } = taxCalculation(
            item.beforeTax,
            item.taxCategory
          );
          const totalValue =
            item.quantity *
            (item.beforeTax - discountValue + taxValue);

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
        }, 0);

        // preserve other fetched object data but overwrite items object
        // with the new array of calculated object values
        setReceipt({
          ...data,
          items: calculatedData,
          totalValues,
        });
        setFetchStatus('success');
      })
      .catch((err) => setFetchStatus('reject'));
  }, [transactionId]);

  return (
    <li className="receipt">
      {fetchStatus === 'pending' ? (
        'Loading'
      ) : fetchStatus === 'success' ? (
        <>
          <img
            src={`images/companies/header-img/${receipt.store}.png`}
            alt={`${receipt.store} Store`}
          />
          <ReceiptTable receiptData={receipt} />
        </>
      ) : (
        'Could not load the receipt'
      )}
    </li>
  );
};

export default Receipt;
