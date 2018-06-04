
export function sample(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function getFrame(sprite) {
  return {
    x: sprite.x - (sprite.width / 2),
    y: sprite.y - (sprite.height / 2),
    width: sprite.width * sprite.scaleX,
    height: sprite.height * sprite.scaleY,
  };
}

export function getCorners(sprite) {
  const { x, y, width, height} = getFrame(sprite);
  const left = x;
  const right = x + width;
  const top = y;
  const bottom = y + height;

  return [
    { y: top, x: left },
    { y: top, x: right },
    { y: bottom, x: left },
    { y: bottom, x: right },
  ];
}

export function isOverlapping(spriteA, spriteB) {
  const frameA = getFrame(spriteA);
  const cornersB = getCorners(spriteB);
  if(
    isPointInRect(cornersB[0], frameA) ||
    isPointInRect(cornersB[1], frameA) ||
    isPointInRect(cornersB[2], frameA) ||
    isPointInRect(cornersB[3], frameA)
  ) return true;

  const frameB = getFrame(spriteB);
  const cornersA = getCorners(spriteA);
  if(
    isPointInRect(cornersA[0], frameB) ||
    isPointInRect(cornersA[1], frameB) ||
    isPointInRect(cornersA[2], frameB) ||
    isPointInRect(cornersA[3], frameB)
  ) return true;

  return false;
}

export function isPointInRect(point, rect) {
  return point.x >= rect.x &&
    point.y >= rect.y &&
    point.x < rect.x + rect.width &&
    point.y < rect.y + rect.height;
}

export function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
