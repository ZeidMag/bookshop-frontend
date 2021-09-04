import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAuthors } from '../../store/actions/authors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import LoadingSpinner from '../../utility/LoadingSpinner';
import './Authors.css';

class Authors extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
    };
  }
  componentDidMount() {
    this.fetchAuthors();
  }

  fetchAuthors = async () => {
    const { getAuthorsAction } = this.props;
    this.setState({ isLoading: true });
    await getAuthorsAction();
    this.setState({ isLoading: false });
  };

  render() {
    const { isLoading } = this.state;
    const { authorList } = this.props;
    if (isLoading) {
      return <LoadingSpinner />;
    }
    if (!authorList?.length) {
      return <div>No Authors</div>;
    }
    return (
      <List
        style={{
          width: '100%',
          maxWidth: '20rem',
          margin: '0 auto',
          // backgroundColor: '#ccc',
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          className="authors_title gradient__text"
        >
          Authors
        </Typography>
        {authorList.map((author) => {
          const labelId = `checkbox-list-secondary-label-${author.name}`;
          return (
            <ListItem key={author.id} button style={{ textAlign: 'center' }}>
              <ListItemAvatar>
                <Avatar
                  alt={author.name}
                  src={`https://avatars.dicebear.com/api/initials/${author.name}.svg`}
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={author.name} />
            </ListItem>
          );
        })}
      </List>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authorList: state.authors.authorList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAuthorsAction: () => dispatch(getAuthors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Authors);
