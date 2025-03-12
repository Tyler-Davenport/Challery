// 'use client';

// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { Button, Card } from 'react-bootstrap';
// import styles from '@/styles/MyPostsPage.module.css';
// import { getUserPosts } from '../../../../api/postData';
// import PostCard from '../../../../components/PostCard';

// export default function MyPostsPage({ artistData }) {
//   const [userPosts, setUserPosts] = useState([]);

//   const getMyCreatedPosts = () => {
//     if (artistData?.firebaseKey) {
//       getUserPosts(artistData.firebaseKey).then(setUserPosts);
//     }
//   };

//   useEffect(() => {
//     getMyCreatedPosts();
//   }, [artistData]);

//   if (!artistData) return <p>Loading profile...</p>;

//   return (
//     <div className={`container ${styles.pageContainer}`}>
//       <Card className={`p-4 shadow-lg mb-4 d-flex flex-row align-items-start justify-content-between ${styles.profileCard}`}>
//         <div className="d-flex align-items-start">
//           <img src={artistData.pfp || '/default-profile.png'} alt="Profile" className={`rounded-circle me-4 ${styles.profileImage}`} />

//           <div className="flex-grow-1">
//             <h2 className={styles.artistName}>{artistData.displayName || 'Artist Name'}</h2>
//             <p className="text-muted">{artistData.contact || 'No contact info provided'}</p>
//             <p>{artistData.bio || 'This artist has not added a bio yet.'}</p>
//             <p>${artistData.payment || 'This artist has not selected payment'}</p>
//           </div>
//         </div>

//         {artistData.firebaseKey && (
//           <Link href={`/profile/editprofile/${artistData.firebaseKey}`} passHref>
//             <Button className={`${styles.cardButton} ${styles.editProfileButton}`} variant="info">
//               Edit Profile
//             </Button>
//           </Link>
//         )}
//       </Card>

//       <div className="text-center my-4">
//         <h1 className={styles.createdPostsHeading}>Created Posts</h1>
//         <div className="d-flex flex-wrap">
//           {userPosts.map((post) => (
//             <PostCard key={post.firebaseKey} postObj={post} onUpdate={getMyCreatedPosts} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
