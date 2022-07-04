import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import AuthPage from "./pages/Auth";
import EventsPage from "./pages/Events"
import BookingsPage from "./pages/Bookings";
import MainNavigation from './components/Navigation/MainNavigation';
import './App.css'

function App() {
  const userId = localStorage.getItem('userId')
  const token = localStorage.getItem('token')
  return (
    <BrowserRouter>
      <React.Fragment>
        <MainNavigation />
        <main className='main-content'>
          <Switch>
            {token && <Redirect from="/" to="/events" exact><EventsPage /></Redirect>}
            {token && <Redirect from="/auth" to="/events" exact><EventsPage /></Redirect>}
            {!token && <Route path="/auth"><AuthPage /></Route>}
            <Route path="/events"><EventsPage /></Route>
            {token && <Route path="/bookings"><BookingsPage /></Route>}
            {!token && <Redirect to="/auth" exact><AuthPage /></Redirect>}
          </Switch>
        </main>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
