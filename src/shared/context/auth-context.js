import React from 'react'

const AuthCtx = React.createContext({
        isLoggedIn: false,
        token: null,
        login: () => {},
        logout: () => {},
        uid: null
})

export default AuthCtx
