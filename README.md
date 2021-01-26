# Al engine
## Collider

This is module for resolving collision.

```nashorn js
  const resolver = new CollisionResolver();

  // You need to [register] each game object wich can detect collision
  resolver.register(first);
  resolver.register(second);

  // You can [check] if your object collide with any of registered
  // It should implement CollisionReceiver interface
  // And if collision happens [receiveCollision] will be called
  resolver.check(third)
```  