/* eslint-disable import/extensions */

'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Badge } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { getArtists } from '../api/artistData';
import { getCategoryById } from '../api/categoryData.js';
import { deletePost } from '../api/postData';
import { useAuth } from '../utils/context/authContext';
import ArtModal from './artModal';

function PostCard({ postObj, onUpdate }) {
  const [artistData, setArtistData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const deleteThisPost = () => {
    if (window.confirm(`Delete Post?`)) {
      deletePost(postObj.firebaseKey).then(() => onUpdate());
    }
  };

  const { user } = useAuth();

  useEffect(() => {
    getArtists(postObj.artistId).then(setArtistData);
  }, [postObj.artistId]);

  useEffect(() => {
    getCategoryById(postObj.categoryId).then(setCategoryData);
  }, [postObj.categoryId]);

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={postObj.art} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{artistData.length > 0 ? artistData[0].displayName : 'Loading...'}</Card.Title>
        <p className="card-text bold">{postObj.price}</p>
        <p>
          <Badge pill bg="dark">
            {categoryData.length > 0 ? categoryData[0].tagName : 'Loading...'}
          </Badge>
        </p>
        <ArtModal postObj={postObj} />

        {user.uid === postObj.uid && (
          <>
            <Link href={`/profile/edit/${postObj.firebaseKey}`} passHref>
              <Button variant="info">EDIT</Button>
            </Link>
            <Button variant="danger" onClick={deleteThisPost} className="m-2">
              DELETE
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape({
    art: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    artistId: PropTypes.string.isRequired,
    categoryId: PropTypes.string.isRequired,
    firebaseKey: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PostCard;
