import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Router, IndexRoute, browserHistory} from 'react-router';

import AppComponent from './components/app.component';
import GithubMainComponent from './components/github_profile/main.component';
import QuizMainComponent from './components/quizzes/main.component';
import MovieMainComponent from './components/movie_find/components/main.component';
import MovieWrapperComponent from './components/movie_find/components/movieWrapper.component';
import WeatherMainComponent from './components/weather/main.component';
import NoteMainComponent from './components/simplenote/main.component';
import ContactListMainComponent from './flux/contact-list/contactListMain.component';
import StickyPadMainComponent from './flux/stickypad/stickypadMain.component';
import AdminUsersMainComponent from './flux/admin-users/adminUsersMain.component';

$(document).on('ready', () => {
  ReactDOM.render(
    <Router history={browserHistory}>
      <Route path="/" component={AppComponent}>
        <IndexRoute component={GithubMainComponent}></IndexRoute>
        <Route path="/quizzes" component={QuizMainComponent}></Route>
        <Route path="/movies" component={MovieMainComponent}></Route>
        <Route path="/movies/:movie_id" component={MovieWrapperComponent}></Route>
        <Route path="/weather" component={WeatherMainComponent}></Route>
        <Route path="/simplenote" component={NoteMainComponent}></Route>
        <Route path="/contact-list" component={ContactListMainComponent}></Route>
        <Route path="/sticky-pads" component={StickyPadMainComponent}></Route>
        <Route path="/admin-users" component={AdminUsersMainComponent}></Route>
      </Route>
    </Router>,
  document.getElementById('app-wrapper'))
});
