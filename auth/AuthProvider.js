import React, {createContext, useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import Router from 'next/router'

export const AuthContext = createContext()

function AuthProvider({children, userData})  {
    const [user, setUser] = useState(userData)

    useEffect(() => {

        const syncLogout = e => {
            if (e.key === 'logout') {
                setUser(null)
                Router.push('/products')
            }
        }
        window.addEventListener('storage', syncLogout)

        return ()  => {
            window.removeEventListener('storage', syncLogout)
            window.localStorage.removeItem('logout')
        }
    }, [])
        

    const setAuthUser = userInfo => setUser(userInfo)

    const signout = () => {
        Cookies.remove('token')

        setUser(null)
        localStorage.setItem('logout', Date.now())
        Router.push('./products')
    }

    return (
        <AuthContext.Provider value={{user, setAuthUser, signout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
