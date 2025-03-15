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

export default viewPostDetails;
