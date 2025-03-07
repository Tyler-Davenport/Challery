/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createPost, updatePost } from '../../api/postData';
import { getCategories } from '../../api/categoryData';
import { getSingleArtistByUid } from '../../api/artistData'; // Fetch a single artist

const initialState = {
  art: '',
  price: '',
  artistId: '',
  categoryId: '',
};

function PostForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(obj);
  const [categories, setCategories] = useState([]);
  const [loadingArtist, setLoadingArtist] = useState(true);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getCategories().then(setCategories);

    if (obj.firebaseKey) {
      setFormInput(obj);
    }
  }, []);

  useEffect(() => {
    if (user) {
      console.log('Fetching artist for user:', user.uid); // Debugging
      getSingleArtistByUid(user.uid)
        .then((artist) => {
          console.log('Fetched artist data:', artist); // Debugging

          if (artist?.firebaseKey) {
            setFormInput((prevState) => ({
              ...prevState,
              artistId: artist.firebaseKey,
            }));
          } else {
            console.warn('Artist not found for this user.');
          }
        })
        .catch((error) => {
          console.error('Error fetching artist:', error);
        })
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

    if (!formInput.artistId) {
      console.error('❌ Artist ID is missing. Cannot submit post.');
      return;
    }

    if (obj.firebaseKey) {
      updatePost(formInput).then(() => router.push(`/Post/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createPost(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updatePost(patchPayload).then(() => {
          router.push('/profile');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-black">
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Post</h2>

      {loadingArtist && <p>Loading artist information...</p>}

      <FloatingLabel controlId="floatingInput2" label="Your Masterpiece URL" className="mb-3">
        <Form.Control type="url" placeholder="Your Masterpiece URL" name="art" value={formInput.art} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Art Price" className="mb-3">
        <Form.Control type="text" placeholder="Name your price" name="price" value={formInput.price} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingSelect" label="Category">
        <Form.Select aria-label="Category" name="categoryId" onChange={handleChange} className="mb-3" value={formInput.categoryId || ''} required>
          <option value="">Select a Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.tagName}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      <Button type="submit" disabled={loadingArtist || !formInput.artistId}>
        {obj.firebaseKey ? 'Update' : 'Create'} Post
      </Button>
    </Form>
  );
}

PostForm.propTypes = {
  obj: PropTypes.shape({
    art: PropTypes.string,
    price: PropTypes.string,
    artistId: PropTypes.string,
    categoryId: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

export default PostForm;
