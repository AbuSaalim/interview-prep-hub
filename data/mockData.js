export const mockData = {
  // Tera pehla topic (useEffect)
  "use-effect": {
    breadcrumb: "React Hooks > useEffect",
    title: "useEffect & React Lifecycle",
    definition: "React Lifecycle represents the different stages a component goes through from creation to removal. It has 3 main phases: Mounting, Updating, and Unmounting.",
    whyWeUse: "We use it to manage the lifecycle for better website performance, allowing us to handle side effects (like data fetching or timers) without memory leaks.",
    keyPoints: [
      "useEffect runs AFTER the rendering.",
      "Mounting Phase: We use an empty array `[]`. It runs one time only after the initial render.",
      "Updating Phase: We use a dependency array like `[stateName]`. The effect runs whenever that specific value changes.",
      "Unmounting Phase: We use a `return () => {}` inside the effect. This cleanup function auto-clears after the render (very useful for looping tasks or intervals)."
    ],
    codeExample: `import React, { useEffect, useState } from "react";

const Count = () => {
  const [count, setCount] = useState(0);

  // 1. Runs ONCE after render (Mounting)
  useEffect(() => {
    console.log("Component Mounted!");
    return () => console.log("Unmounting/Cleanup");
  }, []); 

  // 2. Runs when dependency changes (Updating)
  useEffect(() => {
    console.log("Count updated to: " + count);
  }, [count]); 

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
};

export default Count;`,
    output: "A counter button. The console logs 'Component Mounted!' once. Then, every time you click '+', it logs 'Count updated to: [number]'."
  },

  // Naya Topic: useState
  "use-state": {
    breadcrumb: "React Hooks > useState",
    title: "useState Hook",
    definition: "useState is a React Hook that allows you to add state variables to functional components. State represents data that changes over time and triggers a re-render when updated.",
    whyWeUse: "We use it to make our components dynamic and interactive. Without state, components would be static and couldn't react to user inputs, API responses, or click events.",
    keyPoints: [
      "It returns an array with two values: the current state and a function to update it.",
      "State updates are asynchronous in React.",
      "Never mutate the state directly (e.g., state = 'new value'). Always use the setter function.",
      "The initial value passed to useState is only used during the first render."
    ],
    codeExample: `import React, { useState } from "react";

const FormExample = () => {
  // Destructuring array: [stateVariable, setterFunction]
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value); // Updating state safely
  };

  return (
    <div className="p-4">
      <input 
        type="text" 
        placeholder="Enter your name" 
        value={name} 
        onChange={handleChange} 
        className="border p-2"
      />
      {name && <p className="mt-2">Hello, {name}!</p>}
    </div>
  );
};

export default FormExample;`,
    output: "An input box. As you type your name into the input, the text 'Hello, [your name]!' dynamically appears and updates below it on every keystroke."
  },

  // Naya Topic: Props
  "props": {
    breadcrumb: "Core Concepts > Props",
    title: "Props (Properties)",
    definition: "Props are read-only components that allow passing data from a parent component down to a child component in React.",
    whyWeUse: "To create reusable components. Instead of hardcoding data inside a component, we can pass different data as props, allowing the same component to display different information.",
    keyPoints: [
      "Props follow a unidirectional data flow (Top to Bottom / Parent to Child).",
      "Props are IMMUTABLE. A child component can NEVER change the props it receives from a parent.",
      "You can pass anything as a prop: strings, numbers, arrays, objects, and even functions."
    ],
    codeExample: `import React from "react";

// Child Component receiving props
const UserCard = ({ username, role, onAction }) => {
  return (
    <div className="border p-4 rounded bg-gray-100">
      <h2 className="font-bold">{username}</h2>
      <p>Role: {role}</p>
      <button 
        onClick={onAction} 
        className="mt-2 bg-blue-500 text-white px-2 py-1 rounded"
      >
        View Profile
      </button>
    </div>
  );
};

// Parent Component passing props
const Dashboard = () => {
  const handleView = () => alert("Opening profile...");

  return (
    <div className="flex gap-4">
      {/* Passing different props to reuse the same component */}
      <UserCard username="Salim" role="Full-Stack Developer" onAction={handleView} />
      <UserCard username="Aman" role="UI/UX Designer" onAction={handleView} />
    </div>
  );
};

export default Dashboard;`,
    output: "Two user cards displayed side-by-side. One shows 'Salim' as a Developer, the other shows 'Aman' as a Designer. Clicking the button on either card triggers an alert."
  },

  "use-memo": {
  breadcrumb: "React Hooks > useMemo",
  title: "useMemo Hook",
  definition: "useMemo ek aisa hook hai jo expensive calculations ke result ko cache kar leta hai taaki unnecessary re-renders pe performance kharab na ho.",
  whyWeUse: "Performance optimization ke liye. Agar koi function 1000s of data ko filter kar raha hai, toh hum nahi chahte ki wo har baar chale jab user kisi unrelated button pe click kare.",
  keyPoints: [
    "Ye ek 'Value' return karta hai.",
    "Ye sirf tabhi dobara chalta hai jab dependency array ki value change ho.",
    "Optimization ke liye hai, logic ke liye nahi. (Don't over-use it)."
  ],
  codeExample: `import React, { useState, useMemo } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);

  // Heavy calculation function
  const expensiveCalculation = (num) => {
    console.log("Calculating...");
    for (let i = 0; i < 1000000000; i++) {} // Fake delay
    return num * 2;
  };

  // Memoize the result
  const calculation = useMemo(() => expensiveCalculation(count), [count]);

  return (
    <div className="text-white">
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <h2>Result: {calculation}</h2>
      <button onClick={() => setTodos([...todos, 'New Todo'])}>Add Todo (Wont trigger calc)</button>
    </div>
  );
}`,
},
"use-callback": {
  breadcrumb: "React Hooks > useCallback",
  title: "useCallback Hook",
  definition: "useCallback ek function instance ko memoize karta hai. Ye ensure karta hai ki function ka reference har render pe na badle.",
  whyWeUse: "React.memo ke sath use karne par ye child components ko unnecessary re-render hone se bachata hai.",
  keyPoints: [
    "Ye ek 'Function' return karta hai.",
    "Reference Equality maintain karta hai.",
    "Child components me performance improve karne ke liye best hai."
  ],
  codeExample: `import React, { useState, useCallback } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  // Function memoize ho gaya
  const increment = useCallback(() => {
    setCount((c) => c + 1);
  }, [setCount]);

  return (
    <div className="text-white">
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment</button>
    </div>
  );
}`,
},

"use-ref": {
  breadcrumb: "React Hooks > useRef",
  title: "useRef Hook",
  definition: "useRef ek aisi 'Box' create karta hai jisme tu koi bhi value rakh sakta hai jo render cycle ke beech persistent rehti hai.",
  whyWeUse: "Input focus karne ke liye, scrolling position track karne ke liye, ya 'Previous State' store karne ke liye.",
  keyPoints: [
    "Iska change component ko re-render NAHI karta.",
    "`.current` property ke through value access hoti hai.",
    "DOM manipulation ke liye standard tareeka hai."
  ],
  codeExample: `import React, { useRef } from 'react';

export default function App() {
  const inputElement = useRef();

  const focusInput = () => {
    // Direct DOM access
    inputElement.current.focus();
    inputElement.current.style.backgroundColor = "#222";
  };

  return (
    <div className="text-white p-4">
      <input type="text" ref={inputElement} className="border p-2 text-black" />
      <button onClick={focusInput} className="ml-2 bg-blue-500 p-2 rounded">Focus Input</button>
    </div>
  );
}`,
},

"use-reducer": {
  breadcrumb: "React Hooks > useReducer",
  title: "useReducer Hook",
  definition: "useReducer complex state management ke liye useState ka alternative hai. Ye logic ko component se bahar 'reducer' function me rakhne me help karta hai.",
  whyWeUse: "Jab ek state change hone par dusri state pe effect padta ho, ya state logic bohot bada ho jaye.",
  keyPoints: [
    "State aur Dispatch function return karta hai.",
    "Reducer function (state, action) accept karta hai.",
    "Predictable state changes provide karta hai."
  ],
  codeExample: `import React, { useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT': return { count: state.count + 1 };
    case 'DECREMENT': return { count: state.count - 1 };
    default: return state;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div className="text-white">
      <h1>Count: {state.count}</h1>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
    </div>
  );
}`,
},


"use-context": {
  breadcrumb: "React Hooks > useContext",
  title: "useContext Hook",
  definition: "useContext React ki 'Context API' ko consume karne ka tareeka hai, jisse data bina props pass kiye kisi bhi level pe access kiya ja sakta hai.",
  whyWeUse: "Theme (Dark/Light), User Authentication, ya Language settings ko pure app me share karne ke liye.",
  keyPoints: [
    "Prop drilling khatam kar deta hai.",
    "Provider aur Consumer pattern pe kaam karta hai.",
    "Small global state ke liye Redux ki zarurat nahi padne deta."
  ],
  codeExample: `import React, { createContext, useContext } from 'react';

const ThemeContext = createContext('dark');

function Display() {
  const theme = useContext(ThemeContext);
  return <div className="text-white">Current Theme: {theme}</div>;
}

export default function App() {
  return (
    <ThemeContext.Provider value="Neon Blue">
      <Display />
    </ThemeContext.Provider>
  );
}`,
},



};