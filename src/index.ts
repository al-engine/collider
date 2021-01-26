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
        if (
          obj.position.x < collider.position.x + collider.size.width &&
          obj.position.x + obj.size.width > collider.position.x &&
          obj.position.y < collider.position.y + collider.size.height &&
          obj.position.y + obj.size.height > collider.position.y
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
