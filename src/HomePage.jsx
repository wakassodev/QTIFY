import React from 'react'
import { useOutletContext } from 'react-router-dom'
import Hero from '../src/components/Hero/Hero';
import Section from '../src/components/Section/Section';
import styles from './HomePage.module.css';
import  fetchFilters  from '../src/components/Filters/Filter';

function HomePage() {
    const {data} = useOutletContext();
    const {topAlbums, newAlbums, songs} = data;

  return (
    <div>
        <Hero />
        <div className={styles.wrapper}>
            <Section title="Top Albums" data={topAlbums} type='album' />
            <Section title="New Albums" data={newAlbums} type='album' />
            <Section 
              title="Songs" 
              data={songs} 
              filterSource={fetchFilters}
              type='song' 
            />
        </div>
    </div>
  )
}

export default HomePage ;