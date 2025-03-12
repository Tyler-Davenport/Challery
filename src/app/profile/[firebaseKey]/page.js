/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */

'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button, Card } from 'react-bootstrap';
import PostCard from '@/components/PostCard';
import styles from '@/styles/MyPostsPage.module.css';
import PropTypes from 'prop-types'; // Import PropTypes
import { getUserPosts } from '../../../api/postData';
import { getSingleArtist } from '../../../api/artistData';
import { useAuth } from '../../../utils/context/authContext';

export default function ProfilePage() {
  const { firebaseKey } = useParams(); // Get firebaseKey from URL params
  const router = useRouter();
  const [artist, setArtist] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth(); // Get the logged-in user from the auth context

  useEffect(() => {
    if (firebaseKey) {
      setLoading(true);
      // Fetch artist data using the firebaseKey
      getSingleArtist(firebaseKey)
        .then((artistData) => {
          if (artistData) {
            setArtist(artistData);
            // Fetch user posts for the artist
            getUserPosts(artistData.uid).then(setUserPosts);
          }
        })
        .catch((error) => console.error('Error fetching artist:', error))
        .finally(() => setLoading(false));
    }
  }, [firebaseKey]);

  if (loading) return <p>Loading profile...</p>;
  if (!artist) return <p>Artist not found.</p>;

  // Check if currentUser exists and has the same uid as artist's uid
  const isOwnProfile = user.uid === artist.uid;

  return (
    <div className={`container ${styles.pageContainer}`}>
      {/* Profile Card */}
      <Card className={`p-4 shadow-lg mb-4 d-flex flex-row align-items-start justify-content-between ${styles.profileCard}`}>
        <div className="d-flex align-items-start">
          <img src={artist.pfp || '/default-profile.png'} alt="Profile" className={`rounded-circle me-4 ${styles.profileImage}`} />
          <div className="flex-grow-1">
            <h2 className={styles.artistName}>{artist.displayName || 'Artist Name'}</h2>
            <p className="text-muted">{artist.contact || 'No contact info provided'}</p>
            <p>{artist.bio || 'This artist has not added a bio yet.'}</p>
            <p>${artist.payment || 'This artist has not selected payment'}</p>

            {/* Display Commission Status Under Payment */}
            <p>Commissions: {artist.commission ? 'Open for commissions! Just email me with the email above!' : 'Closed for commissions right now, Sorry!'}</p>
          </div>
        </div>

        {/* Conditionally render Edit Profile button */}
        {isOwnProfile && (
          <div className="d-flex flex-column">
            <Link href={`/profile/editprofile/${artist.firebaseKey}`} passHref>
              <Button className={`${styles.cardButton} ${styles.editProfileButton}`} variant="info">
                Edit Profile
              </Button>
            </Link>
          </div>
        )}
      </Card>

      {/* Add Post button moved outside the profile card */}
      {isOwnProfile && (
        <div className="d-flex justify-content-center mt-4">
          <Button className={`${styles.cardButton} ${styles.addPostButton}`} variant="primary" onClick={() => router.push('/profile/new')}>
            Add Post
          </Button>
        </div>
      )}

      {/* Display Artist's Posts */}
      <div className="text-center my-4">
        <h1 className={styles.artistName}>{artist.displayName}'s Gallery</h1>
        <div className="d-flex flex-wrap">{userPosts.length > 0 ? userPosts.map((post) => <PostCard key={post.firebaseKey} postObj={post} onUpdate={() => getUserPosts(artist.uid).then(setUserPosts)} />) : <p>No posts available.</p>}</div>
      </div>
    </div>
  );
}

// Add prop validation
ProfilePage.propTypes = {
  currentUser: PropTypes.shape({
    bio: PropTypes.string,
    contact: PropTypes.string,
    displayName: PropTypes.string,
    firebaseKey: PropTypes.string,
    payment: PropTypes.string,
    pfp: PropTypes.string,
    uid: PropTypes.string.isRequired, // Ensure currentUser has a valid uid
  }).isRequired,
};
