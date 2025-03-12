/* eslint-disable import/extensions */

'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Badge } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import styles from '@/styles/PostCard.module.css'; // Importing the CSS module
import { getArtists } from '../api/artistData';
import { getCategoryById } from '../api/categoryData.js';
import { deletePost } from '../api/postData';
import { useAuth } from '../utils/context/authContext';
import ArtModal from './artModal';

function PostCard({ postObj, onUpdate }) {
  const [artistData, setArtistData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);

  const deleteThisPost = () => {
    if (window.confirm(`Delete Post?`)) {
      deletePost(postObj.firebaseKey).then(() => onUpdate());
    }
  };

  const { user } = useAuth();

  useEffect(() => {
    getArtists(postObj.artistId).then((data) => setArtistData(data?.[0] || null));
  }, [postObj.artistId]);

  useEffect(() => {
    getCategoryById(postObj.categoryId)
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCategoryData(data[0]); // Take the first category object
        } else {
          setCategoryData(null);
        }
      })
      .catch(() => setCategoryData(null)); // Handle errors gracefully
  }, [postObj.categoryId]);

  return (
    <Card className={styles.postCard}>
      <Card.Img variant="top" src={postObj.art} className={styles.cardImage} />
      <Card.Body>
        {/* Artist Name as a Clickable Link */}
        {artistData ? (
          <Link href={`/profile/${artistData.firebaseKey}`} passHref>
            <Card.Title className={`${styles.cardTitle} ${styles.profileLink}`}>{artistData.displayName}</Card.Title>
          </Link>
        ) : (
          <Card.Title className={styles.cardTitle}>Loading...</Card.Title>
        )}

        <p className={styles.cardPrice}>${postObj.price}</p>
        <p>
          <Badge pill bg="dark" className={styles.badge}>
            {categoryData && categoryData.tagName ? categoryData.tagName : 'Loading...'}
          </Badge>
        </p>

        {/* Expand Image Button with Margin Fix */}
        <div className={styles.expandButton}>
          <ArtModal postObj={postObj} />
        </div>

        {user.uid === postObj.uid && (
          <>
            <Link href={`/profile/edit/${postObj.firebaseKey}`} passHref>
              <Button variant="info" className={styles.cardButton}>
                EDIT
              </Button>
            </Link>
            <Button variant="danger" onClick={deleteThisPost} className={`m-2 ${styles.cardButton}`}>
              DELETE
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape({
    art: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    artistId: PropTypes.string.isRequired,
    categoryId: PropTypes.string.isRequired,
    firebaseKey: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PostCard;
