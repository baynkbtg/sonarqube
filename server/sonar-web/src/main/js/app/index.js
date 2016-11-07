/*
 * SonarQube
 * Copyright (C) 2009-2016 SonarSource SA
 * mailto:contact AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import { Provider } from 'react-redux';
import App from './components/App';
import ComponentContainer from './components/ComponentContainer';
import accountRoutes from '../apps/account/routes';
import codeRoutes from '../apps/code/routes';
import codingRulesRoutes from '../apps/coding-rules/routes';
import componentIssuesRoutes from '../apps/component-issues/routes';
import customMeasuresRoutes from '../apps/custom-measures/routes';
import groupsRoutes from '../apps/groups/routes';
import issuesRoutes from '../apps/issues/routes';
import metricsRoutes from '../apps/metrics/routes';
import overviewRoutes from '../apps/overview/routes';
import permissionTemplatesRoutes from '../apps/permission-templates/routes';
import projectsRoutes from '../apps/projects/routes';
import projectsAdminRoutes from '../apps/projects-admin/routes';
import qualityGatesRoutes from '../apps/quality-gates/routes';
import qualityProfilesRoutes from '../apps/quality-profiles/routes';
import systemRoutes from '../apps/system/routes';
import updateCenterRoutes from '../apps/update-center/routes';
import usersRoutes from '../apps/users/routes';
import webAPIRoutes from '../apps/web-api/routes';
import { maintenanceRoutes, setupRoutes } from '../apps/maintenance/routes';
import configureStore from '../components/store/configureStore';
import rootReducer from './store/rootReducer';
import './styles/index';

window.sonarqube.appStarted.then(options => {
  const el = document.querySelector(options.el);

  const history = useRouterHistory(createHistory)({
    basename: window.baseUrl + '/'
  });

  const store = configureStore(rootReducer);

  render((
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={App}>
            <Route path="account">{accountRoutes}</Route>
            <Route path="coding_rules">{codingRulesRoutes}</Route>
            <Route path="dashboard">{overviewRoutes}</Route>
            <Route path="groups">{groupsRoutes}</Route>
            <Route path="issues">{issuesRoutes}</Route>
            <Route path="maintenance">{maintenanceRoutes}</Route>
            <Route path="metrics">{metricsRoutes}</Route>
            <Route path="permission_templates">{permissionTemplatesRoutes}</Route>
            <Route path="projects_admin">{projectsAdminRoutes}</Route>
            <Route path="setup">{setupRoutes}</Route>
            <Route path="system">{systemRoutes}</Route>
            <Route path="updatecenter">{updateCenterRoutes}</Route>
            <Route path="users">{usersRoutes}</Route>
            <Route path="web_api">{webAPIRoutes}</Route>

            <Route component={ComponentContainer}>
              <Route path="code">{codeRoutes}</Route>
              <Route path="component_issues">{componentIssuesRoutes}</Route>
              <Route path="custom_measures">{customMeasuresRoutes}</Route>
            </Route>

            {projectsRoutes}
            {qualityGatesRoutes}
            {qualityProfilesRoutes}
          </Route>
        </Router>
      </Provider>
  ), el);
});
