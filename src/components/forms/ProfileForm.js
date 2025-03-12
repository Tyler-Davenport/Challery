'use client';

import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import styles from '@/styles/ProfileForm.module.css'; // Import the CSS module
import { useAuth } from '../../utils/context/authContext';
import { createArtist, updateArtist } from '../../api/artistData';

const initialState = {
  bio: '',
  contact: '',
  displayName: '',
  payment: '',
  pfp: '',
};

function ProfileForm({ obj = {} }) {
  const [formInput, setFormInput] = useState(initialState);
  const [validated, setValidated] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj?.firebaseKey) {
      setFormInput((prevState) => ({
        ...prevState,
        ...obj,
      }));
    }
  }, [obj]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);

    if (formInput?.firebaseKey) {
      updateArtist(formInput).then(() => router.push(`/profile/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createArtist(payload).then(({ name }) => {
        const patchPayload = { ...payload, firebaseKey: name };
        updateArtist(patchPayload).then(() => router.push(`/profile/${obj.firebaseKey}`));
      });
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.formTitle}>{obj?.firebaseKey ? 'Update' : 'Create'} Profile</h2>

      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>Challery Username</Form.Label>
          <Form.Control required type="text" className={styles.inputField} placeholder="Display Name" value={formInput.displayName} onChange={(e) => setFormInput({ ...formInput, displayName: e.target.value })} />
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Profile Picture URL</Form.Label>
          <Form.Control type="text" className={styles.inputField} placeholder="Enter Image URL" required value={formInput.pfp} onChange={(e) => setFormInput({ ...formInput, pfp: e.target.value })} />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>Preffered Email To Be Contacted By</Form.Label>
          <Form.Control type="email" className={styles.inputField} placeholder="Email" required value={formInput.contact} onChange={(e) => setFormInput({ ...formInput, contact: e.target.value })} />
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="validationCustom04">
          <Form.Label>Cashapp Handle</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text className={styles.inputGroupText}>$</InputGroup.Text>
            <Form.Control type="text" className={styles.paymentInput} placeholder="Cashapp ($ is included)" required value={formInput.payment} onChange={(e) => setFormInput({ ...formInput, payment: e.target.value })} />
          </InputGroup>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="validationCustom05">
        <Form.Label>Bio</Form.Label>
        <Form.Control as="textarea" rows={3} className={styles.inputField} placeholder="Tell us about yourself" required value={formInput.bio} onChange={(e) => setFormInput({ ...formInput, bio: e.target.value })} />
      </Form.Group>

      <Button type="submit" className={styles.submitButton}>
        Submit Form
      </Button>
    </Form>
  );
}

ProfileForm.propTypes = {
  obj: PropTypes.shape({
    bio: PropTypes.string,
    contact: PropTypes.string,
    displayName: PropTypes.string,
    firebaseKey: PropTypes.string,
    payment: PropTypes.string,
    pfp: PropTypes.string,
    uid: PropTypes.string,
  }),
};

export default ProfileForm;
