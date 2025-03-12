'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ProfileForm from '../../../../components/forms/ProfileForm';
import { getSingleArtist } from '../../../../api/artistData';

export default function EditProfile({ params }) {
  const [editItem, setEditItem] = useState({});
  // TODO: grab the firebasekey
  const { firebaseKey } = params;

  // TODO: make a call to the API to get the book data
  useEffect(() => {
    getSingleArtist(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // TODO: pass object to form
  return <ProfileForm obj={editItem} />;
}

EditProfile.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
