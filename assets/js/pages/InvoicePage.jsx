import React, {useState, useEffect} from 'react'
import Field from "../components/forms/Field";
import Select from "../components/forms/Select";
import {Link} from "react-router-dom";
import CustomersAPI from "../services/customersAPI";
import Axios from "axios";

const InvoicePage = ({history}) => {

    const [invoice, setInvoice] = useState({
        amount: "",
        customer: "",
        status: "SENT"
    })

    const [errors, setErrors] = useState({
        amount: "",
        customer: "",
        status: ""
    })

    const [customers, setCustomers] = useState( [])

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget
        setInvoice({...invoice, [name]: value})
    }

    const fetchCustomers = async () => {
        try {
            const data = await CustomersAPI.findAll()
            setCustomers(data)
            if(!invoice.customer) setInvoice({...invoice, customer: data[0].id})
        }catch (error){
            console.log(error.response)
        }
    }

    useEffect(() => {
        fetchCustomers()
    },[])

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await Axios.post("http://localhost:8000/api/invoices", {...invoice, customer: `/api/customers/${invoice.customer}`})
            history.replace("/invoices")

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
            <h1>Création dune facture</h1>
            <form onSubmit={handleSubmit}>
                <Field
                    name="amount"
                    type="number"
                    placeholder="Montant de la facture"
                    label="Montant"
                    onChange={handleChange}
                    value={invoice.amount}
                    error={errors.amount}
                />
                <Select
                    name="customer"
                    label="Client"
                    value={invoice.customer}
                    error={errors.customer}
                    onChange={handleChange} >

                    {customers.map(customer =>
                        <option value={customer.id} key={customer.id}>{customer.firstname} {customer.lastname}</option>
                    )}

                </Select>

                <Select
                    name="status"
                    label="Statut"
                    value={invoice.status}
                    error={errors.status}
                    onChange={handleChange} >

                    <option value="SENT">Envoyée</option>
                    <option value="PAID">Payée</option>
                    <option value="CANCELLED">Annulée</option>

                </Select>
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                    <Link to="/invoices" className="btn btn-link">Retour à la liste</Link>
                </div>
            </form>
        </>
    )
}

export default InvoicePage