'use client';

import React, { useEffect, useState } from 'react';
import BookForm from '@/components/forms/BookForm';
import PropTypes from 'prop-types';
import { getSinglePost } from '../../../../api/postData';

export default function EditBook({ params }) {
  const [editItem, setEditItem] = useState({});
  // TODO: grab the firebasekey
  const { firebaseKey } = params;

  // TODO: make a call to the API to get the book data
  useEffect(() => {
    getSinglePost(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // TODO: pass object to form
  return <BookForm obj={editItem} />;
}

EditBook.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
