import React, {useState} from 'react'
import Field from "../components/forms/Field";
import {Link} from "react-router-dom";
import Axios from "axios";
import UsersApi from "../services/usersApi";


const RegisterPage = ({history}) => {

    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        passwordConfirm: ""
    })

    const [errors, setErrors] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        passwordConfirm: ""
    })

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget
        setUser({...user, [name]: value})
    }

    const handleSubmit = async event => {
        event.preventDefault()
        const apiErrors = {}

        if(user.password !== user.passwordConfirm)
        {
            apiErrors.passwordConfirm = "Les deux mots de passe ne correspondent pas"
            setErrors(apiErrors)
            return
        }

        try {
            await UsersApi.register(user)
            setErrors({})
            history.replace("/login")
        } catch ({response}){
            const {violations} = response.data
            if(violations)
            {
                violations.map(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message
                })

                setErrors(apiErrors)
            }
        }

    }


    return(
        <>
            <h1>Inscription</h1>
            <form onSubmit={handleSubmit}>
                <Field
                    name="firstname"
                    label="Prénom"
                    placeholder="Votre prénom"
                    error={errors.firstname}
                    value={user.firstname}
                    onChange={handleChange}
                />
                <Field
                    name="lastname"
                    label="Nom"
                    placeholder="Votre nom"
                    error={errors.lastname}
                    value={user.lastname}
                    onChange={handleChange}
                />
                <Field
                    name="email"
                    label="Adresse mail"
                    placeholder="Votre email"
                    type="email"
                    error={errors.email}
                    value={user.email}
                    onChange={handleChange}
                />
                <Field
                    name="password"
                    label="Mot de passe"
                    type="password"
                    placeholder="Votre mot de passe"
                    error={errors.password}
                    value={user.password}
                    onChange={handleChange}
                />
                <Field
                    name="passwordConfirm"
                    label="Confirmation du mot de passe"
                    type="password"
                    placeholder="Confirmez votre mot de passe"
                    error={errors.passwordConfirm}
                    value={user.passwordConfirm}
                    onChange={handleChange}
                />

                <div className="form-group">
                    <button type="submit" className="btn btn-success">Inscription</button>
                    <Link to="/login" className="btn btn-link">J'ai déjà un compte</Link>
                </div>


            </form>
        </>
    )
}

export default RegisterPage