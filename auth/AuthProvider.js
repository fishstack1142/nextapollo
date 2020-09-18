import React, {createContext, useState} from 'react'

export const AuthContext = createContext()

function AuthProvider({children}) {

    const [user, setUser] = useState(null)

    const setAuthUser = userInfo => setUser(userInfo)

    return (
        <AuthContext.Provider value={{user, setAuthUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
