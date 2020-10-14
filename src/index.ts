import GameObject, {Params} from "game_object";

export default class CollisionResolver<GameObjectParams extends Params> extends GameObject<GameObjectParams> {

  colliders = Array<GameObject<GameObjectParams>>();

  register = (gameObject: GameObject<GameObjectParams>) => {
    this.colliders.push(gameObject);
  };

  unregister = (gameObject: GameObject<GameObjectParams>) => {
    const index = this.colliders.indexOf(gameObject);
    if (index !== -1) {
      this.colliders.splice(index, 1);
    }
  };
  check = (obj: GameObject<GameObjectParams> & CollisionReceiver<GameObjectParams>) => {
    for(let collider of this.colliders) {
      if (collider !== obj) {
        if (obj.position.x < collider.position.x + collider.size.width &&
          obj.position.x + obj.size.width > collider.position.x &&
          obj.position.y < collider.position.y + collider.size.height &&
          obj.position.y + obj.size.height > collider.position.y) {
          obj.receiveCollision(collider);
        }
      }
    }
  };
}

export interface CollisionReceiver<GameObjectParams extends Params> {
  receiveCollision(other: GameObject<GameObjectParams>):void;
}

export { ensureValidMovement, calcPositionFor, OldPosition } from "./obstaclesCollision";