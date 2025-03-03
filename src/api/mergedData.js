// import { getAuthorBooks, getSingleAuthor, deleteSingleAuthor } from './authorData';
// import { getSingleBook, deleteBook } from './bookData';

import { getSingleArtist } from './artistData';
import { getSinglePost } from './postData';

const viewPostDetails = (postFirebaseKey) =>
  new Promise((resolve, reject) => {
    getSinglePost(postFirebaseKey)
      .then((postObject) => {
        getSingleArtist(postObject.artistId).then((artistObject) => {
          resolve({ artistObject, ...postObject });
        });
      })
      .catch((error) => reject(error));
  });

// const viewProfile = (bookFirebaseKey) =>
//   new Promise((resolve, reject) => {
//     getSingleBook(bookFirebaseKey)
//       .then((bookObject) => {
//         getSingleAuthor(bookObject.author_id).then((authorObject) => {
//           resolve({ authorObject, ...bookObject });
//         });
//       })
//       .catch((error) => reject(error));
//   });

// const viewAuthorDetails = (authorFirebaseKey) =>
//   new Promise((resolve, reject) => {
//     Promise.all([getSingleAuthor(authorFirebaseKey), getAuthorBooks(authorFirebaseKey)])
//       .then(([authorObject, authorBooksArray]) => {
//         resolve({ ...authorObject, books: authorBooksArray });
//       })
//       .catch((error) => reject(error));
//   });

// const deleteAuthorBooks = (authorId) =>
//   new Promise((resolve, reject) => {
//     getAuthorBooks(authorId)
//       .then((booksArray) => {
//         console.warn(booksArray, 'Author Books');
//         const deleteBookPromises = booksArray.map((book) => deleteBook(book.firebaseKey));

//         Promise.all(deleteBookPromises).then(() => {
//           deleteSingleAuthor(authorId).then(resolve);
//         });
//       })
//       .catch((error) => reject(error));
//   });

export default viewPostDetails;
// export { viewBookDetails, viewAuthorDetails, deleteAuthorBooks };
