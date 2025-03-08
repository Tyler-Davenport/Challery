/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Card } from 'react-bootstrap';
import styles from '@/styles/MyPostsPage.module.css'; // Import your custom CSS
import { getUserPosts } from '../../api/postData';
import { getSingleArtistByUid } from '../../api/artistData';
import { useAuth } from '../../utils/context/authContext';
import PostCard from '../../components/PostCard';

export default function MyPostsPage() {
  const [userPosts, setUserPosts] = useState([]);
  const [artist, setArtist] = useState(null);
  const { user } = useAuth();

  const getMyCreatedPosts = () => {
    getUserPosts(user.uid).then(setUserPosts);
  };

  const getArtistDetails = () => {
    getSingleArtistByUid(user.uid).then(setArtist);
  };

  useEffect(() => {
    getMyCreatedPosts();
    getArtistDetails();
  }, [user]);

  return (
    <div className={`container ${styles.pageContainer}`}>
      <Card className={`p-4 shadow-lg mb-4 ${styles.profileCard}`}>
        <div className="d-flex align-items-start">
          {/* Profile Image */}
          <img src={artist?.pfp || '/default-profile.png'} alt="Profile" className={`rounded-circle me-4 ${styles.profileImage}`} />

          {/* Bio and Details */}
          <div className="flex-grow-1">
            <h2 className={styles.artistName}>{artist?.displayName || 'Artist Name'}</h2>
            <p className="text-muted">{artist?.contact || 'No contact info provided'}</p>
            <p>{artist?.bio || 'This artist has not added a bio yet.'}</p>
            <p>{artist?.payment || 'This artist has not selected payment'}</p>
          </div>
        </div>
      </Card>

      <div className="text-center my-4">
        <Link href="/profile/new" passHref>
          <Button className={styles.addPostButton}>Add A Post</Button>
        </Link>
        <h1 className={styles.createdPostsHeading}>Created Posts</h1>
        <div className="d-flex flex-wrap">
          {userPosts.map((post) => (
            <PostCard key={post.firebaseKey} postObj={post} onUpdate={getMyCreatedPosts} />
          ))}
        </div>
      </div>
    </div>
  );
}
