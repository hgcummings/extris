import R from "ramda";

import BlockData from "../data/block.json";
import * as matrix from "../utils/matrix";

const types =
  R.addIndex(R.map)((item, type) =>
    R.zipWith((data, position) =>
      ({ ...item, type, data, position }),
      R.scan(matrix.rotate, item.data, R.range(1, 4)),
      item.position),
    BlockData.types);

export default ({ type, rotate = 0, x = 0, y = 0 } = {}) =>
  ({ type, rotate, x, y });

export const rotate = (block, direction) => ({
  ...block,
  rotate: R.mathMod(block.rotate + direction, 4),
});

export const ROTATE_LEFT = -1;
export const ROTATE_RIGHT = 1;

export const moveTo = (block, x, y) =>
  ({ ...block, x, y });

export const moveBy = (block, x, y) => ({
  ...block,
  x: block.x + x,
  y: block.y + y,
});

export const getData = ({ type, rotate }) =>
  types[type][rotate];
