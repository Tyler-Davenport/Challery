'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PostForm from '../../../../components/forms/PostForm';
import { getSinglePost } from '../../../../api/postData';

export default function EditPost({ params }) {
  const [editItem, setEditItem] = useState({});
  const { firebaseKey } = params;

  useEffect(() => {
    getSinglePost(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return <PostForm obj={editItem} />;
}

EditPost.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
