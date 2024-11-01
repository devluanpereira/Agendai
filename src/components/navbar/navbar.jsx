import "../../assets/css/navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo-white.png"; 

function Navbar() {

    return (
        <nav className="navbar fixed-top navbar-expand-lg bg-primary" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/appointments">
                    <img className="navbar-logo" src={logo} alt="Logo" />
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink 
                                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} 
                                to="/appointments"
                            >
                                Agendamentos
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink 
                                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} 
                                to="/doctors"
                            >
                                Médicos
                            </NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <div className="btn-group">
                                <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="bi bi-person-circle"></i> {/* Icone de exemplo */}
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li><Link className="dropdown-item" to="/">Logout</Link></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
