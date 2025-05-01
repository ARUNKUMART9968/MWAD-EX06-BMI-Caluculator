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