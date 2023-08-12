import React, { useEffect, useState } from 'react';
import { setAuthHeader } from '../../api/axiosInstance';
import { useSelector } from 'react-redux';
import RecentPosts from '../../components/home/RecentPosts';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
  ALL_USERS_PROFILE,
  RECENT_POSTS,
  SEARCH_INPUT_SHOW,
} from '../../redux/types';

const Home = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.auth?.user?.token);

  // get recent posts
  const getRecentPosts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        'https://social-media-qgzn.onrender.com/post'
      );
      setIsLoading(false);
      if (response) {
        dispatch({ type: RECENT_POSTS, payload: response?.data.posts });
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  // all users profile
  const getUsersProfile = async () => {
    try {
      const response = await axios.get(
        'https://social-media-qgzn.onrender.com/user/allProfiles'
      );
      dispatch({ type: ALL_USERS_PROFILE, payload: response?.data.users });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsersProfile();
  }, []);

  useEffect(() => {
    dispatch({ type: SEARCH_INPUT_SHOW, payload: true });
    setAuthHeader(token);
    getRecentPosts();
  }, [token]);

  return (
    <div>
      <section style={{ maxWidth: '550px' }}>
        <RecentPosts getRecentPosts={getRecentPosts} isLoading={isLoading} />
      </section>
    </div>
  );
};

export default Home;
