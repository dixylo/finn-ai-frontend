import { useState, useEffect } from 'react';
import './App.css';

const FIELD = {
  NAME: 'name',
  ACCESSIBILITY: 'accessibility',
  PRICE: 'price',
}

const ACCESSIBILITY = {
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
};

const PRICE = {
  FREE: 'Free',
  LOW: 'Low',
  HIGH: 'High',
};

function App() {
  const [name, setName] = useState('');
  const [accessibility, setAccessibility] = useState(ACCESSIBILITY.HIGH);
  const [price, setPrice] = useState(PRICE.FREE);
  const [user, setUser] = useState(null);
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('/activity')
      .then(response => response.json())
      .then(data => {
        if (data) {
          if (data.user) setUser(data.user);
          if (data.activity) setActivity(data.activity);
        }
      })
      .catch(error => {
        console.log(error);
        alert('Failed to retrieve data. Please try it later.');
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = { name, accessibility, price };
    const stringifiedUser = JSON.stringify(newUser);
    fetch('/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: stringifiedUser,
    })
      .then(response => {
        if (response.ok) {
          fetchData();
          setName('');
          alert('User created successfully.');
        } else {
          alert('Failed to create the user. Please try it later.');
        }
      })
      .catch(error => {
        console.log(error);
        alert('Failed to create the user. Please try it later.');
      });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAccessibilityChange = (e) => {
    setAccessibility(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Activity Center</h1>
      </header>
      {activity && !activity.error ? (
        <section className='App-activity'>
          <h3>{user ? "Activity for the Created User's Preference" : "Activity Randomly Chosen"}</h3>
          <hr />
          <p><span>Name: </span>{activity.activity}</p>
          <p><span>Accessibility: </span>{activity.accessibility}</p>
          <p><span>Type: </span>{activity.type}</p>
          <p><span>Participants: </span>{activity.participants}</p>
          <p><span>Price: </span>{activity.price}</p>
          <p><span>Link: </span>{activity.link}</p>
        </section>
      ) : (
        <section className='App-activity'>
          <h3>{user ? "No Activity Found for the Created User's Preference" : "No Activity Found"}</h3>
        </section>
      )}
      <section className='App-user'>
        <form>
          <fieldset>
            <label htmlFor={FIELD.NAME}>Name</label><br />
            <input
              type="text"
              id={FIELD.NAME}
              name={FIELD.NAME}
              value={name}
              onChange={handleNameChange}
            /><br />
          </fieldset>
          <fieldset>
            <legend>Accessibility</legend>
            <input
              type="radio"
              id='accessibility_high'
              name={FIELD.ACCESSIBILITY}
              value={ACCESSIBILITY.HIGH}
              checked={accessibility === ACCESSIBILITY.HIGH}
              onChange={handleAccessibilityChange}
            />
            <label htmlFor='accessibility_high'>High</label><br />
            <input
              type="radio"
              id='accessibility_medium'
              name={FIELD.ACCESSIBILITY}
              value={ACCESSIBILITY.MEDIUM}
              checked={accessibility === ACCESSIBILITY.MEDIUM}
              onChange={handleAccessibilityChange}
            />
            <label htmlFor='accessibility_medium'>Medium</label><br />
            <input
              type="radio"
              id='accessibility_low'
              name={FIELD.ACCESSIBILITY}
              value={ACCESSIBILITY.LOW}
              checked={accessibility === ACCESSIBILITY.LOW}
              onChange={handleAccessibilityChange}
            />
            <label htmlFor='accessibility_low'>Low</label>
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="radio"
              id='price_free'
              name={FIELD.PRICE}
              value={PRICE.FREE}
              checked={price === PRICE.FREE}
              onChange={handlePriceChange}
            />
            <label htmlFor='price_free'>Free</label><br />
            <input
              type="radio"
              id='price_low'
              name={FIELD.PRICE}
              value={PRICE.LOW}
              checked={price === PRICE.LOW}
              onChange={handlePriceChange}
            />
            <label htmlFor='price_low'>Low</label><br />
            <input
              type="radio"
              id='price_high'
              name={FIELD.PRICE}
              value={PRICE.HIGH}
              checked={price === PRICE.HIGH}
              onChange={handlePriceChange}
            />
            <label htmlFor='price_high'>High</label>
          </fieldset>
          <input
            type="submit"
            value="Create"
            disabled={!name}
            onClick={handleSubmit}
          />
        </form>
        {user && (
          <div>
            <h3>User Created</h3>
            <hr />
            <p><span>Name: </span>{user.name}</p>
            <p><span>Accessibility: </span>{user.accessibility}</p>
            <p><span>Price: </span>{user.price}</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
