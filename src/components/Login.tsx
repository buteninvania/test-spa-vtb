import {useFormik} from 'formik'
import React, {FormEvent, useState} from 'react'
import {Button, CircularProgress, TextField} from '../../node_modules/@mui/material/index'
import InputMask from 'react-input-mask';
import {loginUser} from '../api/api'
import { Preloader } from './Preloader'

export const Login: React.FC<LoginPropsType> = React.memo(({setToken}) => {

    const [loader, setLoader] = useState<boolean>(false)

    const validate = (values: FormType) => {
        const error: ErrorType = {}
        if (!values.login) error.login = 'Обязательное поле!'
        if (!values.password) error.password = 'Обязательное поле!'
        return error
    }

    const formik = useFormik<FormType>({
        initialValues: {
            login: '',
            password: '',
        },
        validate,
        onSubmit: (values: FormType) => {
            setLoader(true)
            loginUser(values.login, values.password)
                .then(res => setToken(res.token))
        },
    });

    if (loader) return <Preloader/>

    return (
        <div className="login-wrapper">
            <h1>Добро пожаловать! Войдите.</h1>
            <form onSubmit={formik.handleSubmit}>
                <InputMask mask="9(999)-999-9999" value={formik.values.login} onChange={formik.handleChange}>
                    {(inputProps: any) => <TextField label="Login"
                                                     name="login"
                                                     error={formik.touched.login && Boolean(formik.errors.login)}
                                                     helperText={formik.touched.login && formik.errors.login}
                                                     {...inputProps} />}
                </InputMask>
                <TextField label="password"
                           name="password"
                           value={formik.values.password}
                           error={formik.touched.password && Boolean(formik.errors.password)}
                           helperText={formik.touched.password && formik.errors.password}
                           onChange={formik.handleChange}/>
                <Button type='submit'>Отправить</Button>
            </form>
        </div>
    )
})

type LoginPropsType = {
    setToken: (token: string) => void
}

type ErrorType = {
    login?: string
    password?: string
}

type FormType = {
    login: string
    password: string
}


