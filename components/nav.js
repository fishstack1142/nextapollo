import React from 'react'
import Link from 'next/link'

const liStyle = { listStyle: "none" }

function Nav() {
    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '40px',
            backgroundColor: '#FFB6C1',
            
            
        }}>
            <ul
            style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: '70%'
            }}
            >
                <li style={liStyle}>
                    <Link href="/">
                    <a style={{
                        textDecoration: 'none',
                        color: "#F0F8FF"
                    }}>Home</a>
                    </Link>
                </li>
                <li style={liStyle}>
                    <Link href="/products">
                        <a style={{
                            textDecoration: 'none',
                            color: "#F0F8FF"
                        }}>
                        Products</a>
                    </Link>
                </li>
                <li style={liStyle}>
                    <Link href="/cart">
                    <a style={{
                        textDecoration: 'none',
                        color: "#F0F8FF"
                    }}>Cart</a>
                    </Link>
                </li>
                <li style={liStyle}>
                    <Link href="/signin">
                    <a style={{
                        textDecoration: 'none',
                        color: "#F0F8FF"
                    }}>Sign in</a>
                    </Link>
                </li>
                <li style={liStyle}>
                    <Link href="/signup">
                    <a style={{
                        textDecoration: 'none',
                        color: "#F0F8FF"
                    }}>Sign up</a>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav
