import { Tooltip } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { setAuthHeader } from '../../api/axiosInstance';
import LoadingSpinner from '../LoadingSpinner';
import {
  GET_USER_PROFILE_DETAILS,
  LOGGED_IN_USER_PROFILE_DETAILS,
  SEARCH_INPUT_SHOW,
} from '../../redux/types';

const ProfileDetails = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [followLoading, setFollowLoading] = React.useState(false);
  const [myPosts, setMyPosts] = React.useState([]);

  const { id } = useParams();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth?.user?.token);
  const loggedInUserId = useSelector((state) => state.auth?.user?.user._id);
  const profileDetails = useSelector((state) => state.post?.userProfileDetails);
  const recentPosts = useSelector((state) => state.post?.recentPosts);
  const isAdminOpen = useSelector((state) => state.post?.isAdminOpen);

  // get user profile by id
  const getUserProfileById = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://mern-stack-app-api-pc1h.onrender.com/user/profile/${id}`
      );
      if (response) {
        setIsLoading(false);
        dispatch({
          type: GET_USER_PROFILE_DETAILS,
          payload: response?.data.user,
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  // update the user's followers list after following
  const updateFollowersList = async (id) => {
    try {
      setFollowLoading(true);
      const response = await axios.get(
        `https://mern-stack-app-api-pc1h.onrender.com/user/profile/${id}`
      );
      setFollowLoading(false);
      if (response) {
        setIsLoading(false);
        dispatch({
          type: GET_USER_PROFILE_DETAILS,
          payload: response?.data.user,
        });
      }
    } catch (error) {
      setFollowLoading(false);
      console.log(error);
    }
  };

  // update the logged in user's details in the redux store
  const updateLoggedInUserDetails = async () => {
    try {
      setFollowLoading(true);
      const response = await axios.get(
        'https://mern-stack-app-api-pc1h.onrender.com/user/profile'
      );
      setFollowLoading(false);
      dispatch({
        type: LOGGED_IN_USER_PROFILE_DETAILS,
        payload: response?.data.user,
      });
    } catch (error) {
      setFollowLoading(false);
      console.log(error);
    }
  };

  // follow a user
  const followHandler = (id) => async () => {
    try {
      setFollowLoading(true);
      const response = await axios.put(
        `https://mern-stack-app-api-pc1h.onrender.com/user/follow/${id}`
      );
      setFollowLoading(false);
      if (response) {
        updateFollowersList(id);
        updateLoggedInUserDetails();
      }
    } catch (error) {
      setFollowLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    setAuthHeader(token);
    getUserProfileById();
  }, []);

  useEffect(() => {
    dispatch({ type: SEARCH_INPUT_SHOW, payload: false });
    const filteredPosts = recentPosts.filter((post) => {
      return post.postOwner._id === profileDetails._id;
    });
    setMyPosts(filteredPosts);
  }, [profileDetails]);

  useEffect(() => {
    setAuthHeader(token);
    getUserProfileById();
  }, [isAdminOpen]);

  return (
    <div className='lg:w-8/12 -mt-4'>
      {isLoading ? (
        <div style={{ marginTop: '-10%', marginLeft: '-40%' }}>
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {/* go to home icon */}
          <div className='relative'>
            <Link to='/'>
              <Tooltip title='Back to home'>
                <i className='fas fa-arrow-left text-2xl cursor-pointer absolute -left-16 text-gray-600 hover:bg-gray-300 rounded-full p-2 hover:transition-all duration-200'></i>
              </Tooltip>
            </Link>
          </div>

          <div className='flex items-center lg:justify-between pt-6'>
            {/* profile image */}
            <section>
              <img
                src={profileDetails?.profilePicUrl}
                alt='profile'
                className='lg:w-36 lg:h-36 w-20 h-20 rounded-full'
              />
            </section>

            {/* profile title */}
            <section className='lg:pl-24 pl-8 lg:relative'>
              <p className='lg:text-4xl text-2xl font-bold'>
                {profileDetails?.name}
                {profileDetails?.role === 'admin' && (
                  <Tooltip title='Admin'>
                    <i className='fas fa-check-circle text-blue-600 absolute -right-4 lg:-right-5 -top-2 lg:text-xl'></i>
                  </Tooltip>
                )}

                {profileDetails?.role === 'admin' && (
                  <div className='lg:hidden relative'>
                    <Tooltip title='Admin'>
                      <i
                        className='fas fa-check-circle text-blue-600 absolute -right-5 bottom-5'
                        style={{ fontSize: '18px' }}
                      ></i>
                    </Tooltip>
                  </div>
                )}
              </p>

              {/* follow, unFollow & message */}
              <div className='lg:mt-4 mt-2'>
                {profileDetails?.followers?.includes(loggedInUserId) ? (
                  <>
                    <button
                      className={
                        followLoading
                          ? 'bg-blue-300 text-white rounded-lg text-sm py-2 px-2 lg:mx-3 mx-1'
                          : 'bg-blue-500 text-white rounded-lg text-sm py-2 px-3 lg:mx-3 mx-1'
                      }
                      style={{ fontWeight: '500' }}
                      onClick={followHandler(profileDetails?._id)}
                    >
                      Unfollow
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className={
                        followLoading
                          ? 'bg-blue-300 text-white rounded-lg text-sm py-2 px-3 lg:mx-3 mx-1'
                          : 'bg-blue-500 text-white rounded-lg text-sm py-2 px-3 lg:mx-3 mx-1'
                      }
                      style={{ fontWeight: '500' }}
                      onClick={followHandler(profileDetails?._id)}
                    >
                      Follow
                    </button>
                  </>
                )}

                <button
                  className='bg-white rounded-lg text-sm py-2 px-3 border border-gray-300'
                  style={{ fontWeight: '500' }}
                >
                  Message
                </button>
              </div>
            </section>
          </div>

          {/* profile stats */}
          <div className='flex mt-8 border-t border-b py-3 justify-between lg:px-12 px-4'>
            {/* Posts */}
            <section className='cursor-pointer'>
              <p className='lg:text-lg'>Posts</p>
              <p
                className='text-center font-medium text-gray-600 pt-1 text-lg'
                style={{ fontWeight: '500' }}
              >
                {profileDetails?.post?.length}
              </p>
            </section>

            {/* Followers */}
            <section className='cursor-pointer'>
              <p className='lg:text-lg'>Followers</p>
              <p
                className='text-center font-medium text-gray-600 pt-1 text-lg'
                style={{ fontWeight: '500' }}
              >
                {profileDetails?.followers?.length}
              </p>
            </section>

            {/* Following */}
            <section className='cursor-pointer'>
              <p className='lg:text-lg'>Following</p>
              <p
                className='text-center font-medium text-gray-600 pt-1 text-lg'
                style={{ fontWeight: '500' }}
              >
                {profileDetails?.following?.length}
              </p>
            </section>
          </div>

          {/* profile posts */}
          <div className='mt-8'>
            <div className='grid grid-cols-12 gap-8 mb-5'>
              {myPosts?.map((post, index) => (
                <div
                  key={index}
                  className='col-span-6 md:col-span-4 mr-3 cursor-pointer profile-post-image-container'
                >
                  <img
                    src={post.imageUrl}
                    alt='post'
                    className='profile-post-image'
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileDetails;
