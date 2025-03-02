import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getArtists = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/artist.json?orderBy="firebaseKey"&equalTo="${firebaseKey}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(Object.values(data));
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

// FIXME: CREATE AUTHOR
const createAuthor = () => {};

// get artist by id
export const getArtistById = (artistId) =>
  fetch(`${endpoint}/artist.json?orderBy="firebaseKey"&equalTo="${artistId}"`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .then((data) => {
      const artist = data ? Object.values(data)[0] : null;
      return artist;
    })
    .catch((error) => {
      console.error('Error fetching artist:', error);
      return null;
    });

// FIXME: GET SINGLE ARTIST
const getSingleArtist = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/artist/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// FIXME: DELETE AUTHOR
const deleteSingleAuthor = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/authors/${firebaseKey}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// FIXME: UPDATE AUTHOR
const updateAuthor = () => {};

// TODO: GET A SINGLE AUTHOR'S BOOKS
const getAuthorBooks = () => {};

const favoriteAuthors = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/authors.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const favorites = Object.values(data).filter((item) => item.favorite);
        resolve(favorites);
      })
      .catch(reject);
  });

export { getArtists, createAuthor, getSingleArtist, deleteSingleAuthor, updateAuthor, favoriteAuthors, getAuthorBooks };
