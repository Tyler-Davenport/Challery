'use client';

import React, { useEffect, useState } from 'react';
import { Container, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import styles from '@/styles/ExplorePage.module.css';
import { getPosts, getPostsBycategoryId } from '../../api/postData';
import { getCategories } from '../../api/categoryData';
import PostCard from '../../components/PostCard';

function Home() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const getAllThePosts = () => {
    getPosts()
      .then(setPosts)
      .catch((error) => console.error('Error fetching all posts:', error));
  };

  useEffect(() => {
    if (selectedCategories.length > 0) {
      Promise.all(selectedCategories.map((categoryId) => getPostsBycategoryId(categoryId)))
        .then((results) => {
          const mergedPosts = results.flat();
          setPosts(mergedPosts);
        })
        .catch((error) => console.error('Error fetching filtered posts:', error));
    } else {
      getAllThePosts();
    }
  }, [selectedCategories]);

  const handleCategoryChange = (val) => {
    setSelectedCategories(val);
  };

  return (
    <Container className="text-center my-4">
      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Explore What The Challery Community Has To Offer</h1>
        <p className={styles.heroSubtitle}>Looking for something specific? Try filtering by the tags!</p>
      </div>

      <ToggleButtonGroup type="checkbox" name="category-options" value={selectedCategories} onChange={handleCategoryChange} className={styles.toggleButtonGroup}>
        <ToggleButton id="category-all" value="all" className={`${styles.toggleButton} ${selectedCategories.length === 0 ? styles.active : ''}`} onClick={getAllThePosts}>
          All
        </ToggleButton>

        {categories.map((category) => (
          <ToggleButton key={category.id} id={`category-${category.id}`} value={category.id} className={`${styles.toggleButton} ${selectedCategories.includes(category.id) ? styles.active : ''}`}>
            {category.tagName}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <div className="d-flex flex-wrap justify-content-center">{posts.length > 0 ? posts.map((post) => <PostCard key={post.id} postObj={post} onUpdate={getAllThePosts} />) : <p>No posts found.</p>}</div>
    </Container>
  );
}

export default Home;
