// React - component based architecture 


React components are JavaScript functions that return markup

function MyButton() {
  return (
    <button>I'm a button</button>
  );
}
now that i have declared Mybutton i can nest it into another component
export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}
the export default keywords specify the main component in the file.

Writing markup with JSX for this you can use online converter

Adding styles -> you can do this by specifying a CSS class with className
<img className="avatar" />
/* In your CSS */
.avatar {
  border-radius: 50%;
}

You can also “escape into JavaScript” from JSX attributes, but you have to use curly braces instead of quotes.
return (
  <img
    className="avatar"
    src={user.imageUrl}
  />
);
const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://react.dev/images/docs/scientists/yXOvdOSs.jpg',
  imageSize: 90,
};

export default function Profile() {
  return(
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'Photo of ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
    </>
  );
}

Conditional Rendering
let content;
if (isLoggedIn) {
  content = <AdminPanel />;
} else {
  content = <LoginForm />;
}
return (
  <div>
    {content}
  </div>
);

When you don’t need the else branch, you can also use a shorter logical && syntax:

<div>
  {isLoggedIn && <AdminPanel />}
</div>

Rendering Lists

const listItems = products.map(products => 
   <li key={product.id}>
      {product.title}
   </li>
);

return(
   <ul>{listItems}</ul>
);

const products = [
  { title: 'Cabbage', isFruit: false, id: 1 },
  { title: 'Garlic', isFruit: false, id: 2 },
  { title: 'Apple', isFruit: true, id: 3 },
];

export default function ShoppingList() {
  const listItems = products.map(product =>
    <li
      key={product.id}
      style={{
        color: product.isFruit ? 'magenta' : 'darkgreen'
      }}
    >
      {product.title}
    </li>
  );

  return (
    <ul>{listItems}</ul>
  );
}

Responding to events 
You can respond to events by declaring event handler functions inside your components:

function MyButton() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick={handleClick}>  //Notice how onClick={handleClick} has no parentheses at the end! Do not call the event handler function: you only need to pass it down. React will call your event handler when the user clicks the button.
      Click me
    </button>
  );
}
Updating the screen
import {use state} from 'react';
function Mybutton(){
   const[count,setCount] = useState(0);
   
count will be 0 because you passed 0 to useState(). When you want to change state, call setCount() and pass the new value to it. Clicking this button will increment the counter.

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}

Using Hooks!

Functions starting with use are called Hooks eg useState!



[alt text](sharing_data_parent.png)
![alt text](sharing_data_parent_clicked-1.webp)

Now when you click either button, the count in MyApp will change, which will change both of the counts in MyButton. Here’s how you can express this in code.

First, move the state up from MyButton into MyApp:

export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counters that update separately</h1>
      <MyButton />
      <MyButton />
    </div>
  );
}

function MyButton() {
  // ... we're moving code from here ...
}
Then, pass the state down from MyApp to each MyButton, together with the shared click handler. You can pass information to MyButton using the JSX curly braces, just like you previously did with built-in tags like <img>:

export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counters that update together</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}
The information you pass down like this is called props
Finally, change MyButton to read the props you have passed from its parent component:

function MyButton({ count, onClick }) {
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}

# Describing the UI

![alt text](generic_render_tree.png)

# First React Component

Components: UI building blocks 
On the Web, HTML lets us create rich structured documents with its built-in set of tags like <h1> and <li>

the documentation page you’re reading is made out of React components
<PageLayout>
  <NavigationHeader>
    <SearchBar />
    <Link to="/docs">Docs</Link>
  </NavigationHeader>
  <Sidebar />
  <PageContent>
    <TableOfContents />
    <DocumentationText />
  </PageContent>
</PageLayout>

Importing and Exporting Components
The magic of components lies in their reusability: you can create components that are composed of other components. But as you nest more and more components, it often makes sense to start splitting them into different files

import Gallery from './Gallery.js';

Writing Markup with JSX
JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file. Although there are other ways to write components, most React developers prefer the conciseness of JSX, and most codebases use it.

