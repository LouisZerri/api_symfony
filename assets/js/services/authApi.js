import Axios from "axios";
import jwtDecode from "jwt-decode"

function authenticate(credentials)
{
     return Axios
        .post("http://localhost:8000/api/login_check", credentials)
        .then(response => response.data.token)
        .then(token => {
            window.localStorage.setItem("authToken", token)
            setAxiosToken(token)

            return true
        })
}

function logout()
{
    window.localStorage.removeItem("authToken")
    delete Axios.defaults.headers["Authorization"]
}

function setAxiosToken(token)
{
    Axios.defaults.headers["Authorization"] = "Bearer " + token
}

/**
 * Mise en place lors du chargement de l'application
 */
function setup() {
    // 1. Voir si on a un token ?
    const token = window.localStorage.getItem("authToken");
    // 2. Si le token est encore valide
    if (token) {
        const { exp: expiration } = jwtDecode(token);
        if (expiration * 1000 > new Date().getTime()) {
            setAxiosToken(token)
        }
    }
}


export default {
    authenticate,
    logout,
    setup
}