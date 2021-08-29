import React from 'react'
import { Switch,Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import Movie from './pages/Movie.jsx';
import TV from './pages/TVpage.jsx';
import Favorite from './pages/Favorite.jsx';
import Add from './pages/Add.jsx';
import Edit from './pages/Edit.jsx';
import style from './App.css';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
            <Home/>
        </Route>
        <Route exact path="/movie">
            <Movie/>
        </Route>
        <Route exact path="/tvSeries">
            <TV/>
        </Route>
        <Route exact path="/favorite">
            <Favorite/>
        </Route>
        <Route exact path="/add">
            <Add/>
        </Route>
        <Route exact path="/edit">
            <Edit/>
        </Route>
      </Switch>
    </>
  )
}

export default App