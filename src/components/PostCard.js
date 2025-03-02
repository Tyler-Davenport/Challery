'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { getArtists } from '../api/artistData';

function PostCard({ postObj }) {
  const [artistData, setArtistData] = useState([]);

  useEffect(() => {
    getArtists(postObj.artistId).then((data) => {
      setArtistData(data);
    });
  }, []);

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={postObj.art} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{artistData.length > 0 ? artistData[0].displayName : 'Loading...'}</Card.Title>
        <p className="card-text bold">{postObj.price}</p>
        <Link href={`/book/${postObj.artistId}`} passHref>
          <Button variant="primary" className="m-2">
            VIEW
          </Button>
        </Link>
        <Link href={`/book/edit/${postObj.artistId}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape({
    art: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    artistId: PropTypes.string.isRequired,
  }).isRequired,
};

export default PostCard;
