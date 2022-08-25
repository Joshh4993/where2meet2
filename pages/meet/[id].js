import Link from 'next/link'
import { useEffect } from 'react'
import Layout from '../../layouts/Layout'
import styles from '../../styles/Meetup.module.css'
import MapContainer from '../../components/MapContainer'

export default function Home(props) {
  let meet
  useEffect(() => {
    const res = await fetch(
      `http://api.where2meet.uk/meets/${id}`
    );
    meet = await res.json()
  })


  return (
    <Layout>
      <div className={styles.meetups}>
        {meet && (
          <>
            <div key={meet._id} className={styles.card}>
              <h3 className={styles.gridTitle}>{meet.name}</h3>
              <h4 className={styles.gridLocLat}>Lat: {meet.lat}</h4>
              <h4 className={styles.gridLocLong}>Long: {meet.long}</h4>
              <p className={styles.detailsLs}>{meet.description}</p>
            </div>
            <div className={styles.card}>
              <div className={styles.gridMap}>
                <MapContainer lat={meet.lat} long={meet.long} name={meet.name} />
              </div>
              <a className={styles.gridDirectionsButton} href={`#`}>Get Directions</a>
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}