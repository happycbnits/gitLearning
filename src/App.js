import React from 'react';
import Expenses from './components/Expenses/Expenses';
import NewExpense from './components/NewExpense/NewExpense';

const App =() => {
  const expenses = [
    {
      date: new Date(2022, 6, 30),
      title: 'car loan',
      amount: 4566

    }, {
      date: new Date(2022, 7, 01),
      title: 'tv loan',
      amount: 454

    }, {
      date: new Date(2022, 5, 04),
      title: 'credit loan',
      amount: 4545

    },
    {
      date: new Date(2032, 1, 2),
      title: 'book loan',
      amount: 5445

    }
  ];
  return (
    <div>
     <NewExpense></NewExpense>
      <Expenses items={expenses}></Expenses>

    </div>
  );
 
}

export default App;
