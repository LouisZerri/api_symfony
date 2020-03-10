import React, {useEffect, useState} from 'react';
import Axios from 'axios';


const CustomersPage = (props) => {

    const [customers, setCustomers] = useState([])

    useEffect(() => {
        Axios.get("http://localhost:8000/api/customers")
            .then(response => response.data['hydra:member'])
            .then(data => setCustomers(data))
            .catch(error => console.log(error.response))
    }, [])

    const handleDelete = (id) => {

        const originalCustomers = [...customers]

        setCustomers(customers.filter(customer => customer.id !== id))

        Axios.delete("http://localhost:8000/api/customers/" + id)
            .then(response => console.log("Ok"))
            .catch(error => {
                setCustomers(originalCustomers)
                console.log(error.response)
           
            })
    }

    return ( <> 
                <h1>Liste des clients</h1>

                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Identifiant</th>
                            <th>Client</th>
                            <th>Email</th>
                            <th>Entreprise</th>
                            <th className="text-center">Factures</th>
                            <th className="text-center">Montant total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map(customer => <tr key={customer.id}>
                                                        <td>{customer.id}</td>
                                                        <td>
                                                            <a href="#">{customer.firstname} {customer.lastname}</a>
                                                        </td>
                                                        <td>{customer.email}</td>
                                                        <td>{customer.company}</td>
                                                        <td className="text-center">
                                                            <span className="badge badge-secondary">{customer.invoices.length}</span>
                                                        </td>
                                                        <td className="text-center">{customer.totalAmount.toLocaleString()} €</td>
                                                        <td>
                                                            <button onClick={() => handleDelete(customer.id)} disabled={customer.invoices.length > 0} className="btn btn-sm btn-danger">Supprimer</button>
                                                        </td>
                                                    </tr>)}
                        
                    </tbody>
                </table>
            </>
        );
}
 
export default CustomersPage;