import * as constants from './constants';
const courseList=[57,2]  //TODO 해당 운동과도 맞고 0.9이상인 경우에 색상 변경
const poseCounter=0
const lineWidth = 8;

export function setColor(index, accuracy){
 return index===courseList[poseCounter] ? (accuracy >=0.9 ? 'rgb(119,198,110)' : 'rgb(128,128,128)' ) : 'rgb(128,128,128)'
}
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

export function drawSkeleton(keypoints, minConfidence,index, accuracy, ctx,x,y) {
  const adjacentKeyPoints=getAdjacentPairs()
  let noKeypoints=0
    adjacentKeyPoints.slice(4,).forEach((line) => {
    if (keypoints[adjacentKeyPoints.indexOf(line)].score > minConfidence ){
      noKeypoints+=1
      
      drawSegment(
        toTuple(keypoints[line[0]]),
        toTuple(keypoints[line[1]]),
        setColor(index, accuracy),
        1,
        ctx
      );

    }
  });  
  if (noKeypoints<=10){
    ctx.beginPath();
    ctx.fillStyle = "rgba(1, 1, 1, 0.5)";
    ctx.rect(10, 20, 150, 100);

    ctx.font='bold 30px Arial';
    ctx.fillStyle='rgb(255,144,144)';
    ctx.fillText("화면에 전신이 나오도록 물러서 주세요.",x,y)
    }
    
}



export function drawKeypoints(keypoints, minConfidence,index,accuracy, ctx, scale = 1) {
  for (let i = 5; i < keypoints.length; i++) {
    const keypoint = keypoints[i];
    
    if (keypoint.score < minConfidence) {
        continue;
      } 

    drawPoint(ctx, keypoint.y *scale, keypoint.x * scale, 3, setColor(index, accuracy));
  }
}

export function putText(txt, canvas,x,y){
  const ctx = canvas.current.getContext("2d");
  ctx.beginPath();
  // ctx.font='bold 40px Arial';
  ctx.fillStyle='rgb(255,144,144)';
  // var accPerct = Math.round(accuracy*100);
  // ctx.fillText(accPerct,5,40);

  ctx.font='60px Arial';
  ctx.fillText(txt,x,y);

}