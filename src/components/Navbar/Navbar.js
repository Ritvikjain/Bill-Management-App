import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <Link className="navbar-brand" to="/"><b>Bill Management</b></Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <Link to="/" class="nav-link">Home</Link>
                    </li>
                    <li class="nav-item">
                        <Link to="/monthlycycle" class="nav-link">Monthly Cycle</Link>
                    </li>
                    <li class="nav-item">
                        <Link to="/monthlybudget" class="nav-link">Monthly Budget</Link>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    )
}
