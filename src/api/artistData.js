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

const getArtistByUid = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/artist.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

const createArtist = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/artist.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const updateArtist = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/artist/${payload.firebaseKey}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// FIXME: CREATE AUTHOR
// const createAuthor = () => {};

// get artist by id
// const getArtistByfirebaseKey = (firebaseKey) =>
//   fetch(`${endpoint}/artist.json?orderBy="firebaseKey"&equalTo="${firebaseKey}"`, {
//     method: 'GET',
//     headers: { 'Content-Type': 'application/json' },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       const artist = data ? Object.values(data)[0] : null;
//       return artist;
//     })
//     .catch((error) => {
//       console.error('Error fetching artist:', error);
//       return null;
//     });

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

const getSingleArtistByUid = async (uid) =>
  fetch(`${endpoint}/artist.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        const artistArray = Object.values(data);
        return artistArray.length > 0 ? artistArray[0] : null; // Return the first artist found
      }
      return null;
    });
// FIXME: DELETE AUTHOR
// const deleteSingleAuthor = (firebaseKey) =>
//   new Promise((resolve, reject) => {
//     fetch(`${endpoint}/authors/${firebaseKey}.json`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => resolve(data))
//       .catch(reject);
//   });

// FIXME: UPDATE AUTHOR
// const updateAuthor = () => {};

// const favoriteAuthors = (uid) =>
//   new Promise((resolve, reject) => {
//     fetch(`${endpoint}/authors.json?orderBy="uid"&equalTo="${uid}"`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         const favorites = Object.values(data).filter((item) => item.favorite);
//         resolve(favorites);
//       })
//       .catch(reject);
//   });

export { getArtists, getSingleArtist, getSingleArtistByUid, createArtist, updateArtist, getArtistByUid };
