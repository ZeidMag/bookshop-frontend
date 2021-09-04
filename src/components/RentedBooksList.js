import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../store/actions/user';
import { getBooks } from '../store/actions/books';
import BooksSingleCard from './Books/BooksSingleCard/BooksSingleCard';
import Grid from '@material-ui/core/Grid';

const RentedBooksList = () => {
  const [bookListWithRentDetails, setBookListWithRentDetails] = useState([]);
  const dispatch = useDispatch();
  const { bookList } = useSelector((state) => state.books);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user?.rents?.length) {
      dispatch(getUser(user.id));
    }
  }, [dispatch, user.id, user?.rents?.length]);

  useEffect(() => {
    if (!bookList.length) {
      dispatch(getBooks());
    }
  }, [dispatch, bookList.length]);

  useEffect(() => {
    if (bookList.length && user?.rents?.length) {
      const bookIds = user.rents.map((rent) => rent.book_id);
      const userBookList = bookList.filter((book) => bookIds.includes(book.id));
      const userBookListWithRents = userBookList.map((book) => {
        const rent = user.rents.find((rent) => rent.book_id === book.id);
        return { ...book, ...rent };
      });
      setBookListWithRentDetails(userBookListWithRents);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookList.length, user?.rents?.length]);

  return (
    <Grid container style={{ width: '100%', marginTop: '2rem' }}>
      {bookListWithRentDetails.length
        ? bookListWithRentDetails.map((book, index) => (
            <BooksSingleCard
              mediumSize={8}
              style={{ marginTop: '2rem' }}
              key={index}
              book={book}
            />
          ))
        : ''}
    </Grid>
  );
};

export default RentedBooksList;
