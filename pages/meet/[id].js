import Link from 'next/link'
import Layout from '../../layouts/Layout'
import styles from '../../styles/Meetup.module.css'
import MapContainer from '../../components/MapContainer'

export default function Home(props) {
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
  const { id } = context.query
  const res = await fetch(
    `http://api.where2meet.uk/meets/${id}`
  );
  const meet = await res.json();
  return {
    props: {
      meet,
    }
  }
}