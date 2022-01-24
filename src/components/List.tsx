import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ShareType } from '../brms/share-reducer.types'

export const List: React.FC<ListPropsType> = React.memo(({shareList}) => {

    const navigate = useNavigate()

    const onClickHandler = (shareId: string) => {
        navigate(`../share/${shareId}`)
    }

    return (
        <div className='listing-wrapper'>
            <h1>Список сущностей</h1>
            <div className='listing-wrapper__list'>
                {shareList.length > 0 ? shareList.map((s,i) =>
                    <div className='listing-wrapper__item' onClick={() => onClickHandler(s.id)} key={s.id}>
                        <span>{i+1})</span>
                        <span>Имя сущности: {s.shareName}</span>
                        <span>Описание: {s.shareDescription}</span>
                        <span>Валюта: {s.currency}</span>
                        <span>Тип: {s.type}</span>
                        <span>Значение: {s.value}</span>
                    </div>
                ) : <div>Перейдите на вкладку создание</div>}
            </div>
        </div>
    )
})

type ListPropsType = {
    shareList: Array<ShareType>
}
