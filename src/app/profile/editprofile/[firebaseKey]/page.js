'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ProfileForm from '../../../../components/forms/ProfileForm';
import { getSingleArtist } from '../../../../api/artistData';

export default function EditProfile({ params }) {
  const [editItem, setEditItem] = useState({});
  const { firebaseKey } = params;

  useEffect(() => {
    getSingleArtist(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return <ProfileForm obj={editItem} />;
}

EditProfile.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
