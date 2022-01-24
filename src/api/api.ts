/*Mock Requests*/

import { ShareType } from "../brms/share-reducer.types"

/*
url: .../login
method: POST
body: {login: string, password: string}

response: status, token, message
*/

export function loginUser(login: string, password: string) {
    return new Promise<{status: number, token: string}>((resolve, reject) => {
        setTimeout((token) => {
            resolve(token)
        }, 1000, {status: 200, token: login+password})
    })
        .then(res => ({token: res.token, message: 'You are authorized. Welcome!'}))
        .catch(err => ({token: '', message: 'You are not authorized. The data is not correct!'}))
}

/*
url: .../share
method: POST
body: { id: string, currency: "USD" | "EUR" | "RUB"
        shareName: string, shareDescription: string
        type: "percent" | "sum", value: number }

response: status, message
*/

export function addShareAPI(shareData: ShareType) {
    return new Promise<typeof shareData>((resolve, reject) => {
        setTimeout((res) => {
            resolve(res.share)
        }, 1000, {status: 200, share: shareData})
    })
        .then((res) => ({shareData: res, message: 'Share created!'}))
        .catch(err => ({message: 'Share not created'}))
}



