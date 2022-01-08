import GameObject, { GameObjectParams } from '@al-engine/game_object';
import { Position } from '@al-engine/core';

export interface OldPosition {
  oldPosition: {
    x: number;
    y: number;
  };
}

export function calcPositionFor<T extends GameObjectParams>({
  movingObj,
  obstacles,
}: {
  movingObj: GameObject<T> & OldPosition;
  obstacles: GameObject<T>;
}) {
  const objPosition = movingObj.getAbsolutePosition();
  const obstaclePosition = obstacles.getAbsolutePosition();
  let oldPosition: Position;
  if (movingObj.parent) {
    oldPosition = {
      x: movingObj.oldPosition.x + movingObj.parent.position.x,
      y: movingObj.oldPosition.y + movingObj.parent.position.y,
    }
  }
  oldPosition = {...movingObj.oldPosition};
  if (movingObj.speed.x === 0) {
    if (movingObj.speed.y > 0) {
      movingObj.setAbsolute({y: calcLimitedMoving(
        movingObj.speed.y,
        objPosition.y,
        obstaclePosition.y - movingObj.size.height
      )});
    } else {
      movingObj.setAbsolute({y: calcLimitedMoving(
        movingObj.speed.y,
        objPosition.y,
        obstaclePosition.y + obstacles.size.height
      )});
    }
  } else if (movingObj.speed.y === 0) {
    if (movingObj.speed.x > 0) {
      movingObj.setAbsolute({x: calcLimitedMoving(
        movingObj.speed.x,
        objPosition.x,
        obstaclePosition.x - movingObj.size.width
      )});
    } else {
      movingObj.setAbsolute({x: calcLimitedMoving(
        movingObj.speed.x,
        objPosition.x,
        obstaclePosition.x + obstacles.size.width
      )});
    }
  } else if (movingObj.speed.x > 0) {
    if (movingObj.speed.y > 0) {
      if (
        obstaclePosition.x <
        oldPosition.x + movingObj.size.width
      ) {
        movingObj.setAbsolute({y: calcLimitedMoving(
          movingObj.speed.y,
          objPosition.y,
          obstaclePosition.y - movingObj.size.height
        )});
      } else if (
        obstaclePosition.y <
        oldPosition.y + movingObj.size.height
      ) {
        movingObj.setAbsolute({x: calcLimitedMoving(
          movingObj.speed.x,
          objPosition.x,
          obstaclePosition.x - movingObj.size.width
        )});
      }
    } else {
      if (
        obstaclePosition.x <
        oldPosition.x + movingObj.size.width
      ) {
        movingObj.setAbsolute({y = calcLimitedMoving(
          movingObj.speed.y,
          objPosition.y,
          obstaclePosition.y + obstacles.size.height
        )});
      } else if (
        obstaclePosition.y + obstacles.size.height >
        oldPosition.y
      ) {
        movingObj.setAbsolute({x: calcLimitedMoving(
          movingObj.speed.x,
          objPosition.x,
          obstaclePosition.x - movingObj.size.width
        )});
      }
    }
  } else {
    if (movingObj.speed.y < 0) {
      if (
        obstaclePosition.x + obstacles.size.width >
        oldPosition.x
      ) {
        movingObj.setAbsolute({y: calcLimitedMoving(
          movingObj.speed.y,
          objPosition.y,
          obstaclePosition.y + obstacles.size.height
        )});
      } else if (
        obstaclePosition.y + obstacles.size.height >
        oldPosition.y
      ) {
        movingObj.setAbsolute({x: calcLimitedMoving(
          movingObj.speed.x,
          objPosition.x,
          obstaclePosition.x + obstacles.size.width
        )});
      }
    } else {
      if (
        obstaclePosition.x + obstacles.size.width >
        oldPosition.x
      ) {
        movingObj.setAbsolute({y: calcLimitedMoving(
          movingObj.speed.y,
          objPosition.y,
          obstaclePosition.y - movingObj.size.height
        )});
      } else if (
        obstaclePosition.y <
        oldPosition.y + movingObj.size.height
      ) {
        movingObj.setAbsolute({x: calcLimitedMoving(
          movingObj.speed.x,
          objPosition.x,
          obstaclePosition.x + obstacles.size.width
        )});
      }
    }
  }
}

function calcLimitedMoving(speed: number, limit: number, value: number) {
  if (speed > 0) {
    if (limit > value) {
      return value;
    }
  } else if (speed < 0) {
    if (limit < value) {
      return value;
    }
  }

  return limit;
}

export function ensureValidMovement(
  oldPosition: number,
  newPosition: number,
  delta: number
) {
  if (
    Math.abs(Math.abs(oldPosition) - Math.abs(newPosition)) >
    Math.abs(delta) + 0.006
  ) {
    return oldPosition;
  }
  return newPosition;
}
