import Axios from "axios";

function findAll()
{
    return Axios.get("http://localhost:8000/api/invoices")
        .then(response => response.data['hydra:member'])
}

function deleteInvoices(id)
{
    return Axios.delete("http://localhost:8000/api/invoices/" + id)
}

export default {
    findAll : findAll,
    delete : deleteInvoices
}