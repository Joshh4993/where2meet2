import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'

const containerStyle = {
    position: 'relative',
    width: '50vw',
    height: '35vh'
}

export class MapContainerCreation extends Component {
    render() {
        return (
            <Map google={this.props.google} containerStyle={containerStyle} initialCenter={{ lat: this.props.lat, lng: this.props.long }} zoom={14}
                onClick={(mapProps, map, clickEvent) => {
                    const data = clickEvent.latLng.toJSON()
                    console.log(data)
                    const obj = {
                        maplat: data.lat,
                        maplong: data.lng
                    }
                    this.props.onMapLocationClick(obj)
                }

                }
            >

            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyBKxcJbKynTNBymZxV0a9419ytHGHoysow"
})(MapContainerCreation)