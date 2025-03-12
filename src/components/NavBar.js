/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import styles from '@/styles/NavBar.module.css';
import { useAuth } from '../utils/context/authContext';
import { getArtistByUid } from '../api/artistData';
import { signOut } from '../utils/auth';

export default function NavBar() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleProfileClick = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const artistData = await getArtistByUid(user?.uid);

      if (artistData && artistData.length > 0) {
        const artist = artistData[0];
        router.push(`/profile/${artist.firebaseKey}`);
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
      <Container>
        <Link passHref href="/" className={styles.navbarBrand}>
          Challery
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link className={`nav-link ${styles.navLink}`} href="/explore">
              Explore
            </Link>
            <Button variant="link" className={`nav-link ${styles.navLink}`} onClick={handleProfileClick} disabled={loading}>
              {loading ? 'Checking...' : 'Profile'}
            </Button>
          </Nav>
          <Button variant="outline-light" onClick={signOut} className={styles.signOutButton}>
            Sign Out
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
