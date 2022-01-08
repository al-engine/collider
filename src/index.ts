import GameObject, { GameObjectParams } from '@al-engine/game_object';

export default class CollisionResolver<
  Params extends GameObjectParams
> extends GameObject<Params> {
  colliders = Array<GameObject<Params>>();

  register = (gameObject: GameObject<Params>) => {
    this.colliders.push(gameObject);
  };

  unregister = (gameObject: GameObject<Params>) => {
    const index = this.colliders.indexOf(gameObject);
    if (index !== -1) {
      this.colliders.splice(index, 1);
    }
  };
  check = (obj: GameObject<Params> & CollisionReceiver<Params>) => {
    for (let collider of this.colliders) {
      if (collider !== obj) {
        const objPosition = obj.getAbsolutePosition();
        const colliderPosition = collider.getAbsolutePosition();
        if (
          objPosition.x < colliderPosition.x + collider.size.width &&
          objPosition.x + obj.size.width > colliderPosition.x &&
          objPosition.y < colliderPosition.y + collider.size.height &&
          objPosition.y + obj.size.height > colliderPosition.y
        ) {
          obj.receiveCollision(collider);
        }
      }
    }
  };
}

export interface CollisionReceiver<Params extends GameObjectParams> {
  receiveCollision(other: GameObject<Params>): void;
}

export {
  ensureValidMovement,
  calcPositionFor,
  OldPosition,
} from './obstaclesCollision';
