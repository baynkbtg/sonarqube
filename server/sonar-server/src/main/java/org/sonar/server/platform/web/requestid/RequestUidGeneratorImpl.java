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

import java.nio.ByteBuffer;
import java.util.Base64;
import java.util.concurrent.atomic.AtomicLong;

/**
 * This implementation of {@link RequestUidGenerator} create unique identifiers by adding the value of a counter
 * (starting with 0 and incremented by 1 with each call to {@link #generate()}) to the byte array returned
 * by the injected {@link BaseRequestUidGenerator} interpreted as a long.
 * <p>
 * This implementation is Thread safe.
 * </p>
 */
public class RequestUidGeneratorImpl implements RequestUidGenerator {
  private final AtomicLong counter = new AtomicLong();
  private final BaseRequestUidGenerator baseRequestUidGenerator;

  public RequestUidGeneratorImpl(BaseRequestUidGenerator baseRequestUidGenerator) {
    this.baseRequestUidGenerator = baseRequestUidGenerator;
  }

  @Override
  public String generate() {
    byte[] baseBytes = baseRequestUidGenerator.get();
    ByteBuffer buffer = ByteBuffer.allocate(baseBytes.length);
    buffer.put(baseBytes);
    buffer.flip();
    long baseLong = buffer.getLong();

    long increment = counter.incrementAndGet();
    long id = baseLong + increment;
    buffer.clear();
    buffer.putLong(id);

    return Base64.getEncoder().encodeToString(buffer.array());
  }

}
