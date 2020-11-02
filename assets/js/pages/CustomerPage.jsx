import React, {useState, useEffect} from 'react'
import Field from "../components/forms/Field";
import {Link} from "react-router-dom";
import Axios from "axios";
import CustomersAPI from "../services/customersAPI";


const CustomerPage = ({match, history}) => {

    const { id = 'new' }  = match.params

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

    const [editing, setEditing] = useState(false)

    const fetchCustomer = async id =>
    {
        try {
            const {firstname, lastname, email, company} = await CustomersAPI.find(id)
            setCustomer({firstname, lastname, email, company})
        }catch (error){
            console.log(error.response)
            history.replace("/customers")
        }
    }

    useEffect(() => {
        if(id !== 'new')
        {
            setEditing(true)
            fetchCustomer(id)
        }
    }, [id])


    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget
        setCustomer({...customer, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try{
            if(editing)
            {
                await CustomersAPI.update(id, customer)
            }
            else
            {
                await CustomersAPI.create(customer)
                history.replace("/customers ")
            }
            setErrors({})

        } catch ({response}){
            const {violations} = response.data
            if(violations)
            {
                const apiErrors = {}
                violations.map(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message
                })

                setErrors(apiErrors)
            }
        }
    }

    return(
        <>
            {!editing && <h1>Création d'un client</h1> || <h1>Modification d'un client</h1> }

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