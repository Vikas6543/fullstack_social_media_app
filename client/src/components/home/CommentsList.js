import { Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RECENT_POSTS } from '../../redux/types';
import moment from 'moment';

const CommentsList = ({ recentPosts, commentPostId }) => {
  const [comment, setComment] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const { comments } = recentPosts.find((post) => post._id === commentPostId);

  const allUsersProfile = useSelector((state) => state.auth?.allUsersProfile);

  const sortedComments = comments.sort((a, b) => {
    return new Date(b.createdOn) - new Date(a.createdOn);
  });

  const dispatch = useDispatch();

  const commentSubmitHandler = async () => {
    try {
      setIsLoading(true);
      const response = await axios.put(
        `https://social-media-qgzn.onrender.com/post/comment/${commentPostId}`,
        {
          text: comment,
        }
      );
      setIsLoading(false);
      if (response) {
        setComment('');
        try {
          const response = await axios.get(
            'https://social-media-qgzn.onrender.com/post'
          );
          if (response) {
            dispatch({ type: RECENT_POSTS, payload: response?.data.posts });
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const commentProfile = (userId) => {
    const user = allUsersProfile.find((user) => user._id === userId);
    return user?.profilePicUrl;
  };

  return (
    <div>
      {/* comment input */}
      <section className='pb-3 md:pb-6'>
        <div className='flex'>
          <input
            type='text'
            className='w-full border rounded-l-lg px-3 py-3 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent'
            placeholder='Add a comment...'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className='bg-blue-500 text-white px-4 py-3 rounded-r-lg mr-6'
            onClick={commentSubmitHandler}
          >
            {isLoading ? (
              <div className='flex items-center justify-center'>
                <div className='w-6 h-6 border-b-2 border-gray-100 rounded-full animate-spin mx-1'></div>
              </div>
            ) : (
              <span style={{ fontWeight: '500' }}>Post</span>
            )}
          </button>
        </div>
      </section>

      {/* comments list */}
      {sortedComments.map((comment) => (
        <main key={comment._id}>
          <div className='flex py-3 border-b justify-between'>
            <div className='flex items-center'>
              {/* profile picture */}
              <section className='flex-shrink-0 mr-3'>
                <img
                  className='md:h-10 md:w-10 w-8 h-8 rounded-full'
                  src={commentProfile(comment.user._id)}
                  alt='profile_picture'
                />
              </section>

              {/* comment text */}
              <section>
                <div className='md:text-md text-sm font-bold text-gray-900'>
                  {comment.user.name}
                </div>
                <div
                  className='md:text-lg text-md text-gray-500'
                  style={{ fontWeight: '500' }}
                >
                  {comment.text}
                </div>
              </section>
            </div>

            {/* comment time */}
            <section className='md:pr-6 pr-2'>
              <span className='text-gray-500 ml-2 md:text-sm text-xs'>
                {moment(comment.createdOn).fromNow()}
              </span>
            </section>
          </div>
        </main>
      ))}
    </div>
  );
};

export default CommentsList;
