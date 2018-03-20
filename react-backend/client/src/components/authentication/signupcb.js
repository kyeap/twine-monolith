import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Input from '../visitors/input';
import Select from '../visitors/select';
import Button from '../visitors/button';
import errorMessages from '../errors';
import { CbAdmin } from '../../api';

export default class CBsignup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      org_name: '',
      email: '',
      genre: '',
      password: '',
      error: [],
    };
  }

  setError(messagesArray) {
    this.setState({ error: messagesArray });
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();

    CbAdmin.create({
      orgName: this.state.org_name,
      email: this.state.email,
      category: this.state.genre,
      password: this.state.password,
      passwordConfirm: this.state.confirm_password,
    })
      .then(() => this.props.history.push('/logincb'))
      .catch((error) => {
        switch (error.response.data.validation) {
          case 'email':
            this.setError([errorMessages.EMAIL_ERROR]);
            break;
          case 'name':
            this.setError([errorMessages.NAME_ERROR]);
            break;
          case 'emailname':
            this.setError([errorMessages.NAME_ERROR, errorMessages.EMAIL_ERROR]);
            break;
          case 'true':
            this.setError([errorMessages.CB_EXISTS_ERROR]);
            break;
          case 'noinput':
            this.setError([errorMessages.NO_INPUT_ERROR]);
            break;
          case 'pswdmatch':
            this.setError([errorMessages.NO_PASSWORD_MATCH]);
            break;
          case 'pswdweak':
            this.setError([errorMessages.PASSWORD_WEAK]);
            break;
          default:
            this.props.history.push('/internalServerError');
            break;
        }
      });
  };

  render() {
    const { error } = this.state;

    return (
      <section>
        <h1>Please provide us with required information on your business</h1>
        {error && (
          <div className="ErrorText">{error.map(el => <span key={el}>{el}</span>)}</div>
        )}
        <form className="Signup" onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <Input question="Business Name" option="org_name" />
          <Input question="Business Email" option="email" />
          <Select
            question="Select Genre of Business"
            option="genre"
            choices={[
              '',
              'Art centre or facility',
              'Community hub, facility or space',
              'Community pub, shop or café',
              'Employment, training, business support or education',
              'Energy',
              'Environment or nature',
              'Food catering or production (incl. farming)',
              'Health, care or wellbeing',
              'Housing',
              'Income or financial inclusion',
              'Sport & leisure',
              'Transport',
              'Visitor facilities or tourism',
              'Waste reduction, reuse or recycling',
            ]}
          />
          <Input type="password" question="Enter Password" option="password" />
          <Input type="password" question="Confirm Password" option="confirm_password" />
          <Button />
        </form>
        <Link to="/logincb">
          <button className="Button ButtonBack">Login</button>
        </Link>
      </section>
    );
  }
}

CBsignup.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};
