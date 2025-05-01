# Ex06 BMI Calculator
## Date:

## AIM
To create a BMI calculator using React Router 

## ALGORITHM
### STEP 1 State Initialization
Manage the current page (Home or Calculator) using React Router.

### STEP 2 User Input
Accept weight and height inputs from the user.

### STEP 3 BMI Calculation
Calculate the BMI based on user input.

### STEP 4 Categorization
Classify the BMI result into categories (Underweight, Normal weight, Overweight, Obesity).

### STEP 5 Navigation
Navigate between pages using React Router.

## PROGRAM
```js 
App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Calculator from './components/Calculator';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<Calculator />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
```
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
}

.app {
  min-height: 100vh;
  background-color: #f0f2f5;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
```
```js
Calculator.jsx
import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const calculateBMI = (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!weight || !height) {
      setError('Please enter both weight and height');
      setBmi(null);
      setCategory('');
      return;
    }

    const weightVal = parseFloat(weight);
    const heightVal = parseFloat(height) / 100; // Convert cm to meters

    if (weightVal <= 0 || heightVal <= 0) {
      setError('Weight and height must be positive values');
      setBmi(null);
      setCategory('');
      return;
    }

    setError('');

    // Calculate BMI: weight (kg) / (height (m))^2
    const bmiValue = weightVal / (heightVal * heightVal);
    setBmi(bmiValue.toFixed(2));

    // Determine category
    if (bmiValue < 18.5) {
      setCategory('Underweight');
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setCategory('Normal weight');
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setCategory('Overweight');
    } else {
      setCategory('Obesity');
    }
  };

  const resetForm = () => {
    setWeight('');
    setHeight('');
    setBmi(null);
    setCategory('');
    setError('');
  };

  return (
    <div className="calculator">
      <h1>BMI Calculator</h1>
      
      <form onSubmit={calculateBMI}>
        <div className="form-group">
          <label>Weight (kg):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight in kg"
          />
        </div>
        
        <div className="form-group">
          <label>Height (cm):</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter height in cm"
          />
        </div>
        
        {error && <div className="error">{error}</div>}
        
        <div className="buttons">
          <button type="submit" className="calculate-btn">Calculate</button>
          <button type="button" onClick={resetForm} className="reset-btn">Reset</button>
        </div>
      </form>
      
      {bmi && (
        <div className="result">
          <h2>Your BMI Result</h2>
          <div className="bmi-value">BMI: <span>{bmi}</span></div>
          <div className="bmi-category">
            Category: <span className={`category ${category.toLowerCase().replace(' ', '-')}`}>
              {category}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculator;
```
```css
.calculator {
    max-width: 500px;
    margin: 0 auto;
    padding: 2rem;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .calculator h1 {
    text-align: center;
    color: #333;
    margin-bottom: 1.5rem;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: #555;
  }
  
  .form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  .error {
    color: #d9534f;
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }
  
  .buttons {
    display: flex;
    gap: 10px;
    margin-bottom: 1.5rem;
  }
  
  .calculate-btn, .reset-btn {
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    font-size: 1rem;
    flex: 1;
  }
  
  .calculate-btn {
    background-color: #4CAF50;
    color: white;
  }
  
  .calculate-btn:hover {
    background-color: #45a049;
  }
  
  .reset-btn {
    background-color: #f8f9fa;
    color: #333;
    border: 1px solid #ddd;
  }
  
  .reset-btn:hover {
    background-color: #e9ecef;
  }
  
  .result {
    background-color: #f9f9f9;
    padding: 1.5rem;
    border-radius: 5px;
    text-align: center;
  }
  
  .result h2 {
    color: #333;
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
  
  .bmi-value, .bmi-category {
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }
  
  .bmi-value span, .bmi-category span {
    font-weight: bold;
  }
  
  .category {
    padding: 3px 8px;
    border-radius: 3px;
    display: inline-block;
  }
  
  .underweight {
    background-color: #17a2b8;
    color: white;
  }
  
  .normal-weight {
    background-color: #28a745;
    color: white;
  }
  
  .overweight {
    background-color: #ffc107;
    color: #333;
  }
  
  .obesity {
    background-color: #dc3545;
    color: white;
  }
  ```
  ```js
  home.jsx
  import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to BMI Calculator</h1>
      <p>
        Body Mass Index (BMI) is a measure of body fat based on height and weight
        that applies to adult men and women.
      </p>
      <div className="bmi-info">
        <h2>BMI Categories:</h2>
        <ul>
          <li><strong>Underweight:</strong> BMI less than 18.5</li>
          <li><strong>Normal weight:</strong> BMI 18.5 to 24.9</li>
          <li><strong>Overweight:</strong> BMI 25 to 29.9</li>
          <li><strong>Obesity:</strong> BMI 30 or greater</li>
        </ul>
      </div>
      <Link to="/calculator" className="calculator-btn">
        Calculate Your BMI
      </Link>
    </div>
  );
};

export default Home;
```
```css
home.css
.home {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .home h1 {
    color: #333;
    margin-bottom: 1rem;
  }
  
  .home p {
    color: #666;
    margin-bottom: 2rem;
    line-height: 1.6;
  }
  
  .bmi-info {
    text-align: left;
    background-color: #f9f9f9;
    padding: 1.5rem;
    border-radius: 5px;
    margin-bottom: 2rem;
  }
  
  .bmi-info h2 {
    margin-bottom: 1rem;
    color: #333;
    font-size: 1.2rem;
  }
  
  .bmi-info ul {
    list-style-position: inside;
  }
  
  .bmi-info li {
    margin-bottom: 0.5rem;
    color: #555;
  }
  
  .calculator-btn {
    display: inline-block;
    background-color: #4CAF50;
    color: white;
    padding: 12px 24px;
    text-decoration: none;
    border-radius: 5px;
    font-weight: bold;
    transition: background-color 0.3s;
  }
  
  .calculator-btn:hover {
    background-color: #45a049;
  }
  ```
  ```js
  Navbar.jsx
  import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">BMI Calculator</div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/calculator">Calculator</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
```
```css
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #333;
    color: white;
  }
  
  .navbar-brand {
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .navbar-links {
    display: flex;
    list-style: none;
  }
  
  .navbar-links li {
    margin-left: 20px;
  }
  
  .navbar-links a {
    color: white;
    text-decoration: none;
    transition: color 0.3s;
  }
  
  .navbar-links a:hover {
    color: #4CAF50;
  }
  ```


## OUTPUT


## RESULT
The program for creating BMI Calculator using React Router is executed successfully.
