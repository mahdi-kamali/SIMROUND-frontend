import axios from "axios"
import { useEffect, useState } from "react"


axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 403) {
            sessionStorage.removeItem("token")
            window.location.href = window.location.origin;
        }
        return Promise.reject(error);
    }
);



export async function post(URL, DATA) {
    try {
        const res = await axios.post(URL, DATA, {
            headers: {
                token: sessionStorage.getItem("token")
            }
        })


        return res.data

    }
    catch (err) {
        const response = err.response

        if (response) {
            throw response.data
        } else {
            throw "Somthing Error"
        }

    }


}

export async function put(URL, DATA) {
    try {
        const res = await axios.put(URL, DATA, {
            headers: {
                token: sessionStorage.getItem("token")
            }
        })


        return res.data

    }
    catch (err) {
        const response = err.response

        if (response) {
            throw response.data
        } else {
            throw "Somthing Error"
        }

    }


}


export async function get(URL, DATA) {
    try {
        const token = sessionStorage.getItem("token")
        const res = await axios.get(URL, {
            headers: {
                token: token
            }
        })



        return res.data

    }
    catch (err) {
        const response = err.response

        if (response) {
            throw response.data
        } else {
            throw "Somthing Error"
        }

    }


}


export async function deleteF(URL, DATA) {
    try {
        const token = sessionStorage.getItem("token")

        const res = await axios.delete(URL, {
            headers: {
                token: token,
            },
            data: DATA
        })



        return res.data

    }
    catch (err) {
        const response = err.response

        if (response) {
            throw response.data
        } else {
            throw "Somthing Error"
        }

    }


}




export function useFetch(URL, DATA) {
    const [url, setUrl] = useState(URL)
    const [data, setData] = useState(undefined)
    const [error, setError] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [refresh, tempFun] = useState(false)



    const setUrlFunction = (newUrl) => {
        setUrl(newUrl)
    }


    const refreshFunction = () => {
        tempFun(!refresh)
    }



    useEffect(() => {
        get(url, DATA).then(res => {
            setData(res)
            setLoading(false)
        })
            .catch(err => {
                setError(err)
                setLoading(false)
            })


    }, [url, refresh])
    return [data, error, loading, refreshFunction, setUrlFunction]

}


