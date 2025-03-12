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
  const [watermarkedImage, setWatermarkedImage] = useState(postObj.art);
  const [watermarkFailed, setWatermarkFailed] = useState(false);

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

  useEffect(() => {
    const addWatermark = async () => {
      if (!postObj.art || !artistData?.displayName) return;

      try {
        const response = await fetch(postObj.art, { mode: 'cors' });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const blob = await response.blob();
        const imgURL = URL.createObjectURL(blob);

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.src = imgURL;
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);

          // Watermark settings
          ctx.font = `${img.width / 15}px Arial`;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(artistData.displayName, img.width / 2, img.height / 2);

          setWatermarkedImage(canvas.toDataURL('image/png'));
        };

        img.onerror = () => setWatermarkFailed(true);
      } catch {
        setWatermarkFailed(true);
      }
    };

    addWatermark();
  }, [postObj.art, artistData]);

  return (
    <Card className={styles.postCard}>
      <div className={watermarkFailed ? styles.imageWrapper : ''}>
        <Card.Img variant="top" src={watermarkedImage} className={`${styles.cardImage} ${watermarkFailed ? styles.watermarkFallback : ''}`} alt="Artwork" />
        {watermarkFailed && <span className={styles.watermarkText}>{artistData?.displayName || 'Watermark'}</span>}
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
