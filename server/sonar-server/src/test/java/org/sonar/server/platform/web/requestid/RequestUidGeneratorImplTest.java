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
package org.sonar.server.platform.web.requestid;

import java.util.HashSet;
import java.util.Set;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.Timeout;
import org.sonar.core.util.UuidFactoryFast;

import static org.assertj.core.api.Assertions.assertThat;

public class RequestUidGeneratorImplTest {
  // a failsafe but also some kind of performance watch dog
  @Rule
  public Timeout timeout = Timeout.seconds(1);

  @Test
  public void generate_returns_only_unique_values() {
    byte[] base = UuidFactoryFast.getInstance().createAsByteArray();
    RequestUidGeneratorImpl underTest = new RequestUidGeneratorImpl(() -> base);

    Set<String> requestIds = new HashSet<>();
    int count = 100_000;
    for (int i = 0; i < count; i++) {
      requestIds.add(underTest.generate());
    }
    assertThat(requestIds).hasSize(count);
  }
}
