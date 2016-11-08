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
const knownPaths = [
  'account',
  'background_tasks',
  'coding_rules',
  'dashboard',
  'groups',
  'issues',
  'maintenance',
  'metrics',
  'permission_templates',
  'projects',
  'projects_admin',
  'roles/global',
  'settings',
  'setup',
  'system',
  'quality_gates',
  'profiles',
  'updatecenter',
  'users',
  'web_api',
  'code',
  'component_issues',
  'component_measures',
  'custom_measures',
  'project/background_tasks',
  'project/settings',
  'project/deletion',
  'project/quality_profiles',
  'project/quality_gate',
  'project/links',
  'project/key',
  'project_roles'
];

export default function () {
  const currentPath = window.location.pathname;
  return knownPaths.some(knownPath => currentPath.includes(`${window.baseUrl}/${knownPath}`));
}
