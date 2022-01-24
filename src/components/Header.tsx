import { Button } from '@mui/material';
import React from 'react'
import { NavLink } from 'react-router-dom'

export const Header: React.FC<HeaderPropsType> = React.memo(({setToken}) => {

    return (
        <div className="header">
            <NavLink to="create" style={(props:{isActive:boolean}) => props.isActive ? {color: "#54f3ba"} : {}}>
                Создать
            </NavLink>
            <NavLink to="list" style={(props:{isActive:boolean}) => props.isActive ? {color: "#54f3ba"} : {}}>
                Список созданных
            </NavLink>
            <Button color={'error'} onClick={() => setToken('')}>Выйти</Button>
        </div>
    )
})

type HeaderPropsType = {
    setToken: (token: string) => void
}
