import * as constants from './constants';

const color = "rgb(255, 114, 114)";
const lineWidth = 4;

function toTuple({ y, x }) {
  return [y, x];
}

export function drawPoint(ctx, y, x, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}


export function drawSegment([ay, ax], [by, bx], color, scale, ctx) {
  ctx.beginPath();
  ctx.moveTo(ax * scale, ay * scale);
  ctx.lineTo(bx * scale, by * scale);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.stroke();
}

export function getAdjacentPairs() {
      return constants.COCO_CONNECTED_KEYPOINTS_PAIRS;
  
}

export function drawSkeleton(keypoints, minConfidence, ctx, scale = 1) {
  const adjacentKeyPoints=getAdjacentPairs()


  adjacentKeyPoints.forEach((line) => {
    if (keypoints[adjacentKeyPoints.indexOf(line)].score > minConfidence){
      drawSegment(
        toTuple(keypoints[line[0]]),
        toTuple(keypoints[line[1]]),
        color,
        scale,
        ctx
      );
    }
  });
}



export function drawKeypoints(keypoints, minConfidence, ctx, scale = 1) {
  for (let i = 0; i < keypoints.length; i++) {
    const keypoint = keypoints[i];

    if (keypoint.score < minConfidence) {
      continue;
    }

    drawPoint(ctx, keypoint.y *scale, keypoint.x * scale, 3, color);
  }}


export  function argMax(array) {
    return [].reduce.call(array, (m, c, i, arr) => c > arr[m] ? i : m, 0)
  }