import * as React from 'react';

import { Game } from '../../packages/parasidle-core';
import { Application as ParasidleGUIReact } from '../../packages/parasidle-gui-react';

export interface IApplicationProps {
  game: Game;
}

export function Application({ game }: IApplicationProps) {
  return (
    <ParasidleGUIReact game={game} />
  );
}
