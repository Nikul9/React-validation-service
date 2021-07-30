/* eslint-disable no-unused-vars */
import axios, * as others from 'axios';

export const loginService = (tempObj)  => {
    return new Promise( async (resolve,reject) => {
        try{
            const response = await axios.post(`/login`,tempObj)
            if(response) {
                resolve(response)
            } else {
                reject({error : "There is some Problem"})
            }
        }catch(error)  {
            reject(error)
        }
    })
}

export const regiesterService = (tempObj) => {
    return new Promise( async (resolve , reject) => {
        try{
            const response = await axios.post(`/regiester`,tempObj)
            if(response) {
                resolve(response)
            } else {
                reject({error : "There is some Problem"})
            }
        }catch(error)  {
            reject(error)
        }
    })
} 

export const findOneUserService = (id) => {
    return new Promise( async (resolve , reject) => {
        try{
            const response = await axios.get(`/findOneUserService/${id}`)
            if(response) {
                resolve(response)
            } else {
                reject({error : "There is some Problem"})
            }
        }catch(error)  {
            reject(error)
        }
    })
} 
export const updateUserService = (id,user) => {
    return new Promise( async (resolve , reject) => {
        try{
            const response = await axios.patch(`/update/${id}`,{user})
            if(response) {
                resolve(response)
            } else {
                reject({error : "There is some Problem"})
            }
        }catch(error)  {
            reject(error)
        }
    })
}