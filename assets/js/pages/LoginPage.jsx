import React, {useState} from 'react'
import AuthApi from "../services/authApi";

const LoginPage = ({onLogin, history}) => {

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })
    const [error, setError] = useState("");

    const handleChange = ({ currentTarget }) => {
        const { value, name } = currentTarget;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async event => {
        event.preventDefault()
        try {
            await AuthApi.authenticate(credentials)
            setError("");
            onLogin(true)
            history.replace("/customers")
        } catch (error) {
            setError(
                "Aucun compte ne possède cette adresse email ou alors les informations ne correspondent pas !"
            );
        }
    }


    return(
        <>
            <h1>Connexion à votre compte</h1>

            <form className="mt-5" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Adresse email</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Adresse email"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Mot de passe"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}


                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Connexion</button>
                </div>
            </form>

        </>
    )
}

export default LoginPage