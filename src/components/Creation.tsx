import React, {useState} from 'react'
import {Button, CircularProgress, FormControl, FormControlLabel, FormLabel, Input, MenuItem, Radio, RadioGroup, TextareaAutosize, TextField } from '../../node_modules/@mui/material/index'
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import './../index.css';
import { v1 } from "uuid"
import { ShareType } from '../brms/share-reducer.types';
import { addShareAPI } from '../api/api';
import { Preloader } from './Preloader';

export const Creation: React.FC<CreationPropsType> = React.memo(({addShare}) => {

    const [loader, setLoader] = useState<boolean>(false)

    const navigate = useNavigate()

    const validate = (values: FormType) => {
        
        const error:ErrorType = {}

        if(!values.currency) {
            error.currency = 'Обязательное поле!'
        }
        if(!values.shareName) {
            error.shareName = 'Обязательное поле!'
        } else if(values.shareName.length < 4) {
            error.shareName = 'Имя должно быть не менее чем из 4 символов!'
        }
        if(!values.shareDescription) {
            error.shareDescription = 'Обязательное поле!'
        } else if(values.shareDescription.length < 10) {
            error.shareDescription = 'Описание должно быть не менее 10 символов!'
        }
        if(!values.value) {
            error.value = 'Поле обязательное'
        } else if(values.type === 'sum' && (+values.value < 0.14 || +values.value > 2.99)) {
            error.value = 'Если выбран тип "Сумма", то допустимый диапозон от 0.14 до 2.99'
        } else if(!isFinite(+values.value)) {
            error.value = 'Вводите число'
        } else if(values.type === 'percent' && (+values.value < 10 || +values.value > 50)) {
            error.value = 'Если выбран тип "Проценты", то допустимый диапозон от 10 до 50'
        }
        return error
    }

    const formik = useFormik<FormType>({
        initialValues: {
            currency: 'USD',
            shareName: '',
            shareDescription: '',
            type: "percent",
            value: ''
        },
        validate,
        onSubmit: (values: FormType) => {
            setLoader(true)
            addShareAPI({...values, value: +values.value,id: v1()})
                .then(res => {
                    addShare({...values, value: +values.value, id: v1()})
                    navigate("../list")
                })
        },
    });

    if(loader) {
        return <Preloader/>
    }

    return (
        <div className='create-wrapper'>
            <h1>Создать новую сущность</h1>
            <form onSubmit={formik.handleSubmit}>
                <TextField select
                           name='currency'
                           label='Валюта'
                           error={formik.touched.currency && Boolean(formik.errors.currency)}
                           helperText={formik.touched.currency && formik.errors.currency}
                           value={formik.values.currency}
                           onChange={formik.handleChange}>
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="EUR">EUR</MenuItem>
                    <MenuItem value="RUB">RUB</MenuItem>
                </TextField>
                <TextField label='Название сущности'
                           name='shareName'
                           value={formik.values.shareName}
                           error={formik.touched.shareName && Boolean(formik.errors.shareName)}
                           helperText={formik.touched.shareName && formik.errors.shareName}
                           onChange={formik.handleChange}/>
                <TextField label="Multiline"
                           multiline
                           rows={4}
                           name='shareDescription'
                           error={formik.touched.shareDescription && Boolean(formik.errors.shareDescription)}
                           helperText={formik.touched.shareDescription && formik.errors.shareDescription}
                           value={formik.values.shareDescription}
                           onChange={formik.handleChange}
                />
                <FormControl>
                    <FormLabel>Выберите тип</FormLabel>
                    <RadioGroup name='type'
                                value={formik.values.type}
                                onChange={formik.handleChange}>
                        <FormControlLabel value='percent' control={<Radio />} label="Проценты" />
                        <FormControlLabel value='sum' control={<Radio />} label="Сумма" />
                    </RadioGroup>
                </FormControl>
                <TextField label='Число'
                           name='value'
                           value={formik.values.value}
                           onBlur={formik.handleBlur}
                           error={formik.touched.value && Boolean(formik.errors.value) && formik.validateOnBlur}
                           helperText={formik.errors.value}
                           onChange={formik.handleChange}/>
                <Button color='success' type='submit'>Создать</Button>
            </form>
        </div>
    )
})

export type FormType = {
    currency: "USD" | "EUR" | "RUB"
    shareName: string
    shareDescription: string
    type: "percent" | "sum"
    value: string
}

type ErrorType = {
    currency?: string
    shareName?: string
    shareDescription?: string
    type?: string
    value?: string
}

type CreationPropsType = {
    addShare: (shareData: ShareType) => void
}
