'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import styles from '@/styles/PostForm.module.css';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../utils/context/authContext';
import { createPost, updatePost } from '../../api/postData';
import { getCategories } from '../../api/categoryData';
import { getSingleArtistByUid } from '../../api/artistData';

const initialState = {
  title: '',
  art: '',
  price: '',
  artistId: '',
  categoryId: '',
};

function PostForm({ obj = {} }) {
  const [formInput, setFormInput] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [loadingArtist, setLoadingArtist] = useState(true);
  const [artist, setArtist] = useState(null);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getCategories().then(setCategories);

    if (obj?.firebaseKey) {
      setFormInput((prevState) => ({
        ...prevState,
        ...obj,
      }));
    }
  }, [obj]);

  useEffect(() => {
    if (user) {
      getSingleArtistByUid(user.uid)
        .then((artistData) => {
          if (artistData?.firebaseKey) {
            setArtist(artistData);
            setFormInput((prevState) => ({
              ...prevState,
              artistId: artistData.firebaseKey,
            }));
          }
        })
        .catch(() => {})
        .finally(() => setLoadingArtist(false));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formInput.artistId || !artist?.firebaseKey) return;

    if (obj?.firebaseKey) {
      updatePost(formInput).then(() => router.push(`/profile/${artist.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createPost(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updatePost(patchPayload).then(() => router.push(`/profile/${artist.firebaseKey}`));
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className={`text-black ${styles.formContainer}`}>
      <h2 className={`text-white mt-5 ${styles.formTitle}`}>{obj?.firebaseKey ? 'Update' : 'Create'} Post</h2>

      {loadingArtist && <p className={styles.loadingText}>Loading artist information...</p>}

      <FloatingLabel controlId="floatingInput1" label="Title" className={`mb-3 ${styles.inputField}`}>
        <Form.Control type="text" placeholder="Enter title" name="title" value={formInput.title || ''} onChange={handleChange} required className={styles.input} />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Your Masterpiece URL" className={`mb-3 ${styles.inputField}`}>
        <Form.Control type="url" placeholder="Your Masterpiece URL" name="art" value={formInput.art || ''} onChange={handleChange} required className={styles.input} />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Art Price" className={`mb-3 ${styles.inputField}`}>
        <Form.Control type="text" placeholder="Name your price" name="price" value={formInput.price || ''} onChange={handleChange} required className={styles.input} />
      </FloatingLabel>

      <FloatingLabel controlId="floatingSelect" label="Category" className={styles.inputField}>
        <Form.Select aria-label="Category" name="categoryId" onChange={handleChange} className={`mb-3 ${styles.select}`} value={formInput.categoryId || ''} required>
          <option value="">Select a Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.tagName}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      <Button type="submit" disabled={loadingArtist || !formInput.artistId} className={styles.submitButton}>
        {obj?.firebaseKey ? 'Update' : 'Create'} Post
      </Button>
    </Form>
  );
}

PostForm.propTypes = {
  obj: PropTypes.shape({
    title: PropTypes.string,
    art: PropTypes.string,
    price: PropTypes.string,
    artistId: PropTypes.string,
    categoryId: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

export default PostForm;
