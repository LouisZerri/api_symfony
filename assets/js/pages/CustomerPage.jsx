import React, {useState} from 'react'
import Field from "../components/forms/Field";
import {Link} from "react-router-dom";
import Axios from "axios";


const CustomerPage = props => {

    const [customer, setCustomer] = useState({
        lastname: "",
        firstname: "",
        email: "",
        company: ""
    })
    const [errors, setErrors] = useState({
        lastname: "",
        firstname: "",
        email: "",
        company: ""
    })

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget
        setCustomer({...customer, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try{
            const response = await Axios.post("http://localhost:8000/api/customers", customer)
            setErrors({})

        }catch (error){
            if(error.response.data.violations)
            {
                const apiErrors = {}
                error.response.data.violations.map(violation => {
                    apiErrors[violation.propertyPath] = violation.message
                })

                setErrors(apiErrors)
            }
        }
    }

    return(
        <>
            <h1>Création d'un client</h1>

            <form onSubmit={handleSubmit}>
                <Field name="lastname" label="Nom" laceholder="Nom du client" value={customer.lastname} onChange={handleChange} error={errors.lastname} />
                <Field name="firstname" label="Prénom" placeholder="Prénom du client" value={customer.firstname} onChange={handleChange} error={errors.firstname} />
                <Field name="email" label="Email" placeholder="Email du client" type="email" value={customer.email} onChange={handleChange} error={errors.email} />
                <Field name="company" label="Entreprise" placeholder="Entreprise du client" value={customer.company} onChange={handleChange} error={errors.company} />

                <div className="form-group">
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                    <Link to="/customers" className="btn btn-link">Retour à la liste</Link>
                </div>
            </form>
        </>
    )
}

export default CustomerPage