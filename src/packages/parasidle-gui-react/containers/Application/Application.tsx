import * as React from 'react';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import { Game } from '../../../../packages/parasidle-core';

import { GameContainer } from '../GameContainer';

export interface IApplicationProps {
  game: Game;
}

export function Application({ game }: IApplicationProps) {
  return (
    <ScopedCssBaseline>
      <GameContainer game={game} />
    </ScopedCssBaseline>
  );
}
