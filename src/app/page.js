'use client';

import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Row, Col, Carousel, Spinner } from 'react-bootstrap';
import Link from 'next/link';
import styles from '@/styles/LandingPage.module.css';
import Image from 'next/image';
import { getAllArtists, getRecentArtists } from '../api/artistData';

export default function LandingPage() {
  const [allArtists, setAllArtists] = useState([]); // State for all artists
  const [recentArtists, setRecentArtists] = useState([]); // State for recent artists
  const [loadingAll, setLoadingAll] = useState(true);
  const [loadingRecent, setLoadingRecent] = useState(true);

  // Fetch ALL artists
  useEffect(() => {
    getAllArtists()
      .then((data) => {
        if (data && Array.isArray(data)) {
          setAllArtists(data);
        }
        setLoadingAll(false);
      })
      .catch((error) => {
        console.error('Error fetching all artists:', error);
        setLoadingAll(false);
      });
  }, []);

  // Fetch RECENT artists
  useEffect(() => {
    getRecentArtists()
      .then((data) => {
        if (data && Array.isArray(data)) {
          setRecentArtists(data);
        }
        setLoadingRecent(false);
      })
      .catch((error) => {
        console.error('Error fetching recent artists:', error);
        setLoadingRecent(false);
      });
  }, []);

  // Handle Recent Artists Section
  let recentArtistsContent;
  if (loadingRecent) {
    recentArtistsContent = (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  } else if (recentArtists.length === 0) {
    recentArtistsContent = <p>No recent artists found.</p>;
  } else {
    recentArtistsContent = (
      <Carousel indicators={false} interval={3000} className={styles.carousel}>
        {recentArtists.slice(0, 3).map((artist) => (
          <Carousel.Item key={artist.firebaseKey}>
            <Card className={styles.recentArtistCard}>
              <Row className="g-0">
                <Col md={4} className={styles.welcomeSection}>
                  <p className={styles.welcomeMessage}>
                    🎉 Welcome <strong>{artist.displayName}</strong> to Challery! Your creativity makes this space even more special.
                  </p>
                </Col>
                <Col md={8}>
                  <Card.Body>
                    <Card.Img variant="top" src={artist.profileImage || artist.pfp || '/images/default-avatar.png'} alt={artist.displayName} className={styles.artistImage} />
                    <Card.Title>{artist.displayName}</Card.Title>
                    <Link href={`/profile/${artist.firebaseKey}`} passHref>
                      <Button variant="dark">View Profile</Button>
                    </Link>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Carousel.Item>
        ))}
      </Carousel>
    );
  }

  // Handle All Artists Section
  let allArtistsContent;
  if (loadingAll) {
    allArtistsContent = (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  } else if (allArtists.length === 0) {
    allArtistsContent = <p>No artists found.</p>;
  } else {
    allArtistsContent = (
      <Row>
        {allArtists.map((artist) => (
          <Col key={artist.firebaseKey} md={6}>
            <Card className={styles.allArtistCard}>
              <Row className="g-0">
                <Col md={4} className={styles.welcomeSection}>
                  <p className={styles.welcomeMessage}>
                    🎉 Thank You <strong>{artist.displayName}</strong> for being the best part of Challery! Click view profile to see more about this artist!
                  </p>
                </Col>
                <Col md={8}>
                  <Card.Body>
                    <Card.Img variant="top" src={artist.profileImage || artist.pfp || '/images/default-avatar.png'} alt={artist.displayName} className={styles.artistImage} />
                    <Card.Title>{artist.displayName}</Card.Title>
                    <Card.Text className={styles.artistBio}>{artist.bio ? `${artist.bio.substring(0, 100)}...` : 'No bio available.'}</Card.Text>
                    <Link href={`/profile/${artist.firebaseKey}`} passHref>
                      <Button variant="dark">View Profile</Button>
                    </Link>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    );
  }

  return (
    <Container fluid className={styles.landingContainer}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <Image
          src="/images/favicon.ico"
          alt="Challery Logo"
          className={styles.logo}
          width={500} // Specify a width
          height={500} // Specify a height
        />
        <h1 className={styles.heroTitle}>Welcome to Challery</h1>
        <p className={styles.heroSubtitle}>Discover and showcase stunning digital art</p>
        <Link href="/explore" passHref>
          <Button className={styles.ctaButton}>Explore Art</Button>
        </Link>
      </div>

      {/* Recent Artists Section */}
      <section className={styles.recentArtistsSection}>
        <div className={styles.recentArtistsContainer}>
          <h2 className={styles.sectionTitle}>Recent Artists</h2>
          {recentArtistsContent}
        </div>
      </section>

      {/* All Artists Section */}
      <section className={styles.allArtistsSection}>
        <h2 className={styles.sectionTitle}>All Artists</h2>
        {allArtistsContent}
      </section>
    </Container>
  );
}
