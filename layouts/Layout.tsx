import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import w2mLogo from '../public/w2mLogo.png';
import { useRouter } from "next/router";

const Layout = (props) => {
    const router = useRouter()
    const newMeet = async () => {
        router.push('/meet/create')
    }

    let menu;
    let navlink;

    navlink = (
        <Link href="/">
            <a><Image src={w2mLogo} height="45px" width="100px" /></a>
        </Link>
    )
    menu = (
        <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
                <a href="#" className="nav-link active" onClick={newMeet}>Create a Meet</a>
            </li>
        </ul>
    )
    return (
        <>
            <Head>
                <link rel="apple-touch-icon" sizes="180x180" href="/image/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="//imagefavicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/image/favicon-16x16.png" />
                <link rel="manifest" href="/image/site.webmanifest" />
                <link rel="mask-icon" href="/image/safari-pinned-tab.svg" color="#5bbad5" />
                <meta name="msapplication-TileColor" content="#2b5797" />
                <meta name="theme-color" content="#beb8b8" />
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous" />
            </Head>
            <div className="d-flex flex-column min-vh-100">
                <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
                    <div className="container-fluid">
                        {navlink}
                        <div>
                            {menu}
                        </div>
                    </div>
                </nav>

                <main className="flex-fill form-signin">
                    {props.children}
                </main>

                <nav className="navbar navbar-default navbar-fixed-bottom">
                    <div className="container">
                        <span className="text-muted navbar-text">&copy; Where2Meet UK, 2022</span>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Layout