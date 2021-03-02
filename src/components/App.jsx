import React, { BrowserRouter, Switch, Route, useState, useEffect } from 'react';
import Films from './Films';
import People from './People';

const App = () => {
    const [films, setFilms] = useState([])
    const [people, setPeople] = useState([])
    const [loadFilms, setLoadFilms] = useState(false)
    const [loadPeople, setLoadPeople] = useState(false)

    let handleLoadFilms = () => {
        fetch('https://ghibliapi.herokuapp.com/films')
        .then(resolve => resolve.json())
        .then(resolve => setFilms(resolve))
        
        setLoadPeople(false)
        setLoadFilms(true)
    }

    let handleLoadPeople = () => {
        fetch('https://ghibliapi.herokuapp.com/people')
        .then(resolve => resolve.json())
        .then(resolve => setPeople(resolve))
        
        setLoadFilms(false)
        setLoadPeople(true)
    }
    <BrowserRouter>
    <Switch>
        <Route exact path="/">
            {() => <h1>home</h1>}
        </Route>
        <Route exact path="/films">
            {() => <h1>explore films</h1>}
        </Route>
        <Route exact path="/people">
            {() => <h1>explore people</h1>}
        </Route>
        <Route exact path="/people/:personid">
            {() => <h1>character bio</h1>}
        </Route>
        <Route path="*">
            {() => <h1>404: page not found</h1>}
        </Route>
    </Switch>
    </BrowserRouter>
    if (loadFilms == false && loadPeople == false) {
        return (
            <>
            <button onClick={() => handleLoadFilms()}>explore films</button>
            <button onClick={() => handleLoadPeople()}>explore people</button>
            studio ghilbi
            </>
        )
    } else if (loadFilms == true) {
        return (
            <>
            <button onClick={() => handleLoadFilms()}>explore films</button>
            <button onClick={() => handleLoadPeople()}>explore people</button>
            {films.map(film => (
                <Films film ={film} />
            ))}
            </>
        )
        } else if (loadPeople == true) {
            return (
                <>
                <button onClick={() => handleLoadFilms()}>explore films</button>
                <button onClick={() => handleLoadPeople()}>explore people</button> 
                {people.map(person => (
                    <People person ={person} />
                ))};
                </>
            )
    }

}


export default App;