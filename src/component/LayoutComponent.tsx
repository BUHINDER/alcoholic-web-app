import React from "react"
import {Outlet} from "react-router-dom";

const LayoutComponent = () => {
    return (
        <>
            <div className={""}>
                <header className={""}>
                    <button>Logout</button>
                </header>
            </div>
            <div className={""}>
                <Outlet/>
            </div>
            <footer className={""}>
                <div>Buhinder 2022</div>
            </footer>
        </>
    )
}

export default LayoutComponent;
