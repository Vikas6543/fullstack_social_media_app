import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthHeader } from '../../api/axiosInstance';
import { IS_CHAT_SCREEN } from '../../redux/types';

const Chats = () => {
  const token = useSelector((state) => state.auth?.user?.token);

  const dispatch = useDispatch();

  useEffect(() => {
    setAuthHeader(token);
    dispatch({ type: IS_CHAT_SCREEN, payload: true });
  }, []);

  return (
    <main>
      <section
        className='hidden lg:block'
        style={{ marginLeft: '-65%', marginTop: '-34px' }}
      >
        <div className='flex h-screen antialiased text-gray-800'>
          <div className='flex flex-row w-full overflow-hidden'>
            {/* chats text */}
            <div className='flex flex-col flex-auto h-full p-6 lg:ml-64'>
              <div className='flex flex-col flex-auto flex-shrink-0 rounded-2xl h-full p-4'>
                <div className='flex flex-col h-full overflow-x-auto mb-4'>
                  <div className='flex flex-col h-full'>
                    <div className='grid grid-cols-12 gap-y-2'>
                      <div className='col-start-1 col-end-8 p-3 rounded-lg'>
                        <div className='flex flex-row items-center'>
                          <div className='flex items-center justify-center h-10 w-10 rounded-full bg-indigo-600 flex-shrink-0 text-white'>
                            N
                          </div>
                          <div className='relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl'>
                            <div>hii how are you?</div>
                          </div>
                        </div>
                      </div>
                      <div className='col-start-1 col-end-8 p-3 rounded-lg'>
                        <div className='flex flex-row items-center'>
                          <div className='flex items-center justify-center h-10 w-10 rounded-full bg-indigo-600 flex-shrink-0 text-white'>
                            N
                          </div>
                          <div className='relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl'>
                            <div>what's going on</div>
                          </div>
                        </div>
                      </div>
                      <div className='col-start-6 col-end-13 p-3 rounded-lg'>
                        <div className='flex items-center justify-start flex-row-reverse'>
                          <div className='flex items-center justify-center h-10 w-10 rounded-full bg-indigo-600 flex-shrink-0 text-white'>
                            V
                          </div>
                          <div className='relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl'>
                            <div>I'm good what about you?</div>
                          </div>
                        </div>
                      </div>
                      <div className='col-start-6 col-end-13 p-3 rounded-lg'>
                        <div className='flex items-center justify-start flex-row-reverse'>
                          <div className='flex items-center justify-center h-10 w-10 rounded-full bg-indigo-600 flex-shrink-0 text-white'>
                            V
                          </div>
                          <div className='relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl'>
                            <div>how's your going on?</div>
                          </div>
                        </div>
                      </div>
                      <div className='col-start-1 col-end-8 p-3 rounded-lg'>
                        <div className='flex flex-row items-center'>
                          <div className='flex items-center justify-center h-10 w-10 rounded-full bg-indigo-600 flex-shrink-0 text-white'>
                            N
                          </div>
                          <div className='relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl'>
                            <div>
                              yaa the work is going absolutely fine, just
                              thought to meet you once
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='col-start-6 col-end-13 p-3 rounded-lg'>
                        <div className='flex items-center justify-start flex-row-reverse'>
                          <div className='flex items-center justify-center h-10 w-10 rounded-full bg-indigo-600 flex-shrink-0 text-white'>
                            V
                          </div>
                          <div className='relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl'>
                            <div>
                              yaa sure, let's us meet at 6:00 pm at the coffee
                              shop
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='col-start-1 col-end-8 p-3 rounded-lg'>
                        <div className='flex flex-row items-center'>
                          <div className='flex items-center justify-center h-10 w-10 rounded-full bg-indigo-600 flex-shrink-0 text-white'>
                            N
                          </div>
                          <div className='relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl'>
                            <div>
                              cool, I'll be there at 6:00 pm, see you there
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* input text for chat */}
                <div className='flex flex-row items-center h-20 rounded-xl bg-white px-4 absolute bottom-6 right-20 w-8/12'>
                  <div>
                    <button className='flex items-center justify-center text-gray-400 hover:text-gray-600'>
                      <svg
                        className='w-6 h-6'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          stroke-width='2'
                          d='M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13'
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <div className='flex-grow ml-4'>
                    <div className='relative w-full'>
                      <input
                        type='text'
                        className='flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-12'
                      />
                      <button className='absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600'>
                        <svg
                          className='w-6 h-6'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            stroke-width='2'
                            d='M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className='ml-4'>
                    <button className='flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-3 flex-shrink-0'>
                      <span>
                        <i className='fas fa-paper-plane'></i>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='text-2xl absolute top-1/2 ml-28 lg:hidden'>
        <p>Chat Screen</p>
      </section>
    </main>
  );
};

export default Chats;
