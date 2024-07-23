import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand fw-bolder fs-2 fst-italic" href="#">Library</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mx-auto  mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link class="nav-link  fw-bold fst-italic" to='/'>Home</Link>
                                {/* <a class="nav-link  fw-bold fst-italic" aria-current="page" href="#">Home</a> */}
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link  fw-bold fst-italic" to='/books'>Books</Link>
                                {/* <a class="nav-link fw-bold fst-italic" href="#">Books</a> */}
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link  fw-bold fst-italic" to='/authors'>Authors</Link>
                                {/* <a class="nav-link fw-bold fst-italic" href="#">Authors</a> */}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;