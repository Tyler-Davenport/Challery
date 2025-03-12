import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Badge } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import styles from '@/styles/PostCard.module.css';
import { getArtists } from '../api/artistData';
import { getCategoryById } from '../api/categoryData';
import { deletePost } from '../api/postData';
import { useAuth } from '../utils/context/authContext';
import ArtModal from './artModal';

function PostCard({ postObj, onUpdate }) {
  const [artistData, setArtistData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    if (!postObj.artistId) return;
    getArtists(postObj.artistId)
      .then((data) => setArtistData(data?.[0] || null))
      .catch(() => setArtistData(null)); // Prevent errors from breaking UI
  }, [postObj.artistId]);

  useEffect(() => {
    if (!postObj.categoryId) return;
    getCategoryById(postObj.categoryId)
      .then((data) => setCategoryData(Array.isArray(data) && data.length > 0 ? data[0] : null))
      .catch(() => setCategoryData(null));
  }, [postObj.categoryId]);

  return (
    <Card className={styles.postCard}>
      <div className={styles.imageWrapper}>
        <Card.Img variant="top" src={postObj.art} className={styles.cardImage} alt="Artwork" />
        <span className={styles.watermark}>{artistData?.displayName || 'Watermark'}</span>
      </div>
      <Card.Body>
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
            {categoryData?.tagName || 'Loading...'}
          </Badge>
        </p>

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
            <Button variant="danger" onClick={() => deletePost(postObj.firebaseKey).then(onUpdate)} className={`m-2 ${styles.cardButton}`}>
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
