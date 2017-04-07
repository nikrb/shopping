import React from 'react';

// TODO: note no class/base here
export default function SelectedFoods(props) {
  const { foods } = props;

  const foodRows = foods.map((food, idx) => (
    <tr
      key={idx}
      onClick={() => props.onFoodClick(idx)}
    >
      <td className="left-align hand-select">{food.Shrt_Desc}</td>
      <td className='right-align'>{food.Energ_Kcal}</td>
      <td className='right-align'>{food['Protein_(g)']}</td>
      <td className='right-align'>{food['FA_Sat_(g)']}</td>
      <td className='right-align'>{food['Carbohydrt_(g)']}</td>
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
          <th className="right-align">Kcal</th>
          <th className="right-align">Protein (g)</th>
          <th className="right-align">Fat (g)</th>
          <th className="right-align">Carbs (g)</th>
        </tr>
      </thead>
      <tbody>
        {foodRows}
      </tbody>
      <tfoot>
        <tr>
          <th>Total</th>
          <th
            className='right-align'
            id='total-kcal'
          >
            {sum(foods, 'Energ_Kcal')}
          </th>
          <th
            className='right-align'
            id='total-protein_g'
          >
            {sum(foods, 'Protein_(g)')}
          </th>
          <th
            className='right-align'
            id='total-fat_g'
          >
            {sum(foods, 'FA_Sat_(g)')}
          </th>
          <th
            className='right-align'
            id='total-carbohydrate_g'
          >
            {sum(foods, 'Carbohydrt_(g)')}
          </th>
        </tr>
      </tfoot>
    </table>
  );
}

function sum(foods, prop) {
  return foods.reduce((memo, food) => (
    parseInt(food[prop], 10) + memo
  ), 0.0).toFixed(2);
}
