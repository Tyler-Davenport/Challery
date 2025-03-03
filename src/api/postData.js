import { clientCredentials } from '../utils/client';
// API CALLS FOR BOOKS

const endpoint = clientCredentials.databaseURL;

const getUserPosts = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/post.json?orderBy="uid"&equalTo="${uid}"`, {
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

// get all posts
const getPosts = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/post.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

// get posts by user
const getPostsByUid = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/post.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

// TODO: DELETE BOOK
const deletePost = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/post/${firebaseKey}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// TODO: GET SINGLE BOOK
const getSinglePost = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/post/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// TODO: CREATE BOOK
const createPost = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/post.json`, {
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

// TODO: UPDATE BOOK
const updatePost = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/post/${payload.firebaseKey}.json`, {
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

// get posts by artistId
const getPostsByArtistId = (artistId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/post.json?orderBy="artistId"&equalTo="${artistId}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

// const booksOnSale = (uid) =>
//   new Promise((resolve, reject) => {
//     fetch(`${endpoint}/books.json?orderBy="uid"&equalTo="${uid}"`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         const onSale = Object.values(data).filter((item) => item.sale);
//         resolve(onSale);
//       })
//       .catch(reject);
//   });

export { getPosts, getPostsByUid, createPost, deletePost, getSinglePost, updatePost, getPostsByArtistId, getUserPosts };
