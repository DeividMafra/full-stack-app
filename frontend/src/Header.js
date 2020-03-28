import React, { useState } from 'react';

export default function Header(props) {
  const [counter, setCounter] = useState(0);
  function increment() {
    setCounter(counter + 1);
  }
  return (
    <div>
      <header>
        <h1>{props.title} - {props.myTest} - Increment: {counter}</h1>
      </header>
      <button onClick={increment}>Increment</button>
    </div>
  );
}