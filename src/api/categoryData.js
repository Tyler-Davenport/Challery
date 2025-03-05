import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getCategoryById = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/category.json?orderBy="id"&equalTo="${id}"`, {
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

const getCategories = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/category.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

export { getCategoryById, getCategories };
