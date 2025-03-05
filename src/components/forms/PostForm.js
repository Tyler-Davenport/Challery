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

const initialState = {
  art: '',
  price: '',
  artistId: '',
  categoryId: '',
};

function PostForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(obj);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getCategories().then(setCategories);

    if (obj.firebaseKey) setFormInput(obj);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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

      {/* TITLE INPUT  */}
      {/* <FloatingLabel controlId="floatingInput1" label="Book Title" className="mb-3">
        <Form.Control type="text" placeholder="Enter a title" name="title" value={formInput.title} onChange={handleChange} required />
      </FloatingLabel> */}

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Your Masterpiece URL" className="mb-3">
        <Form.Control type="url" placeholder="Your Masterpiece URL" name="art" value={formInput.art} onChange={handleChange} required />
      </FloatingLabel>

      {/* PRICE INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Art Price" className="mb-3">
        <Form.Control type="text" placeholder="Name your price" name="price" value={formInput.price} onChange={handleChange} required />
      </FloatingLabel>

      {/* AUTHOR SELECT  */}
      <FloatingLabel controlId="floatingSelect" label="Category">
        <Form.Select aria-label="Category" name="categoryId" onChange={handleChange} className="mb-3" value={formInput.categoryId || ''} required>
          <option value="">Select a Category</option>
          {categories.map((category) => (
            <option key={category.firebaseKey} value={category.firebaseKey}>
              {category.tagName}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      {/* DESCRIPTION TEXTAREA  */}
      {/* <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
        <Form.Control as="textarea" placeholder="Description" style={{ height: '100px' }} name="description" value={formInput.description} onChange={handleChange} required />
      </FloatingLabel> */}

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      {/* <Form.Check
        className="text-white mb-3"
        type="switch"
        id="sale"
        name="sale"
        label="On Sale?"
        checked={formInput.sale}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            sale: e.target.checked,
          }));
        }}
      /> */}

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Post</Button>
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
