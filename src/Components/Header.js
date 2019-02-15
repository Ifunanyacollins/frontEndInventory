import React from 'react'
import {Link} from 'react-router-dom'


export default () => (

<nav className="uk-navbar-container uk-background-secondary" uk-navbar="true">

    <div className="uk-navbar-center ">
        <ul className="uk-navbar-nav ">
            <li className="uk-parent uk-text-bold "><a href="/">Home</a></li>
            <li className="uk-parent uk-text-bold"><Link to="/create">Create</Link></li>
        </ul>
    </div>
</nav>

)