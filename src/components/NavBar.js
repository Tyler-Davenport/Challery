/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import Link from 'next/link';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import styles from '@/styles/NavBar.module.css'; // Correctly importing the CSS module
import { signOut } from '../utils/auth';

export default function NavBar() {
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
            <Link className={`nav-link ${styles.navLink}`} href="/profile">
              Profile
            </Link>
          </Nav>
          <Button variant="outline-light" onClick={signOut} className={styles.signOutButton}>
            Sign Out
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
