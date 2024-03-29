import * as React from 'react';

import { Game } from '../../../../packages/parasidle-core';
import { IGameState } from '../../../../packages/parasidle-core/types/state';

export interface IApplicationProps {
  game: Game;
}

export function Application({ game }: IApplicationProps) {
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
  }, [handleMainClick]);

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
            {[1, 10, 100].map(count => (
              <button
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
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
