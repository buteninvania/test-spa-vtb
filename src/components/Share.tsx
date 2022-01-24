import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { ShareType } from '../brms/share-reducer.types';
import { Preloader } from './Preloader';

export const Share: React.FC<SharePropsType> = React.memo(({getDataShare}) => {

    const [dataShare, setDataShare] = useState<ShareType>(null)

    const params = useParams();

    useEffect(() => {
        const data = getDataShare(params.shareId)
        setDataShare(data)
    }, [])

    if(!dataShare) {
        return <Preloader/>
    }

    return (
        <div className="share-wrapper">
            <h1>Информация по сущности</h1>
            <div className="share-wrapper__content">
                <span>ID сущности: {dataShare.id}</span>
                <span>Назавание: {dataShare.shareName}</span>
                <span>Описание: {dataShare.shareDescription}</span>
                <span>Валюта: {dataShare.currency}</span>
                <span>Тип значения: {dataShare.type}</span>
                <span>Значения: {dataShare.value}</span>
            </div>
        </div>
    )
})

type SharePropsType = {
    getDataShare:(shareId: string) => ShareType
}
