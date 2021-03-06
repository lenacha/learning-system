import React from 'react';
import {
  HashRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import axios from 'axios';
import { CssBaseline } from '@material-ui/core';

import NavigationBar from './components/NavigationBar';
import Home from './components/Main/Home';
import Classroom from './components/Main/Classroom/Classroom';
import SignupForm from './components/SignForm/SignUpForm';
import AdminSignupForm from './components/SignForm/AdminSignUpForm';
import SignInForm from './components/SignForm/SignInForm';
import SignOut from './components/SignForm/SignOut';
import Dashboard from './components/Dashboard';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      userId: 0,
      course: {},
      isAdmin: false,
      name: '',
      selectedCourse: 0,
      selectedCourseItem: null,
    };
    this.signIn = this.signIn.bind(this);
    this.signout = this.signout.bind(this);
    this.fetchUserData = this.fetchUserData.bind(this);
    this.fetchCourseData = this.fetchCourseData.bind(this);
    this.onViewClick = this.onViewClick.bind(this);
  }

  componentDidMount() {
    this.fetchUserData();
  }

  onViewClick(e) {
    const { course } = this.state;
    this.setState({
      selectedCourse: e,
      selectedCourseItem: course[e],
    });
  }

  fetchUserData() {
    const { userId, isAdmin } = this.state;

    axios.get(`/user?id=${userId}`, { isAdmin })
      .then((result) => {
        if (result.status === 200) {
          this.setState({
            signedIn: true,
            userId: result.data.id,
            isAdmin: result.data.admin,
            name: result.data.name,
          });
        }
      })
      .then(() => {
        this.fetchCourseData();
      });
  }

  fetchCourseData() {
    const { userId, isAdmin, selectedCourse } = this.state;
    axios.get('/api/courses', {
      params: {
        id: userId,
        isAdmin,
      },
    })
      .then((res) => {
        const loadedCourses = res.data;
        const courseObj = loadedCourses.reduce((acc, cur) => {
          acc[cur.id] = cur;
          return acc;
        }, {});
        this.setState({
          course: courseObj,
          selectedCourseItem: selectedCourse === 0 ? null : courseObj[selectedCourse],
        });
      });
  }

  signIn(user) {
    this.setState({
      signedIn: true,
      userId: user.id,
      isAdmin: user.admin,
      name: user.name,
    }, this.fetchUserData);
  }

  signout() {
    axios.get('/api/signout');
    this.setState({
      signedIn: false,
      isAdmin: false,
      userId: 0,
      name: '',
      selectedCourse: 0,
    });
  }


  render() {
    const {
      signedIn, name, course, isAdmin, selectedCourse, selectedCourseItem, userId,
    } = this.state;
    const PrivateRoute = () => (
      <Route
        render={() => (
          signedIn
            ? (
              <Classroom
                course={course}
                selectedCourse={selectedCourse}
                isAdmin={isAdmin}
                adminName={name}
                selectedCourseItem={selectedCourseItem}
                fetchCourseData={this.fetchCourseData}
              />
            )
            : <Redirect to="/signin" />
        )}
      />
    );

    return (
      <Router>
        <CssBaseline />
        <NavigationBar name={name} signedIn={signedIn} signout={this.signout} />
        <Switch>
          <Route exact path="/signin">
            <SignInForm signIn={this.signIn} signedIn={signedIn} />
          </Route>
          <Route exact path="/signup">
            <SignupForm />
          </Route>
          <Route exact path="/">
            <Home
              signedIn={signedIn}
              course={course}
              isAdmin={isAdmin}
              adminName={name}
              fetchCourseData={this.fetchCourseData}
              selectedCourse={selectedCourse}
              onViewClick={this.onViewClick}
              userId={userId}
            />
          </Route>
          <Route exact path="/admin_signup">
            <AdminSignupForm />
          </Route>
          <Route exact path="/signout">
            <SignOut signout={this.signout} />
          </Route>
          <PrivateRoute path="/classroom" />
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
