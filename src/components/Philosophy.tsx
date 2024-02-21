import { useState, useEffect } from 'react'
import { getDocumentItems } from '../utils/firebase'
import { collectionObject } from '../utils/firebase'

const Philosophy = () => {
  const [books, setBooks] = useState<collectionObject['items']>([])
  useEffect(() => {
    const getBooks = async () => {
      const response = await getDocumentItems('collections', 'philosophy')
      if (response.status === 201) {
        setBooks(response.items)
      }
    }
    getBooks()
  }, [])
  return (
    <div className='flex items-center justify-center gap-4 m-10'>
      {books.map((book) => {
        return (
          <div key={book.id} className='relative'>
            <img
              src={book.imageUrl}
              alt='book cover'
              className='w-[250px] h-[380px] object-fill rounded-md overflow-hidden'
            />
            <div className='absolute top-0 bottom-0 left-0 right-0 image-gradient rounded-md'></div>
            <h5 className='bottom-4 text-sm font-inter absolute text-gray-300 left-5'>
              Rs. {book.price}
            </h5>
            <button
              type='button'
              className='bottom-3 text-sm font-inter font-semibold absolute text-black right-5 border border-gray-400 bg-gray-400 hover:bg-white rounded-lg px-4 py-1'
            >
              Add to Cart
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default Philosophy
