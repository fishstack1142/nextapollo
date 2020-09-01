import React from 'react'
import Link from 'next/link'

function Nav() {
    return (
        <nav>
            <ul>
                <li>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </li>
                <li>
                    <Link href="/products">
                        <a>Products</a>
                    </Link>
                </li>
                <li>
                    <Link href="/cart">
                        <a>Cart</a>
                    </Link>
                </li>
                <li>
                    <Link href="/signin">
                        <a>Sign in</a>
                    </Link>
                </li>
                <li>
                    <Link href="/signup">
                        <a>Sign up</a>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav
