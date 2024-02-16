import { Link } from 'react-router-dom'

const Homepage = () => {
  return (
    <div className='flex flex-col justify-center items-center m-4 gap-4'>
      <div className='flex justify-center items-center gap-4'>
        <div className='relative group cursor-pointer'>
          <Link to='/classics'>
            <img
              src='/images/Classics.jpg'
              alt='Classics'
              className='w-[320px] h-[240px] object-cover group-scale rounded-md overflow-hidden'
            />
            <div className='absolute top-0 bottom-0 left-0 right-0 image-gradient group-scale rounded-md'></div>
            <h5 className='bottom-4 text-2xl font-inter absolute text-gray-300 left-5 group-scale'>
              Classics
            </h5>
          </Link>
        </div>

        <div className='relative group cursor-pointer'>
          <Link to='/horror'>
            <img
              src='/images/Horror.jpg'
              alt='Horror'
              className='w-[320px] h-[240px] object-cover group-scale rounded-md overflow-hidden'
            />
            <div className='absolute top-0 bottom-0 left-0 right-0 image-gradient group-scale rounded-md'></div>
            <h5 className='bottom-4 text-2xl font-inter absolute text-gray-300 left-5 group-scale'>
              Horror
            </h5>
          </Link>
        </div>
      </div>
      <div className='flex justify-center items-center px-4 gap-4'>
        <div className='relative group cursor-pointer'>
          <Link to='/pulp'>
            <img
              src='/images/Pulp.jpg'
              alt='Pulp'
              className='w-[320px] h-[240px] object-cover group-scale rounded-md overflow-hidden'
            />
            <div className='absolute top-0 bottom-0 left-0 right-0 image-gradient group-scale rounded-md'></div>
            <h5 className='bottom-4 text-2xl font-inter absolute text-gray-300 left-5 group-scale'>
              Pulp
            </h5>
          </Link>
        </div>
        <div className='relative group cursor-pointer'>
          <Link to='/scifa'>
            <img
              src='/images/Sci Fi Fantasy.jpg'
              alt='Scifi'
              className='w-[320px] h-[240px] object-cover group-scale rounded-md overflow-hidden'
            />
            <div className='absolute top-0 bottom-0 left-0 right-0 image-gradient group-scale rounded-md'></div>
            <h5 className='bottom-4 text-2xl font-inter absolute text-gray-300 left-5 group-scale'>
              SciFi/Fantasy
            </h5>
          </Link>
        </div>
        <div className='relative group cursor-pointer'>
          <Link to='/thriller'>
            <img
              src='/images/Mystery Thriller.jpg'
              alt='Mystery'
              className='w-[320px] h-[240px] object-cover group-scale rounded-md overflow-hidden'
            />
            <div className='absolute top-0 bottom-0 left-0 right-0 image-gradient group-scale rounded-md'></div>
            <h5 className='bottom-4 text-2xl font-inter absolute text-gray-300 left-5 group-scale'>
              Mystery/Thriller
            </h5>
          </Link>
        </div>
      </div>
      <div className='flex justify-center items-center gap-4'>
        <div className='relative group cursor-pointer'>
          <Link to='/nonfiction'>
            <img
              src='/images/Non Fiction.jpg'
              alt='NonFiction'
              className='w-[320px] h-[240px] object-cover group-scale rounded-md overflow-hidden'
            />
            <div className='absolute top-0 bottom-0 left-0 right-0 image-gradient group-scale rounded-md'></div>
            <h5 className='bottom-4 text-2xl font-inter absolute text-gray-300 left-5 group-scale'>
              Non-Fiction
            </h5>
          </Link>
        </div>
        <div className='relative group cursor-pointer'>
          <Link to='philosophy'>
            <img
              src='/images/Philosophy.jpg'
              alt='Philosophy'
              className='w-[320px] h-[240px] object-cover group-scale rounded-md overflow-hidden'
            />
            <div className='absolute top-0 bottom-0 left-0 right-0 image-gradient group-scale rounded-md'></div>
            <h5 className='bottom-4 text-2xl font-inter absolute text-gray-300 left-5 group-scale'>
              Philosophy
            </h5>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Homepage
