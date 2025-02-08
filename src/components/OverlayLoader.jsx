import React from "react";
import {CircularProgress} from "@mui/material";
import "../assets/styles/components/overlayLoader.scss";

const OverlayLoader = ({loading, size = 50, color = "primary"}) => {
    return (
        <div className={`overlay-loader ${loading ? "" : "hidden"}`}>
            <CircularProgress size={size} color={color}/>
        </div>
    );
};

export default OverlayLoader;
