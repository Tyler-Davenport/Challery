import { clientCredentials } from '../utils/client';

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

const getPostsBycategoryId = (categoryId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/post.json?orderBy="categoryId"&equalTo="${categoryId}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

export { getPosts, getPostsByUid, createPost, deletePost, getSinglePost, updatePost, getPostsByArtistId, getUserPosts, getPostsBycategoryId };
