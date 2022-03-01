import React, { useRef } from "react";
import "./App.css";
import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton } from "./utilities";

import * as poseDetection from '@tensorflow-models/pose-detection';

//import '@tensorflow/tfjs-backend-wasm';
import '@tensorflow/tfjs-backend-webgl';

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

const detectorConfig = {modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER};//SINGLEPOSE_LIGHTNING
  const runMovenet = async () => {
    const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);

    setInterval(() => {
      detect(detector);
    }, 100);
  };
  
  const detect = async (detector) => {
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

      console.log(pose);
      drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
    }
  };

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
