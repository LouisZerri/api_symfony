import Axios from "axios";

function findAll()
{
    return Axios.get("http://localhost:8000/api/customers")
        .then(response => response.data['hydra:member'])
}

function find(id)
{
    return Axios.get("http://localhost:8000/api/customers/" + id)
        .then(response => response.data)
}

function create(customer)
{
    return Axios.post("http://localhost:8000/api/customers", customer)
}

function update(id, customer)
{
    return Axios.put("http://localhost:8000/api/customers/" + id, customer)
}

function deleteCustomer(id)
{
    return Axios.delete("http://localhost:8000/api/customers/" + id)
}

export default {
    findAll : findAll,
    find: find,
    create: create,
    update: update,
    delete : deleteCustomer
}