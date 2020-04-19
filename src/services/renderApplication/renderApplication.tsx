
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Application, IApplicationProps } from '../../containers/Application';

export function renderApplication(props: IApplicationProps) {
  const container = ensureContainer();

  ReactDOM.render(<Application {...props} />, container);
}

const APPLICATION_CONTAINER_ID = 'parasidle';

function ensureContainer() {
  let container = document.getElementById(APPLICATION_CONTAINER_ID);

  if (!container) {
    container = document.createElement('div');
    container.id = APPLICATION_CONTAINER_ID;

    document.body.appendChild(container);
  }

  return container;
}
