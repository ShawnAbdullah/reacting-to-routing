import React, { Fragment } from 'react';

const Films = (props) => {
    return (
        <>
        <div className="card">
        <div className="card-body">
            <h4>{props.film.title}</h4>
            <p className="card-text">{props.film.description}</p>
            <footer className='blockquote-footer'><a target='null' href={`https://ghibliapi.herokuapp.com/films/${props.film.id}`}>Link To Raw JSON</a></footer>
        </div>
        </div>
        </>
    )
}

export default Films;