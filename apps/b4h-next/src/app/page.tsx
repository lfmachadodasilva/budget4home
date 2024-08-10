'use client';

import { B4hButton, B4hDropdown, B4hSpinner } from '@b4h/web-components';

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  return (
    <div>
      Home
      <B4hButton>Click me</B4hButton>
      <B4hDropdown>
        <p>Open</p>
        <option key="1" value="1">
          Option 1
        </option>
        <option key="2" value="2">
          Option 2
        </option>
      </B4hDropdown>
      <B4hSpinner size={32} />
    </div>
  );
}
