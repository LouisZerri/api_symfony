import React, {useEffect, useState} from 'react';
import Pagination from '../components/Pagination';
import moment from "moment";

import InvoicesAPI from "../services/invoicesAPI"
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import TableLoader from "../components/loaders/TableLoader";

const STATUS_CLASSES = {
    PAID: "success",
    SENT: "info",
    CANCELLED: "danger"
}

const STATUS_LABELS = {
    PAID: "Payée",
    SENT: "Envoyée",
    CANCELLED: "Annulée"
}

const InvoicesPage = (props) => {

    const [invoices, setInvoices] = useState([])
    const [currentPage,  setCurrentPage] = useState(1)
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)

    const fetchInvoices = async () => {

        try
        {
            const data = await InvoicesAPI.findAll()
            setInvoices(data)
            setLoading(false)
        }
        catch (error)
        {
            toast.error("Une erreur est survenue")
        }

    }


    useEffect(() => {
        fetchInvoices()
    }, [])

    const handlePageChange = page => setCurrentPage(page)

    const handleSearch = ({currentTarget}) => {
        const value = currentTarget.value;
        setSearch(value)
        setCurrentPage(1)
    }

    const handleDelete = async (id) => {

        const originalInvoices = [...invoices]

        setInvoices(invoices.filter(invoice => invoice.id !== id))

        try
        {
            await InvoicesAPI.delete(id)
            toast.success("La facture a bien été supprimée")
        }
        catch (error)
        {
            toast.error("Une erreur est survenue")
            setInvoices(originalInvoices)
        }
    }

    const itemsPerPage = 10

    const formatDate = (str) => moment(str).format('DD/MM/YYYY')

    const filteredInvoices = invoices.filter(i => i.customer.firstname.toLowerCase().includes(search.toLowerCase())
        || i.customer.lastname.toLowerCase().includes(search.toLowerCase())
        || i.amount.toString().startsWith(search.toLowerCase())
        || STATUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase()))

    const paginatedInvoices = filteredInvoices.length > itemsPerPage
        ? Pagination.getData(filteredInvoices, currentPage, itemsPerPage)
        : filteredInvoices

    return(
        <>
            <div className="mb-3 d-flex justify-content-between align-items-center">
                <h1>Liste des factures</h1>
                <Link className="btn btn-primary" to="/invoices/new">Créer une facture</Link>
            </div>
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Rechercher une facture" onChange={handleSearch} value={search}/>
            </div>

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Numéro</th>
                        <th>Client</th>
                        <th className="text-center">Date d'envoi</th>
                        <th className="text-center">Statut</th>
                        <th className="text-center">Montant</th>
                        <th></th>
                    </tr>
                </thead>
                {!loading && <tbody>
                    {paginatedInvoices.map(invoice => <tr key={invoice.id}>
                        <td>{invoice.chrono}</td>
                        <td>
                            <Link to={"/customers/"+invoice.customer.id}>{invoice.customer.firstname} {invoice.customer.lastname}</Link>
                        </td>
                        <td className="text-center">{formatDate(invoice.sentAt)}</td>
                        <td className="text-center">
                            <span className={"badge badge-" + STATUS_CLASSES[invoice.status]}>{STATUS_LABELS[invoice.status]}</span>
                        </td>
                        <td className="text-center">{invoice.amount.toLocaleString()} €</td>
                        <td>
                            <Link to={"/invoices/" + invoice.id} className="btn btn-sm btn-primary mr-1">Éditer</Link>
                            <button className="btn-sm btn-danger" onClick={() => handleDelete(invoice.id)}>Supprimer</button>
                        </td>
                    </tr>)}
                </tbody>}
            </table>
            {loading && <TableLoader />}
            {itemsPerPage < filteredInvoices.length &&
            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredInvoices.length} onPageChanged={handlePageChange} />
            }
        </>
    )
}

export default InvoicesPage