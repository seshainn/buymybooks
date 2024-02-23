import { useSelector } from 'react-redux'
import { bookType } from '../utils/types'
import { useDispatch } from 'react-redux'
import { addBook, removeBook } from '../store'

type stateType = {
  books: bookType[]
}

const Cartpage = () => {
  const dispatch = useDispatch()
  const booksCart = useSelector((state: stateType) => state.books)
  const totalQuantity = booksCart.reduce((sum, book) => sum + book.qty, 0)
  const totalPrice = booksCart.reduce(
    (sum, book) => sum + book.qty * book.price,
    0
  )
  return (
    <div className='flex m-10'>
      <div className='flex flex-col items-center mx-10 gap-4 w-1/2'>
        {booksCart.map((book) => {
          return (
            <div
              key={book.id}
              className='flex border-2 border-opacity-50 border-gray-400 rounded-lg w-full p-2'
            >
              <div className='w-[125px] h-[190px] object-fill rounded-md overflow-hidden mr-8'>
                <img
                  src={book.imageUrl}
                  alt='book cover'
                  className='w-full h-full object-cover'
                />
              </div>

              <div className='flex flex-col flex-grow'>
                <h1 className='mb-10 text-xl font-semibold'>{book.name}</h1>
                <h6 className='mb-10 text-sm font-semibold'>
                  Price: Rs. {book.price}
                </h6>
                <div className='flex items-center'>
                  <button
                    className='px-2 py-1 bg-slate-700 text-white rounded-l-md'
                    onClick={() => {
                      dispatch(
                        removeBook({
                          id: book.id,
                          name: book.name,
                          imageUrl: book.imageUrl,
                          price: book.price,
                          qty: 1,
                        })
                      )
                    }}
                  >
                    -
                  </button>
                  <h3 className='px-4 py-1 text-sm font-semibold'>
                    {book.qty}
                  </h3>
                  <button
                    className='px-2 py-1 bg-slate-700 text-white rounded-r-md'
                    onClick={() => {
                      dispatch(
                        addBook({
                          id: book.id,
                          name: book.name,
                          imageUrl: book.imageUrl,
                          price: book.price,
                          qty: 1,
                        })
                      )
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className='flex flex-col w-1/2 items-center mt-20 gap-10'>
        <h1 className='font-semibold'>
          Total ({totalQuantity} items): Rs. {totalPrice}{' '}
        </h1>
        <button
          type='button'
          className='border px-4 py-2 rounded-lg text-slate-300 font-semibold bg-slate-700 border-slate-700'
        >
          Proceed to buy
        </button>
      </div>
    </div>
  )
}

export default Cartpage
