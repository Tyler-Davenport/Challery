/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useEffect, useState } from 'react';
import { getPosts } from '../../api/postData';
import PostCard from '../../components/PostCard';
// import { useAuth } from '../../utils/context/authContext';

function Home() {
  // TODO: Set a state for books
  const [posts, setPosts] = useState([]);

  // TODO: Get user ID using useAuth Hook
  // const { user } = useAuth();

  // TODO: create a function that makes the API call to get all the books
  // const getAllThePosts = () => {
  //   getPosts().then(setPosts);
  // };

  // TODO: make the call to the API to get all the books on component render
  useEffect(() => {
    getPosts().then((data) => setPosts(data));
  }, []);

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {/* TODO: map over posts here using BookCard component */}
        {posts.map((post) => (
          <PostCard key={post.id} postObj={post} />
        ))}
      </div>
    </div>
  );
}

export default Home;
