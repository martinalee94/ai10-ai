import {loadGraphModel} from '@tensorflow/tfjs-converter';
import * as poseDetection from '@tensorflow-models/pose-detection';
import React, { useRef ,useState } from "react";
import "./App.css";
import Webcam from "react-webcam";
import { drawSkeleton, putText } from "./util";
import { average, argMax} from "./setup";
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import * as tfjsWasm from '@tensorflow/tfjs-backend-wasm';
tfjsWasm.setWasmPaths(
  `https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@${
      tfjsWasm.version_wasm}/dist/`);


//TODO : 백으로부터 운동 값 가져오기
const url='https://raw.githubusercontent.com/yeseulKIM00/test/main/graph/model.json'
const detectorConfig = {modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER};//SINGLEPOSE_LIGHTNING
const { JSDOM } = require("jsdom");
const { window } = new JSDOM();

var courseId=0;              //TODO API
const courseList=[57,2,15] ; //TODO API
var poseCounter=0;
const fps=10;
var iterationCounter=0;
var errorCounter=0;

var totalTimeCounter=0
var timeCounter= (courseId===0)?5:60;
var timeLimit=timeCounter*4*fps; //20s:240s

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
        const result= await classifyPose(dnn76,pose);
        //var end = window.performance.now();
        //execTime.push(end - start);
        //console.log(`Execution time1: ${end - start} ms`);

        
        drawCanvas(pose,result[0],result[1], video, videoWidth, videoHeight, canvasRef);
        putText(result[0],canvasRef,50,30);
        //putText(result[1],canvasRef,50,60);

      //putText(workReseults[0],canvasRef,500,30)
    }
     }; 

    var execTime = []

    function classifyPose(dnn76,pose){
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
          //var start = window.performance.now();
          const pred= dnn76.predict(inputs1D)
          //var end = window.performance.now();
          //console.log(`Execution time2: ${end - start} ms`);
          //execTime.push(end - start);
          //console.log('어레이, 길이:',execTime,execTime.length );
          //console.log('평균:',average(execTime));

          const poseIndex = argMax(pred.dataSync() );
          const predict = pred.dataSync(); 
          const accuracy =  Math.round(predict[poseIndex] *100);

        return[poseIndex,accuracy]
      }
      else{
        setTimeout(classifyPose(dnn76,pose),1000/fps);//30fps 250 frame 평균: 12.356800036000372
      }
  }
  
  const drawCanvas = (pose, poseIndex, accuracy, video, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;
    drawSkeleton(pose[0]["keypoints"], 0.5, poseIndex,accuracy,ctx, 50, 480/2);
  };
  

  runMovenet();
  // console.log('numBytes : ' + tf.memory().numBytes);
  // console.log('numTensors (outside tidy): ' + tf.memory().numTensors);
  // console.log('numDataBuffers : ' + tf.memory().numDataBuffers);   
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

