import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'

const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '35vh'
}

export class MapContainer extends Component {
    render() {
        return (
            <Map google={this.props.google} containerStyle={containerStyle} initialCenter={{ lat: this.props.lat, lng: this.props.long }} zoom={14}>
                <Marker onClick={this.onMarkerClick} name={this.props.name} />
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyBKxcJbKynTNBymZxV0a9419ytHGHoysow"
})(MapContainer)