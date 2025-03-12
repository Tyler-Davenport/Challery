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

  useEffect(() => {
    if (!postObj.artistId) return;
    getArtists(postObj.artistId)
      .then((data) => setArtistData(data?.[0] || null))
      .catch(() => setArtistData(null));
  }, [postObj.artistId]);

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

          <div className={styles.imageWrapper}>
            <img src={postObj.art} alt="Artwork" className={styles.modalImage} />
            <span className={styles.watermarkText}>{artistData?.displayName || 'Watermark'}</span>
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
