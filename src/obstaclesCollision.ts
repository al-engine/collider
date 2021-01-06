import GameObject, {GameObjectParams} from "game_object";

export interface OldPosition {
  oldPosition: {
    x: number,
    y: number,
  }
}

export function calcPositionFor<T extends GameObjectParams>({movingObj, obstacles}: {movingObj: GameObject<T> & OldPosition, obstacles: GameObject<T>}) {
  if (movingObj.speed.x === 0) {
    if (movingObj.speed.y > 0) {
      movingObj.position.y = calcLimitedMoving(movingObj.speed.y, movingObj.position.y, obstacles.position.y - movingObj.size.height);
    } else {
      movingObj.position.y = calcLimitedMoving(movingObj.speed.y, movingObj.position.y, obstacles.position.y + obstacles.size.height);
    }
  } else if (movingObj.speed.y === 0) {
    if (movingObj.speed.x > 0) {
      movingObj.position.x = calcLimitedMoving(movingObj.speed.x, movingObj.position.x, obstacles.position.x - movingObj.size.width);
    } else {
      movingObj.position.x = calcLimitedMoving(movingObj.speed.x, movingObj.position.x, obstacles.position.x + obstacles.size.width);
    }
  } else if (movingObj.speed.x > 0) {
    if (movingObj.speed.y > 0) {
      if (obstacles.position.x < movingObj.oldPosition.x + movingObj.size.width) {
        movingObj.position.y = calcLimitedMoving(movingObj.speed.y, movingObj.position.y, obstacles.position.y - movingObj.size.height);
      } else if (obstacles.position.y < movingObj.oldPosition.y + movingObj.size.height) {
        movingObj.position.x = calcLimitedMoving(movingObj.speed.x, movingObj.position.x, obstacles.position.x - movingObj.size.width);
      }
    } else {
      if (obstacles.position.x < movingObj.oldPosition.x + movingObj.size.width) {
        movingObj.position.y = calcLimitedMoving(movingObj.speed.y, movingObj.position.y, obstacles.position.y + obstacles.size.height);
      } else if (obstacles.position.y + obstacles.size.height > movingObj.oldPosition.y) {
        movingObj.position.x = calcLimitedMoving(movingObj.speed.x, movingObj.position.x, obstacles.position.x - movingObj.size.width);
      }
    }
  } else {
    if (movingObj.speed.y < 0) {
      if (obstacles.position.x + obstacles.size.width > movingObj.oldPosition.x) {
        movingObj.position.y = calcLimitedMoving(movingObj.speed.y, movingObj.position.y, obstacles.position.y + obstacles.size.height);
      } else if (obstacles.position.y + obstacles.size.height > movingObj.oldPosition.y) {
        movingObj.position.x = calcLimitedMoving(movingObj.speed.x, movingObj.position.x, obstacles.position.x + obstacles.size.width);
      }
    } else {
      if (obstacles.position.x + obstacles.size.width > movingObj.oldPosition.x) {
        movingObj.position.y = calcLimitedMoving(movingObj.speed.y, movingObj.position.y, obstacles.position.y - movingObj.size.height);
      } else if (obstacles.position.y < movingObj.oldPosition.y + movingObj.size.height) {
        movingObj.position.x = calcLimitedMoving(movingObj.speed.x, movingObj.position.x, obstacles.position.x + obstacles.size.width);
      }
    }
  }
}

function calcLimitedMoving (speed: number, limit: number, value: number) {
  if (speed > 0) {
    if (limit > value) {
      return value;
    }
  } else if (speed < 0) {
    if (limit < value) {
      return value
    }
  }

  return limit;
}

export function ensureValidMovement(oldPosition: number, newPosition: number, delta: number) {
  if (Math.abs(Math.abs(oldPosition) - Math.abs(newPosition)) > Math.abs(delta) + 0.006 ) {
    return oldPosition;
  }
  return newPosition;
}