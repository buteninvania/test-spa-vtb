import React, {useCallback, useReducer } from 'react';
import { HashRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import {addShareAC, shareReducer } from './brms/share-reducer';
import { ShareType } from './brms/share-reducer.types';
import { Creation } from './components/Creation';
import { Header } from './components/Header';
import { List } from './components/List';
import { Login } from './components/Login'
import { Share } from './components/Share';
import useToken from './hooks/useToken';

export const App = () => {

    const [state, disptach] = useReducer(shareReducer, [])
    
    const addShare = useCallback((shareData: ShareType) => {
        disptach(addShareAC(shareData))
    }, [disptach])
    
    const {token, setToken} = useToken()
    
    const getDataShare = (shareId:string):ShareType => state.filter(s => s.id === shareId)[0]
    
    if(!token) return <Login setToken={setToken}/>
    
    return (
        <HashRouter>
            <div className={'app-wrapper'}>
                <Header setToken={setToken}/>
                <Routes>
                    <Route path="login" element={<Login setToken={setToken}/>}/>
                    <Route path="create" element={<Creation addShare={addShare}/>}/>
                    <Route path="share/:shareId" element={<Share getDataShare={getDataShare}/>}/>
                    <Route path="list" element={<List shareList={state}/>}/>
                    <Route path="/" element={<Navigate to="/create"/>}/>
                </Routes>
            </div>
        </HashRouter>
    )
}


