// import Navbar from './Navbar';
import { setUser } from '../store/actions/user';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import Alert from '../utility/Alert';
import Footer from './Footer';

const Main = (props) => {
  const id = sessionStorage.getItem('id');
  const username = sessionStorage.getItem('username');
  const created = sessionStorage.getItem('created');
  const modified = sessionStorage.getItem('modified');
  if (id && username && created && modified) {
    const user = {
      id,
      username,
      created,
      modified,
    };
    props.setUserAction(user);
  }
  return (
    <>
      <Navbar />
      {props.children}
      <Alert />
      <Footer />
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserAction: (user) => dispatch(setUser(user)),
  };
};

export default connect(null, mapDispatchToProps)(Main);
