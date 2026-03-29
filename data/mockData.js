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
  }
};