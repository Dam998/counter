import { useRef, useState } from 'react';
import './App.css';

interface IChuckFact {
    created_at: string;
    icon_url: string;
    id: string;
    url: string;
    value: string;
}

function App() {
    const [count, setCount] = useState(0);
    const [chuckFact, setChuckFact] = useState<IChuckFact>();
    const abortControllerRef = useRef<AbortController>();

    const increment = () => {
        setCount(prev => ++prev);

        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();

        fetch("https://api.chucknorris.io/jokes/random", { signal: abortControllerRef.current.signal })
            .then(response => response.ok ? response.json() : Promise.reject())
            .then((data: IChuckFact) => setChuckFact(data))
            .catch(error => {
                if (error?.name === "AbortError") {
                    alert("Too many requests even for Chuck Norris 😔")
                }
                console.error(error)
            });
    }

    const reset = () => {
        setCount(0);
        setChuckFact(undefined);
    }

    return (
        <div className="App">
            <h2>
                Counter: <span className='counter' data-content={count}>{count}</span>
            </h2>
            <div className='actionButtons'>
                <button onClick={increment}>Increment</button>
                <button onClick={reset}>Reset</button>
            </div>
            {
                chuckFact &&
                <div className='chuckFacts'>
                    <p>{chuckFact.value}</p>
                    <a target="_blank" href={chuckFact.url}>View More</a>
                </div>
            }
        </div>
    )
}

export default App
