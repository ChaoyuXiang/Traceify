import React, { Component, forwardRef } from "react";
import { GoogleMap, LoadScript, useLoadScript } from "@react-google-maps/api";

const API_KEY = `${process.env.REACT_APP_GOOGLE_API_KEY}`;
// const API_KEY = 123456;

const googlemapsLibraries = ["drawing", "visualization"]; // whatever google libraries you need
export function withGoogleMaps(Component) {
    // eslint-disable-next-line react/display-name
    return forwardRef((props, ref) => {
        const { isLoaded } = useLoadScript({
            googleMapsApiKey: API_KEY,
            libraries: googlemapsLibraries,
        });
        if (isLoaded) {
            return <Component {...props} ref={ref} />;
        }
        return <div>Map loading</div>;
    });
}