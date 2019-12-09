import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      cohort: null,
      password: '',
      passwordConfirmation: '',
      admin: false,
      submitted: false,
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { name, email, phone, cohort, password, admin, passwordConfirmation } = this.state;
    if(password !== passwordConfirmation) {
      alert('비밀번호와 비밀번호 확인이 맞지 않습니다. 비밀번호를 다시 확인해주세요');
    } else {
      const data = {
        name,
        email,
        phone,
        cohort,
        password,
        admin,
      }
      axios.post('/api/signup', data)
      .then(() => {
        this.setState({
          submitted: true,
        });
        alert('회원 가입을 환영합니다. 로그인 해 주세요.')
      })
      .catch(() => {
        alert('이미 등록된 이메일입니다. 다시 시도해주세요.')
      });
    }
  }

  render() {
    const { submitted } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Sign up</h1>
        <div className="form-group">
          <label className="control-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter Name"
            onChange={this.onChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="control-label">Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            aria-describedby="emailHelp"
            onChange={this.onChange}
            placeholder="Enter email"
            required
          />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label className="control-label">Phone Number</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            placeholder="Enter phone number"
            onChange={this.onChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="control-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            onChange={this.onChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="control-label">Password Confimation</label>
          <input
            type="password"
            className="form-control"
            name="passwordConfirmation"
            placeholder="Password"
            onChange={this.onChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="control-label">Your Cohort</label>
          <select className="form-control" name="cohort" onChange={this.onChange} >
            <option value="" disabled> Choose your cohort </option>
            <option> Flex 1기 </option>
            <option> Flex 2기 </option>
            <option> Full-time 1기</option>
            <option> Full-time 2기</option>
            <option> 주말 직장인 반 1기</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        {submitted ? <Redirect to="/login" /> : null}
        <div><Link to="/admin_signup" > 관리자 이십니까? </Link></div>
      </form>
    );
  }
}

export default SignupForm;