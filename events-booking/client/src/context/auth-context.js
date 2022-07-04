import React from 'react'

export default React.createContext({
    userId: localStorage.getItem('token') || null,
    token: localStorage.getItem('token') || null,
    login: (userId, token, tokenExpiration) => {

    },
    logout: () => {

    }
})
