import Link from 'next/link'
import { useEffect } from 'react'
import Layout from '../../layouts/Layout'
import styles from '../../styles/Meetup.module.css'
import MapContainer from '../../components/MapContainer'
import { useRouter } from 'next/router'

export default function Home(props) {
  let meet
  const router = useRouter()
  const { mid } = await router.query().then(() => {
    useEffect(async () => {
      const res = await fetch(
        `https://api.where2meet.uk/meets/${mid}`
      );
      meet = await res.json()
    }, [])
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