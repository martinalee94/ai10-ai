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

 ### 진행 과정
  과정을 최대한 자동화 하도록 노력함
1. 이미지 수집 
  - 이미지 관련 조사
  - 이미지 수집 진척도 각 클래스, 양 확인
  - 디렉토리로 관리
2. 이미지 전처리
  - 이미지 형식 조건에 맞지 않으면 제거,변환
  - 이미지 전처리 진척도 각 클래스, 양 확인
  - 저(低)질의 이미지 딥러닝 모델로 threshold 주어 제거
  - 도메인 영역에 따라 data augmentation 적용 
3. 데이터 전처리
  - 자주 사용하는 처리는 함수 만들어 사용
  - 모델 레이어
4. 모델 학습
  - early Stopping
  - checkpoints
  - imbalanced dataset 해결 방법론 적용, 비교 , 선택
5. 모델 평가
  - 자주 사용하는 평가 메트릭 함수 작성(라이브러리 활용)
  - 모델 버전 별로 저장 관리
    - Accuracy , 클래스별 AUC PR curve(OvR), [정규화된 confusion matrix](ml/model_selection/tuning_classweight.png), [클래스별 precision,recall ,f-1 score](ml/model_selection/classication_report.txt)
6. 모델 하이퍼파라미터 튜닝
  - Auto ML 활용
7. 모델 테스트
  - 특정 FPS에서의 inference time 측정, 비교
  - 트레이드 오프 고려해서 모델 선택

### 성과
- 81 class 기준 val accuracy 92.1% 달성 
- 실시간 웹캠에서도 변형 자세(pose variation)에도 robust하다.

