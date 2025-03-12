/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import styles from '@/styles/ArtModal.module.css';
import { getArtists } from '../api/artistData';

function ArtModal({ postObj }) {
  const [show, setShow] = useState(false);
  const [artistData, setArtistData] = useState(null);
  const [watermarkedImage, setWatermarkedImage] = useState(postObj.art);
  const [watermarkFailed, setWatermarkFailed] = useState(false);

  useEffect(() => {
    if (!postObj.artistId) return;
    getArtists(postObj.artistId)
      .then((data) => setArtistData(data?.[0] || null))
      .catch(() => setArtistData(null));
  }, [postObj.artistId]);

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
    <>
      <Button variant="light" className="ButtonForModal" onClick={() => setShow(true)}>
        Expand Image
      </Button>

      <Modal show={show} onHide={() => setShow(false)} centered size="xl">
        <Modal.Header closeButton className={styles.modalHeader} />

        <Modal.Body className={styles.modalBody}>
          <h5 className={styles.modalTitle}>Details</h5>
          <hr className={styles.modalDivider} />

          <div className={watermarkFailed ? styles.imageWrapper : ''}>
            <img src={watermarkedImage} alt="Artwork" className={`${styles.modalImage} ${watermarkFailed ? styles.watermarkFallback : ''}`} />
            {watermarkFailed && <span className={styles.watermarkText}>{artistData?.displayName || 'Watermark'}</span>}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

ArtModal.propTypes = {
  postObj: PropTypes.shape({
    art: PropTypes.string,
    artistId: PropTypes.string,
    categoryId: PropTypes.string,
    firebaseKey: PropTypes.string,
    price: PropTypes.number,
    uid: PropTypes.string,
  }),
};

export default ArtModal;
