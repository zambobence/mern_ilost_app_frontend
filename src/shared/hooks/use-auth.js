import React, {useEffect, useCallback, useState} from 'react'

export default function useAuth() {
    const [token , setToken] = useState(null)
    const [userId, setUserId] = useState(null)

    const login = useCallback((uid, token) => {
        setToken(token)
        setUserId(uid)
        localStorage.setItem(
            'authUser',
            JSON.stringify({
                userId: uid,
                token: token
        }))
    }
    , [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem('authUser')
    }, [])


    useEffect(() => {
        let storedUser
        storedUser = JSON.parse(localStorage.getItem('authUser'))
        if(storedUser && storedUser.token){
            login(storedUser.userId, storedUser.token)
        }
    }, [login])

  return {token, login, logout, userId}

}
