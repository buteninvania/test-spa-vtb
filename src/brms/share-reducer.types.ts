export type ShareType = {
    id: string
    currency: "USD" | "EUR" | "RUB"
    shareName: string
    shareDescription: string
    type: "percent" | "sum"
    value: number
}

export enum ACTIONS_TYPE {
    ADD_SHARE_TYPE = "SharePage/ADD_SHARE_TYPE",
}

export type AddShareActionType = {
    type: ACTIONS_TYPE.ADD_SHARE_TYPE
    payload: ShareType
}

export type ShareActionType = AddShareActionType