/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getUserPosts } from '../../api/postData';
import { useAuth } from '../../utils/context/authContext';
import PostCard from '../../components/PostCard';

export default function MyPostsPage() {
  const [userPosts, setUserPosts] = useState([]);
  const { user } = useAuth();

  const getMyCreatedPosts = () => {
    getUserPosts(user.uid).then(setUserPosts);
  };

  useEffect(() => {
    getMyCreatedPosts();
  }, [user]);

  return (
    <div className="text-center my-4">
      <Link href="/book/new" passHref>
        <Button>Add A Book</Button>
      </Link>
      <h1>Created Posts</h1>
      <div className="d-flex flex-wrap">
        {userPosts.map((post) => (
          <PostCard key={post.firebaseKey} postObj={post} onUpdate={getMyCreatedPosts} />
        ))}
      </div>
    </div>
  );
}
