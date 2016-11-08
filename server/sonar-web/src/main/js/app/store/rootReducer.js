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
import { combineReducers } from 'redux';
import components, * as fromComponents from './components/reducer';
import users, * as fromUsers from './users/reducer';
import favorites, * as fromFavorites from './favorites/reducer';
import languages, * as fromLanguages from './languages/reducer';
import measures, * as fromMeasures from './measures/reducer';
import globalMessages, * as fromGlobalMessages from '../../components/store/globalMessages';

import permissionsApp, * as fromPermissionsApp from '../../apps/permissions/shared/store/rootReducer';
import projectsApp, * as fromProjectsApp from '../../apps/projects/store/reducer';
import qualityGatesApp from '../../apps/quality-gates/store/rootReducer';
import settingsApp, * as fromSettingsApp from '../../apps/settings/store/rootReducer';

export default combineReducers({
  components,
  globalMessages,
  favorites,
  languages,
  measures,
  users,

  // apps
  permissionsApp,
  projectsApp,
  qualityGatesApp,
  settingsApp
});

export const getComponent = (state, key) => (
    fromComponents.getComponent(state.components, key)
);

export const getGlobalMessages = state => (
    fromGlobalMessages.getGlobalMessages(state.globalMessages)
);

export const getLanguages = (state, key) => (
    fromLanguages.getLanguages(state.languages, key)
);

export const getCurrentUser = state => (
    fromUsers.getCurrentUser(state.users)
);

export const getFavorites = state => (
    fromFavorites.getFavorites(state.favorites)
);

export const getComponentMeasure = (state, componentKey, metricKey) => (
    fromMeasures.getComponentMeasure(state.measures, componentKey, metricKey)
);

export const getComponentMeasures = (state, componentKey) => (
    fromMeasures.getComponentMeasures(state.measures, componentKey)
);

export const getProjects = state => (
    fromProjectsApp.getProjects(state.projectsApp)
);

export const getProjectsAppState = state => (
    fromProjectsApp.getState(state.projectsApp)
);

export const getProjectsAppFacetByProperty = (state, property) => (
    fromProjectsApp.getFacetByProperty(state.projectsApp, property)
);

export const getProjectsAppMaxFacetValue = state => (
    fromProjectsApp.getMaxFacetValue(state.projectsApp)
);

export const getQualityGatesAppState = state => (
    state.qualityGatesApp
);

export const getPermissionsAppUsers = state => (
    fromPermissionsApp.getUsers(state.permissionsApp)
);

export const getPermissionsAppGroups = state => (
    fromPermissionsApp.getGroups(state.permissionsApp)
);

export const isPermissionsAppLoading = state => (
    fromPermissionsApp.isLoading(state.permissionsApp)
);

export const getPermissionsAppQuery = state => (
    fromPermissionsApp.getQuery(state.permissionsApp)
);

export const getPermissionsAppFilter = state => (
    fromPermissionsApp.getFilter(state.permissionsApp)
);

export const getPermissionsAppSelectedPermission = state => (
    fromPermissionsApp.getSelectedPermission(state.permissionsApp)
);

export const getPermissionsAppError = state => (
    fromPermissionsApp.getError(state.permissionsApp)
);

export const getSettingsAppDefinition = (state, key) => (
    fromSettingsApp.getDefinition(state.settingsApp, key)
);

export const getSettingsAppAllCategories = state => (
    fromSettingsApp.getAllCategories(state.settingsApp)
);

export const getSettingsAppDefaultCategory = state => (
    fromSettingsApp.getDefaultCategory(state.settingsApp)
);

export const getSettingsAppSettingsForCategory = (state, category) => (
    fromSettingsApp.getSettingsForCategory(state.settingsApp, category)
);

export const getSettingsAppChangedValue = (state, key) => (
    fromSettingsApp.getChangedValue(state.settingsApp, key)
);

export const isSettingsAppLoading = (state, key) => (
    fromSettingsApp.isLoading(state.settingsApp, key)
);

export const getSettingsAppLicenseByKey = (state, key) => (
    fromSettingsApp.getLicenseByKey(state.settingsApp, key)
);

export const getSettingsAppAllLicenseKeys = state => (
    fromSettingsApp.getAllLicenseKeys(state.settingsApp)
);

export const getSettingsAppValidationMessage = (state, key) => (
    fromSettingsApp.getValidationMessage(state.settingsApp, key)
);

export const getSettingsAppEncryptionState = state => (
    fromSettingsApp.getEncryptionState(state.settingsApp)
);

export const getSettingsAppGlobalMessages = state => (
    fromSettingsApp.getGlobalMessages(state.settingsApp)
);
