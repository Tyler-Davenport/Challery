'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PostForm from '../../../../components/forms/PostForm';
import { getSinglePost } from '../../../../api/postData';

export default function EditPost({ params }) {
  const [editItem, setEditItem] = useState({});
  // TODO: grab the firebasekey
  const { firebaseKey } = params;

  // TODO: make a call to the API to get the book data
  useEffect(() => {
    getSinglePost(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // TODO: pass object to form
  return <PostForm obj={editItem} />;
}

EditPost.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
