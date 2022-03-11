# [🧘](https://emojipedia.org/yoga/) WellAI(웰라이)
  *언제 어디서나 당신의 건강을 책임지는 AI 홈트 서비스, 웰라이*
## 사용한 언어, 프레임워크, 라이브러리
<img src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=white">

<img src="https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=TensorFlow&logoColor=white"/> <img src="https://img.shields.io/badge/Keras-%23D00000.svg?style=for-the-badge&logo=Keras&logoColor=white"/>

<img src='https://img.shields.io/badge/scikit--learn-%23F7931E.svg?style=for-the-badge&logo=scikit-learn&logoColor=white'></a> <img src="https://img.shields.io/badge/pandas-150458?style=for-the-badge&logo=pandas&logoColor=white"/></a>
<img src='https://img.shields.io/badge/opencv-%23white.svg?style=for-the-badge&logo=opencv&logoColor=white'>
## 데이터셋 
- 요가 이미지 데이터 셋
  - [Yoga-82: A New Dataset for Fine-grained Classification of Human Poses](https://arxiv.org/abs/2004.10362)
  - [Yoga Pose Image classification dataset](https://www.kaggle.com/shrutisaxena/yoga-pose-image-classification-dataset)

## 역할
 1. 인공지능 서비스 초기 기획, 조사 (시장성, 난이도, 실현 가능성 여부 체크)
 2. 데이터 수집, 데이터 EDA(Exploratory Data Analysis , 탐색적 데이터 분석), 전처리, 모델로 전처리, 모델링, 모델 평가 및 선택
 3. tfjs로 클라이언트 사이드 모델로 변환 및 경량화
 4. 메인 서비스 테스트 코드 작성 및 모델 테스트

 ### 자동화
 - 과정을 최대한 자동화 하도록 노력함
    - 1. 이미지 수집 
      -  이미지 진척도 확인
      -  디렉토리 형식으로 관리
   - 2. 이미지 전처리
     - 이미지 형식 조건에 맞지 않으면 제거,변환
     - 저(低)질의 이미지 딥러닝 모델로 threshold 주어 제거
  - 3. 데이터 전처리
    - 자주 사용하는 처리는 함수 만들어 사용
    - 모델 레이어
  - 4. 모델 학습
    - early Stopping
    - checkpoints
  - 5. 모델 평가
    - 자주 사용하는 평가 메트릭 함수 작성(라이브러리 활용)
  - 6. 모델 하이퍼파라미터 튜닝
    - Auto ML 활용

