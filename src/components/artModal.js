/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';

function ArtModal({ postObj }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Info Button */}
      <Button variant="light" className="ButtonForModal" onClick={handleShow}>
        Info
      </Button>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered size="xl">
        <Modal.Header
          closeButton
          style={{
            backgroundColor: '#f8f9fa',
            color: '#333',
            borderBottom: '1px solid #ccc',
          }}
        />

        <Modal.Body style={{ backgroundColor: '#ffffff', color: '#555', borderRadius: '20px' }}>
          <h5 style={{ fontWeight: 'bold', color: '#222' }}>Details</h5>
          <hr style={{ borderColor: '#ddd' }} />

          {postObj.art ? <img src={postObj.art} alt="Artwork" style={{ width: '100%', borderRadius: '8px' }} /> : <p>No image available</p>}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ArtModal;

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
