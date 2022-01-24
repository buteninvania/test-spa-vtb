/* Business rule management system - business logic and state created according
   to the principles of functional programming using reducer */

import {ACTIONS_TYPE, AddShareActionType, ShareActionType, ShareType } from "./share-reducer.types"


export const shareReducer = (state: Array<ShareType>, action: ShareActionType) => {
    switch (action.type){
        case ACTIONS_TYPE.ADD_SHARE_TYPE:
            return [...state, action.payload]
    }
    return state
}

export const addShareAC = (shareData: ShareType): AddShareActionType => ({
    type: ACTIONS_TYPE.ADD_SHARE_TYPE,
    payload: {...shareData}
})