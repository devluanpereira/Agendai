import { Link } from "react-router-dom";
import "../../assets/css/register.css";
import logo from "../../assets/logo.png";
import fundo from "../../assets/fundo.png";


function Register() {
    return <div className="row">
        <div className="col-sm-5 d-flex justify-content-center align-items-center text-center">

            <form className="form-signin">
                <img src={logo} className="logo mb-2" />
                <h5 className="mb-4" >Crie sua conta agora mesmo</h5>
                <h5 className="mb-3 font-weight-bold" >Preencha os campos abaixo</h5>


                <div className="mt-4">
                    <input type="text" placeholder="Nome"
                    className="form-control" />
                </div>

                <div className="mt-2">
                    <input type="email" placeholder="E-mail"
                    className="form-control" />
                </div>

                <div className="mt-2" >
                    <input type="password" placeholder="Senha"
                    className="form-control" />
                </div>
                <div className="mt-2" >
                    <input type="password" placeholder="Confirme a senha"
                    className="form-control" />
                </div>
                <div className="mt-3 mb-5" >
                    <button className="btn btn-primary w-100" >Criar conta</button>
                </div>
                <div>
                    <span className="me-1" >Já tenho uma conta</span>
                    <Link to="/">Fazer login!</Link>
                </div>
            </form>
        </div>

        <div className="col-sm-7 d-flex">
            <img src={fundo} className="background-login" />
        </div>
    </div>
}

export default Register;