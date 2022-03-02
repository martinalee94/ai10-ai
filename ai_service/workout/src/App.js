import React, { useRef } from "react";
import "./App.css";
import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton } from "./utilities";

import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import {loadGraphModel} from '@tensorflow/tfjs-converter';
import * as poseDetection from '@tensorflow-models/pose-detection';

 tf.setBackend("cpu")
const url='https://raw.githubusercontent.com/yeseulKIM00/test/main/graph/model.json'
const detectorConfig = {modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER};//SINGLEPOSE_LIGHTNING

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runMovenet = async () => {
    const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);
    const dnn76= await loadGraphModel(url)

    setInterval(() => {
      detect(detector,dnn76);
    }, 100);
  };
  const detect = async (detector,dnn76) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      const pose = await detector.estimatePoses(video);
      drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);

      poseClassify(dnn76,pose);
    }
  };

  const poseClassify=(dnn76,pose)=>{
    if(pose){
      let inputs=[];
      for (let i=0 ; i <pose[0].keypoints.length;i++){
        let x=pose[0]["keypoints"][i].x;
        let y=pose[0]["keypoints"][i].y;
        let score=pose[0]["keypoints"][i].score;
        inputs.push(x);
        inputs.push(y);
        inputs.push(score);
      } 
      const input_tensor= tf.tensor1d(inputs);
      const pred= dnn76.predict(input_tensor.reshape([1,51]))
      console.log("prediction:",pred.dataSync())

      const index =pred.argMax(1).dataSync()[0] 
      const predict = pred.dataSync(); 
      const value = predict[index];
    
      console.log(index)
      console.log( value)
    }
    else{
      setTimeout(poseClassify,100);
    }
  }

  const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    drawKeypoints(pose[0]["keypoints"], 0.6, ctx);
    drawSkeleton(pose[0]["keypoints"], 0.4, ctx);
  };

  runMovenet();

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default App;
