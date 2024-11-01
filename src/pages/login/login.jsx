import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/login.css";
import logo from "../../assets/logo.png";
import fundo from "../../assets/fundo.png";
import { useState } from "react";
import api from "../../constants/api";

function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    async function ExecuteLogin() {

        setMsg("");

        try {
            const response = await api.post("/admin/login", {
                email: email,
                password: password
            });

            if (response.status === 200) {
                api.defaults.headers.common['Authorization'] = "Bearer " + response.data.token;
                navigate("/appointments");
            } else {
                setMsg("Erro ao efetuar login. Tente novamente mais tarde.");
            }

        } catch (error) {
            if (error.response?.data.error) {
                setMsg(error.response?.data.error);
            } else {
                setMsg("Erro ao efetuar login. Tente novamente mais tarde.");
            }
        }
    }

    return (
        <div className="container-fluid vh-100 d-flex flex-column flex-md-row">
            <div className="col-md-5 d-flex justify-content-center align-items-center text-center">
                <form className="form-signin w-75">
                    <img src={logo} className="logo mb-2" alt="Logo" />
                    <h5 className="mb-4">Gerencie seus agendamentos de forma descomplicada.</h5>
                    <h5 className="mb-3 font-weight-bold">Acessar sua conta</h5>
                    <div className="mt-4">
                        <input type="email" placeholder="E-mail" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mt-2">
                        <input type="password" placeholder="Senha" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="mt-3 mb-5">
                        <button onClick={ExecuteLogin} className="btn btn-primary w-100" type="button">Login</button>
                    </div>

                    {msg.length > 0 && (
                        <div className="alert alert-danger" role="alert">
                            {msg}
                        </div>
                    )}

                    <div>
                        <span className="me-1">Não tenho uma conta</span>
                        <Link to="/register">Criar agora!</Link>
                    </div>
                </form>
            </div>

            <div className="col-md-7 d-none d-md-flex align-items-center justify-content-center">
                <img src={fundo} className="background-login img-fluid" alt="Fundo" />
            </div>
        </div>
    );
}

export default Login;
