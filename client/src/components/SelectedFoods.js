import React from 'react';

// TODO: note no class/base here
export default function SelectedFoods(props) {
  const { foods } = props;

  const foodRows = foods.map((food, idx) => (
    <tr
      key={idx}
      onClick={() => props.onFoodClick(idx)}
    >
      <td className="left-align hand-select">{food.name}</td>
      <td className='right-align'>{food.unit}</td>
      <td className='right-align'>{food.amount}</td>
      <td className='right-align'>{food.cost.toFixed(2)}</td>
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>
          <th colSpan='5'>
            <h3>Selected foods</h3>
          </th>
        </tr>
        <tr>
          <th className="left-align">Description</th>
          <th className="right-align">Units</th>
          <th className="right-align">Amount</th>
          <th className="right-align">Cost</th>
        </tr>
      </thead>
      <tbody>
        {foodRows}
      </tbody>
      <tfoot>
        <tr>
          <th>Total</th>
          <th></th><th></th>
          <th
            className='right-align'
            id='total-kcal'
          >
            {sum(foods, 'cost')}
          </th>
        </tr>
      </tfoot>
    </table>
  );
}

function sum(foods, prop) {
  return foods.reduce((curval, food) => (
    parseFloat(food[prop], 10) + curval
  ), 0.0).toFixed(2);
}
