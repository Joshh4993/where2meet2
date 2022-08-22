import React, { SyntheticEvent, useState, useEffect } from 'react'
import Layout from '../../layouts/Layout'
import Router, { useRouter } from 'next/router'
import styles from '../../styles/Meetup.module.css'
import MapContainerCreation from '../../components/MapContainerCreation'
const axios = require("axios")

const Register = () => {
    const [GPSLat, setGPSLat] = useState(null)
    const [GPSLong, setGPSLong] = useState(null)
    const [status, setStatus] = useState(null)
    const [locSet, setLocSet] = useState(false)

    const [name, setName] = useState('')
    const [lat, setLat] = useState('')
    const [long, setLong] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = {
            name,
            description,
            lat,
            long
        }
        const JSONdata = JSON.stringify(data)
        const endpoint = 'http://api.where2meet.uk/meets/create'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSONdata
        }
        const response = await fetch(endpoint, options)
        const resdata = await response.json()
        Router.push(`https://where2meet.uk/meet/${resdata._id}`)
    }

    const handleGoogleMapClick = (obj) => {
        if (!obj) return
        let latitude = obj.maplat.toString()
        let longitude = obj.maplong.toString()
        setLat(latitude)
        setLong(longitude)
        setLocSet(true)
    }

    const getGPSLocation = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        console.log(res.data)
        setStatus(null)
        setGPSLat(res.data.latitude)
        setGPSLong(res.data.longitude)
        // if (!navigator.geolocation) {
        //     setStatus('Geolocation not supported by your browser.')
        // } else {
        //     setStatus('Locating..')
        //     navigator.geolocation.getCurrentPosition((position) => {
        //         setStatus(null)
        //         setGPSLat(position.coords.latitude)
        //         setGPSLong(position.coords.longitude)
        //     }, () => {
        //         setStatus('Unable to retrieve GPS location.')
        //     })
        // }
    }

    return (
        <Layout>
            {!locSet && (
                <div className={styles.meetups}>
                    <div className={styles.card}>
                        <button onClick={getGPSLocation} className={styles.gridButtonC}>Recentre Map</button>
                        <p className={styles.gridTitle}>{status}</p>
                        {GPSLat && GPSLong && (
                            <MapContainerCreation lat={GPSLat} long={GPSLong} onMapLocationClick={handleGoogleMapClick} />
                        )}
                        {GPSLat && <p className={styles.gridLocation}>GPS Latitude: {GPSLat}</p>}
                        {GPSLong && <p className={styles.gridDetailsLs}>GPS Longitude: {GPSLong}</p>}
                    </div>
                </div>
            )}
            {locSet && (
                <form onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal">Create a Meet</h1>
                    <input type="text" className="form-control" placeholder="Meet Name" required
                        onChange={e => setName(e.target.value)}
                    />
                    <input type="text" className="form-control" placeholder="Latitude" value={lat} required
                        onChange={e => setLat(e.target.value)}
                    />
                    <input type="text" className="form-control" placeholder="Longitude" value={long} required
                        onChange={e => setLong(e.target.value)}
                    />
                    <textarea rows={6} cols={60} className="form-control" placeholder="Group description" required
                        onChange={e => setDescription(e.target.value)}
                    />
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Create Meet</button>
                </form>
            )}
        </Layout>
    )
}

export default Register