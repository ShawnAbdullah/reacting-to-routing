import React, { Fragment } from 'react'

const People = (props) => {
    return (
        <>
        <div className="card">
        <div className="card-body">
            <h4>{props.person.name}</h4>
            <p className="card-text">{props.person.gender}</p>
            <p className="card-text">{props.person.age}</p>
        </div>
        </div>
        </>
    )
}

export default People;