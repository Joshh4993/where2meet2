import Link from 'next/link'
import Layout from '../../layouts/Layout'
import styles from '../../styles/Meetup.module.css'
import MapContainer from '../../components/MapContainer'
import { useRouter } from 'next/router'

function MeetPage(props) {
  return (
    <Layout>
      <div className={styles.meetups}>
        {props.meet && (
          <>
            <div key={props.meet._id} className={styles.card}>
              <h3 className={styles.gridTitle}>{props.meet.name}</h3>
              <h4 className={styles.gridLocLat}>Lat: {props.meet.lat}</h4>
              <h4 className={styles.gridLocLong}>Long: {props.meet.long}</h4>
              <p className={styles.detailsLs}>{props.meet.description}</p>
            </div>
            <div className={styles.card}>
              <div className={styles.gridMap}>
                <MapContainer lat={props.meet.lat} long={props.meet.long} name={props.meet.name} />
              </div>
              <a className={styles.gridDirectionsButton} href={`#`}>Get Directions</a>
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { mid } = context.params
  const res = await fetch({
    "rejectUnauthorized": false,
    "url": `https://api.where2meet.uk/meets/${mid}`,
    "method": "GET"
  });
  const meet = await res.json()
  return { props: { meet } }
}

export default MeetPage