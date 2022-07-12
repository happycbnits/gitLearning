import React from 'react';
import Expenses from './components/Expenses/Expenses';
import NewExpense from './components/NewExpense/NewExpense';

const App =() => {
  const expenses = [
    {
      date: new Date(2022, 6, 28),
      title: 'car loan',
      amount: 200

    }, {
      date: new Date(2022, 7, 12),
      title: 'tv loan',
      amount: 300

    }, {
      date: new Date(2022, 5, 2),
      title: 'credit loan',
      amount: 300

    },
    {
      date: new Date(2032, 1, 2),
      title: 'book loan',
      amount: 450

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
