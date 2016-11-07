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

import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.sonar.core.util.InternalUuidFactory;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;

public class BaseRequestUidGeneratorImplTest {
  @Rule
  public ExpectedException expectedException = ExpectedException.none();

  private InternalUuidFactory internalUuidFactory = mock(InternalUuidFactory.class);
  private BaseRequestUidGeneratorImpl underTest = new BaseRequestUidGeneratorImpl(internalUuidFactory);

  @Test
  public void get_throws_ISE_if_start_has_not_been_called() {
    expectedException.expect(IllegalStateException.class);
    expectedException.expectMessage("Base request id has not yet been generated");

    underTest.get();
  }

  @Test
  public void get_returns_InternalUuidFactory_first_createAsByteArray_response_after_start_has_been_called() {
    byte[] expected = {1, 0, 1};
    when(internalUuidFactory.createAsByteArray())
      .thenReturn(expected)
      .thenThrow(new RuntimeException("createAsByteArray should not be called twice"));

    underTest.start();
    for (int i = 0; i < 1000; i++) {
      assertThat(underTest.get()).isSameAs(expected);
    }
  }

  @Test
  public void start_throws_ISE_if_called_twice() {
    when(internalUuidFactory.createAsByteArray()).thenReturn(new byte[] {0, 1});
    underTest.start();

    expectedException.expect(IllegalStateException.class);
    expectedException.expectMessage("Base request id is already generated");

    underTest.start();
  }

  @Test
  public void stop_has_no_effect() {
    underTest.stop();

    verifyNoMoreInteractions(internalUuidFactory);
  }
}
