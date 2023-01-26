import { useState } from 'react';
import './App.css';

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="App">
            <h2>
                Counter: <span className='counter' data-content={count}>{count}</span>
            </h2>
            <div className='actionButtons'>
                <button onClick={() => setCount(prev => ++prev)}>Increment</button>
                <button onClick={() => setCount(0)}>Reset</button>
            </div>
        </div>
    )
}

export default App
