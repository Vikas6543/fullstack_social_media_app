import React from 'react';

const FriendsList = ({
  allUsers,
  goToProfileDetailPage,
  role,
  removeFriendHandler,
}) => {
  return (
    <>
      <p className='text-2xl font-bold text-center pb-3'>All Users</p>
      <p className='border-b border-gray-300 mb-3'></p>

      {allUsers?.map((user) => (
        <div className='flex items-center justify-between cursor-pointer py-4 hover:bg-gray-100 md:pl-4'>
          <div
            className='flex items-center'
            onClick={() => goToProfileDetailPage(user?._id)}
          >
            <section>
              <img
                src={user?.profilePicUrl}
                alt='usersProfile'
                className='md:h-12 md:w-12 w-8 h-8 rounded-full'
              />
            </section>
            <section>
              <p
                className='md:ml-5 ml-3 md:text-xl'
                style={{ fontSize: '600' }}
              >
                {user?.name}
              </p>
            </section>
          </div>

          <div className='md:mr-5'>
            {role === 'admin' && (
              <button
                style={{ fontWeight: '500' }}
                className='text-sm border bg-red-500 text-white px-3 md:py-2 py-1 rounded cursor-pointer hover:bg-red-600'
                onClick={() => removeFriendHandler(user._id)}
              >
                Remove
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default FriendsList;
