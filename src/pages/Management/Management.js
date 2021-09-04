import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddBook from '../../components/AddBook';
import EditBook from '../../components/EditBook';
import AddAuthor from '../../components/AddAuthor';
import EditAuthor from '../../components/EditAuthor';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import { Redirect } from 'react-router-dom';
import './Management.css';

class Management extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
    };
  }
  render() {
    const { user } = this.props;
    if (!user) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="management-container">
        <Typography variant="h2" component="h3" className="gradient__text">
          Books
        </Typography>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Add Book</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AddBook />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Edit Book</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <EditBook />
          </AccordionDetails>
        </Accordion>
        <Divider variant="middle" style={{ margin: '2rem 0' }} />
        <Typography variant="h2" component="h3" className="gradient__text">
          Authors
        </Typography>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Add Author</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AddAuthor />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Edit Author</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <EditAuthor />
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    bookList: state.books.bookList,
  };
};

export default connect(mapStateToProps)(Management);
