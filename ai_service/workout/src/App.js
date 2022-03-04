import React, { useRef } from "react";
import "./App.css";
import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton, putText } from "./utilities";
import {setUp,average, argMax} from "./setup";

import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import {loadGraphModel} from '@tensorflow/tfjs-converter';
import * as poseDetection from '@tensorflow-models/pose-detection';
//TODO : 백으로부터 운동 값 가져오기
const url='model_url'
const detectorConfig = {modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER};//SINGLEPOSE_LIGHTNING
const { JSDOM } = require("jsdom");
const { window } = new JSDOM();
const fps =30;

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runMovenet = async () => {
    const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);
    const dnn76= await loadGraphModel(url)

    setInterval(() => {
      detect(detector,dnn76);
    }, 1000/fps); //30fps 250 frame 평균: 19.507200004000165

  }; 
  setUp();

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
        //var start = window.performance.now();
        const result= await poseClassify(dnn76,pose);
        //var end = window.performance.now();
        //execTime.push(end - start);
        //console.log(`Execution time1: ${end - start} ms`);

        
        drawCanvas(pose,result[0],result[1], video, videoWidth, videoHeight, canvasRef);
        putText(result[0],canvasRef,50,30);
        putText(result[1],canvasRef,50,60);

     // Printing memory information  
      poseClassify(dnn76,pose);

    }
     }; 

    var execTime = []

    function poseClassify(dnn76,pose){
      if(pose){
        let inputs= [];   

        for (let i=0 ; i <pose[0].keypoints.length;i++){
            let x=pose[0]["keypoints"][i].x;
            let y=pose[0]["keypoints"][i].y;
            let score=pose[0]["keypoints"][i].score;
            inputs.push(x);
            inputs.push(y);
            inputs.push(score);
          } 
          const inputs1D=tf.tensor(inputs,[1,51])
          var start = window.performance.now();
          const pred= dnn76.predict(inputs1D)
          var end = window.performance.now();
          //console.log(`Execution time2: ${end - start} ms`);
          execTime.push(end - start);
          //console.log('어레이, 길이:',execTime,execTime.length );
          console.log('평균:',average(execTime));

          const index = argMax(pred.dataSync() );
          const predict = pred.dataSync(); 
          const accuracy = predict[index];
        
          console.log(index)
          console.log( accuracy)
        return[index,accuracy]
      }
      else{
        setTimeout(poseClassify(dnn76,pose),1000/fps);//30fps 250 frame 평균: 12.356800036000372
      }
  }

  
  const drawCanvas = (pose, index, accuracy, video, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    drawKeypoints(pose[0]["keypoints"], 0.6,index,accuracy,ctx);
    drawSkeleton(pose[0]["keypoints"], 0.5, index,accuracy,ctx, 20, 480/2);
  };
  
  runMovenet();
  console.log('numBytes : ' + tf.memory().numBytes);
  console.log('numTensors (outside tidy): ' + tf.memory().numTensors);
  console.log('numDataBuffers : ' + tf.memory().numDataBuffers);   
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
