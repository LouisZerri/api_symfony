import React, {useState} from 'react'
import AuthApi from "../services/authApi";
import Field from "../components/forms/Field";
import {toast} from "react-toastify";

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
            toast.success("Vous êtes désormais connecté 😊")
            history.replace("/customers")
        } catch (error) {
            setError(
                "Aucun compte ne possède cette adresse email ou alors les informations ne correspondent pas !"
            );
            toast.error("Une erreur est survenue")
        }
    }


    return(
        <>
            <h1>Connexion à votre compte</h1>

            <form className="mt-5" onSubmit={handleSubmit}>
                <Field
                    label="Adresse email"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    placeholder="Adresse email"
                    error={error}
                />
                <Field
                    label="Mot de passe"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    type="password"
                    error=""
                />
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Connexion</button>
                </div>
            </form>

        </>
    )
}

export default LoginPage