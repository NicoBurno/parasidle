
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Application } from './Application';

const APPLICATION_CONTAINER_ID = 'parasidle';

let container = document.getElementById(APPLICATION_CONTAINER_ID);

if (!container) {
  container = document.createElement('div');
  container.id = APPLICATION_CONTAINER_ID;

  document.body.appendChild(container);
}

ReactDOM.render(<Application />, container);
