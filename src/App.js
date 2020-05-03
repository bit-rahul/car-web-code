import React from 'react';
import './App.css';
import Header from './components/header'
import Footer from './components/Footer'
import Booking from './containers/Booking'
import CardDetails from './containers/CarDetails'
import Dashboard from './containers/Dashboard';

function App() {
  return (
    <>
      <Header />
      <Dashboard />
      <Footer/>
    </>
  );
}

export default App;
