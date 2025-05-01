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