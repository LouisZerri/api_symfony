import Axios from "axios";

function authenticate(credentials)
{
     return Axios
        .post("http://localhost:8000/api/login_check", credentials)
        .then(response => response.data.token)
        .then(token => {
            window.localStorage.setItem("authToken", token)
            Axios.defaults.headers["Authorization"] = "Bearer " + token

            return true
        })
}

export default {
    authenticate
}