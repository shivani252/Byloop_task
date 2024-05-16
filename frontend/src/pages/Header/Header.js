import React from "react";
import "./Header.css";
import { LogoImage } from "../../assest/images";
export const Header = ({ handleLogout, userName }) => {
    return <>
        <div className="header-outer">
            <div className="header-inner">
                <div className="logo-section">
                    <img src={LogoImage} alt="Logo" className="logo-img img-fluid" />
                </div>
                <div className="action-section">
                    <div className="user-name">
                        {userName || <>Demo User</>}
                    </div>
                    <div className="log-out" onClick={handleLogout}>
                        Log Out
                    </div>
                </div>
            </div>
        </div>
    </>
}