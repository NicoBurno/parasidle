import * as React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import { Game } from '../../../parasidle-core';
import { IGameState } from '../../../parasidle-core/types/state';

export interface IApplicationProps {
  game: Game;
}

export function GameContainer({ game }: IApplicationProps) {
  const [gameState, setGameState] = React.useState<IGameState>(game.getGameState());
  const handleMainClick = React.useCallback(() => {
    game.emit('click');
  }, [game]);
  const handleUpdateGameState = React.useCallback((state: IGameState) => {
    setGameState({ ...state });
  }, []);
  React.useEffect(() => {
    const unsubscribe = game.on('gameStateUpdate', handleUpdateGameState);

    return () => {
      unsubscribe();
    }
  }, [game, handleMainClick, handleUpdateGameState]);

  return (
    <div
      onClick={handleMainClick}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, userSelect: 'none', cursor: 'pointer' }}
    >
      <h2>Parasidle GUI React</h2>
      <div>
        Value: {gameState.value}
      </div>
      <div>
        {gameState.buildings.map(building => (
          <div key={building.id}>
            {building.title}#{building.count}
            <ButtonGroup color="primary">
              {[1, 10, 100].map(count => (
                <Button
                  key={`${building.id}_${count}`}
                  onClick={(e) => {
                    e.stopPropagation();

                    game.emit('buyBuilding', {
                      id: building.id,
                      count,
                    })
                  }}
                >
                  Buy {count}
                </Button>
              ))}
            </ButtonGroup>
          </div>
        ))}
      </div>
    </div>
  );
}