Keeping a button’s rendering logic and markup together ensures that they stay in sync with each other on every edit.
Converting HTML to JSX 
Suppose that you have some (perfectly valid) HTML:

<h1>Hedy Lamarr's Todos</h1>
<img
  src="https://react.dev/images/docs/scientists/yXOvdOSs.jpg"
  alt="Hedy Lamarr"
  class="photo"
>
<ul>
    <li>Invent new traffic lights
    <li>Rehearse a movie scene
    <li>Improve the spectrum technology
</ul>

<> and </> -> is called fragment 

why every tag must be closed ->camelCase all most of the things! 
JSX turns into JavaScript and attributes written in JSX become keys of JavaScript objects. In your own components, you will often want to read those attributes into variables. But JavaScript has limitations on variable names

Where to use curly braces 
You can only use curly braces in two ways inside JSX:

As text directly inside a JSX tag: <h1>{name}'s To Do List</h1> works, but <{tag}>Gregorio Y. Zara's To Do List</{tag}> will not.
As attributes immediately following the = sign: src={avatar} will read the avatar variable, but src="{avatar}" will pass the string "{avatar}".

Inline style properties are written in camelCase.

Passing Props to a Component
React components use props to communicate with each other. Every parent component can pass some information to its child components by giving them props. Props might remind you of HTML attributes, but you can pass any JavaScript value through them, including objects, arrays, and functions


Props let you think about parent and child components independently.

, props are immutable—a term from computer science meaning “unchangeable”. When a component needs to change its props (for example, in response to a user interaction or new data), it will have to “ask” its parent component to pass it different props—a new object! Its old props will then be cast aside, and eventually the JavaScript engine will reclaim the memory taken by them.

#Conditional Rendering 

Conditional rendering means displaying different UI elements based on a condition.

Just like we use if-else in JavaScript to make decisions, React lets us decide what to display on the screen depending on a condition.

For example:
- If a user is logged in → show the Dashboard.
- If a user is not logged in → show the Login button.
- If data is loading → show a Loading message.
Let's understand it step by step.
1. Using if-else
You can use normal JavaScript if-else statements to decide what a component should return.
function App() {
  const isLoggedIn = true;

  if (isLoggedIn) {
    return <h1>Welcome Back!</h1>;
  } else {
    return <h1>Please Login</h1>;
  }
}

export default App;


Output:
Welcome Back!
Because isLoggedIn is true.

If isLoggedIn becomes false, the output will be Please Login.

Remember: With if-else, you generally use separate return statements for the different UI outcomes.
2. Using the ternary operator ? :
This is useful when you want to render one of two elements inside JSX.

Syntax:
condition ? expressionIfTrue : expressionIfFalse


Example:
function App() {
  const isLoggedIn = false;

  return (
    <div>
      {isLoggedIn ? <h1>Welcome!</h1> : <h1>Please Login</h1>}
    </div>
  );
}


Output: Please Login

How it works:
- isLoggedIn is true → render Welcome!
- isLoggedIn is false → render Please Login
The curly braces {} allow you to write JavaScript expressions inside JSX.
3. Using the logical AND operator &&
Use && when you want to display something only if a condition is true. If the condition is false, nothing is rendered from the expression.
function App() {
  const hasMessage = true;

  return (
    <div>
      <h1>My App</h1>
      {hasMessage && <p>You have a new message!</p>}
    </div>
  );
}


Output:
My App
You have a new message!


If hasMessage is false, the paragraph won't appear.

Important interview point: Avoid writing {count && <p>...</p>} when count can be 0, because JavaScript may render the number 0 on the screen. Instead, use {count > 0 && <p>...</p>}.
4. Using a variable
You can store the JSX in a variable and then render it.
function App() {
  const isAdmin = true;

  let content;

  if (isAdmin) {
    content = <h1>Admin Dashboard</h1>;
  } else {
    content = <h1>User Dashboard</h1>;
  }

  return <div>{content}</div>;
}