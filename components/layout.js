import React from 'react'
import Nav from './nav'
import Head from 'next/head'

function PageLayout({children}) {
    return (
        <div>
            <Head>
                <title>MAMA</title>
            </Head>
            <Nav />

            {children}
        </div>
    )
}

export default PageLayout
