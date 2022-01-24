import CircularProgress from '@mui/material/CircularProgress'
import React from 'react'

export const Preloader: React.FC<PreloaderPropsType> = ({}) => {
    return (
        <div className="preloader-wrapper"> 
            <CircularProgress size={100}/>
        </div>
    )
}

type PreloaderPropsType = {

}
