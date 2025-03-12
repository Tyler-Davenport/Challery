/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar, Container, Button, Tab, Tabs } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from '@/styles/NavBar.module.css';
import { useAuth } from '../utils/context/authContext';
import { getArtistByUid } from '../api/artistData';
import { signOut } from '../utils/auth';

export default function NavBar() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(null); // Default is null (no tab highlighted)

  const handleProfileClick = async () => {
    setLoading(true);
    try {
      const artistData = await getArtistByUid(user?.uid);
      if (artistData && artistData.length > 0) {
        router.push(`/profile/${artistData[0].firebaseKey}`);
      } else {
        router.push('/profile/newprofile');
      }
    } catch (error) {
      console.error('Error checking artist profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" className={styles.navbar}>
      <Container style={{ display: 'flex', alignItems: 'center' }}>
        {/* Brand (Logo + "Challery" Text) */}
        <Link
          passHref
          href="/"
          className={styles.navbarBrand}
          style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }} // Reduce space between brand and tabs
          onClick={() => setActiveTab(null)} // Reset active tab when clicking "Challery"
        >
          <Image src="/images/favicon.ico" alt="Challery Logo" width={100} height={100} style={{ marginRight: '8px' }} />
          <span className={styles.brandText}>Challery</span>
        </Link>

        {/* Navigation Tabs - Moved Closer to Challery */}
        <Tabs
          activeKey={activeTab}
          onSelect={(key) => {
            setActiveTab(key);
            if (key === 'explore') router.push('/explore');
            if (key === 'profile') handleProfileClick();
          }}
          style={{
            borderBottom: 'none', // Remove tab underline
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Tab eventKey="explore" title={<span style={{ fontSize: '20px', padding: '10px 25px', minWidth: '160px' }}>Explore</span>} />
          <Tab eventKey="profile" title={<span style={{ fontSize: '20px', padding: '10px 25px', minWidth: '160px' }}>{loading ? 'Checking...' : 'Profile'}</span>} />
        </Tabs>

        {/* Sign Out Button - Aligned Right */}
        <div style={{ marginLeft: 'auto' }}>
          <Button variant="outline-light" onClick={signOut} className={styles.signOutButton}>
            Sign Out
          </Button>
        </div>
      </Container>
    </Navbar>
  );
}
