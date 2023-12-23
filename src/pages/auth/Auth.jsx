import { Icon } from '@iconify/react'
import React, { useEffect } from 'react'
import { get, post } from '../../libs/fetcher'
import { logFormData } from '../../libs/formDataLogger'
import { AUTH } from '../../constants/API_URLS'
import { showError, showSuccess } from '../../libs/alertHandler'
import { useNavigate } from 'react-router-dom'

export default function Auth() {


    const navigator = useNavigate()


    const handleOnSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)

        post(AUTH.LOGIN.POST, formData)
            .then(resp => {
                showSuccess("عملیات موفق بود !", resp.message)
                const token = resp.token
                sessionStorage.setItem("token", token)
                navigator("/admin/panel")
            })
            .catch(err => {
                showError("خطایی وجود دارد !", err)
                console.log(err)
            })
    }


    useEffect(() => {
        const token = sessionStorage.getItem("token")

        if (token) {
            post(AUTH.INFO.POST, {})
                .then(resp => {
                    navigator("/admin/panel")
                })
                .catch(err => {
                    sessionStorage.removeItem("token")
                })
        }

    }, [])

    return (
        <main className='auth-page'>

            <form
                onSubmit={handleOnSubmit}
                action="#">
                <h1>
                    <span>سلام!</span>
                    برای ورود
                    اطلاعات خودتان را وارد کنید.</h1>

                <div className="form-body">
                    <div className="form-group">
                        <label>
                            <span>ایمیل</span>
                            <input type="email" name='email' />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            <span>پسوورد</span>
                            <input type="password" name='password' />
                        </label>
                    </div>
                </div>

                <div className="form-buttons">
                    <button type='submit'>
                        <Icon icon="ant-design:login-outlined" />
                        <span>
                            ورود
                        </span>
                    </button>
                </div>

            </form>


        </main>
    )
}
