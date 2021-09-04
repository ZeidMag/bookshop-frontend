import React, { Component } from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
import { getRents } from '../store/actions/rents';

export class Rental extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
    };
  }
  componentDidMount() {
    this.fetchRents();
  }

  fetchRents = async () => {
    const { getRentsAction } = this.props;
    this.setState({ isLoading: true });
    await getRentsAction();
    this.setState({ isLoading: false });
  };

  render() {
    const { isLoading } = this.state;
    const { rentList, rentsError } = this.props;
    if (isLoading) {
      return <div>Loading ...</div>;
    }

    if (rentsError) {
      return <div>{rentsError}</div>;
    }

    if (!rentList.length) {
      return <div>No Rents</div>;
    }

    return (
      <div>
        <h1>Welcome {rentList[0].user.username}</h1>
        <ul>
          {rentList.map((rent, index) => (
            <li key={index}>
              <h3>You rented the book {rent.book.title}</h3>
              <h6>for {rent.duration_days} days</h6>
              <h6>
                starting from{' '}
                <Moment format="YYYY-MM-DD">{rent.created}</Moment>
              </h6>
              <h6>
                Ends in{' '}
                <Moment
                  date={moment().add(rent.duration_days, 'd')}
                  format="YYYY-MM-DD"
                />
              </h6>
            </li>
          ))}
        </ul>
        <button onClick={() => console.log(rentList)}>show rent list</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rentList: state.rents.rentList,
    rentsError: state.rents.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRentsAction: () => dispatch(getRents()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Rental);
