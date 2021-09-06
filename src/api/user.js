/*
 * @Author: your name
 * @Date: 2021-09-03 15:16:03
 * @LastEditTime: 2021-09-03 15:20:59
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \code\houtai\src\api\user.js
 */
import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
}

export function getInfo(token) {
    return request({
        url: '/user/info',
        method: 'get',
        params: { token }
    })
}

export function logout() {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}