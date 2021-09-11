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
import './Management.css';

class Management extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
    };
  }
  render() {
    return (
      <div className="management-container">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
          className="gradient__text font-anton"
          style={{ fontSize: '4.5rem' }}
        >
          Books
        </Typography>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="font-bebas">Add Book</Typography>
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
            <Typography className="font-bebas">Edit Book</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <EditBook />
          </AccordionDetails>
        </Accordion>
        <Divider variant="middle" style={{ margin: '2rem 0' }} />
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
          className="gradient__text font-anton"
          style={{ fontSize: '4.5rem' }}
        >
          Authors
        </Typography>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className="font-bebas">Add Author</Typography>
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
            <Typography className="font-bebas">Edit Author</Typography>
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
    bookList: state.books.bookList,
  };
};

export default connect(mapStateToProps)(Management);
