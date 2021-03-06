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
package org.sonar.scanner.scan;

import org.apache.commons.lang.StringUtils;
import org.picocontainer.Startable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.sonar.api.CoreProperties;
import org.sonar.api.batch.fs.internal.DefaultFileSystem;
import org.sonar.api.config.Settings;
import org.sonar.api.utils.MessageException;
import org.sonar.scanner.repository.language.Language;
import org.sonar.scanner.repository.language.LanguagesRepository;

/**
 * Verifies that the property sonar.language is valid
 */
public class LanguageVerifier implements Startable {

  private static final Logger LOG = LoggerFactory.getLogger(LanguageVerifier.class);

  private final Settings settings;
  private final LanguagesRepository languages;
  private final DefaultFileSystem fs;

  public LanguageVerifier(Settings settings, LanguagesRepository languages, DefaultFileSystem fs) {
    this.settings = settings;
    this.languages = languages;
    this.fs = fs;
  }

  @Override
  public void start() {
    String languageKey = settings.getString(CoreProperties.PROJECT_LANGUAGE_PROPERTY);
    if (StringUtils.isNotBlank(languageKey)) {
      LOG.info("Language is forced to {}", languageKey);
      Language language = languages.get(languageKey);
      if (language == null) {
        throw MessageException.of("You must install a plugin that supports the language '" + languageKey + "'");
      }

      // force the registration of the language, even if there are no related source files
      fs.addLanguages(languageKey);
    }
  }

  @Override
  public void stop() {
    // nothing to do
  }
}
