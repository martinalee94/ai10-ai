# [๐ง](https://emojipedia.org/yoga/) WellAI(์ฐ๋ผ์ด)
  *์ธ์  ์ด๋์๋ ๋น์ ์ ๊ฑด๊ฐ์ ์ฑ์์ง๋ AI ํํธ ์๋น์ค, ์ฐ๋ผ์ด*
  
  
  - ๋ฉ์ธ
  
    ![Alt Text](src/๋ฉ์ธ_์ค์.gif)
  
  - ์ด๋ ์์ฐ
  
    ![Alt Text](src/์ด๋.gif)


## ์ฌ์ฉํ ์ธ์ด, ํ๋ ์์ํฌ, ๋ผ์ด๋ธ๋ฌ๋ฆฌ
<img src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=white">

<img src="https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=TensorFlow&logoColor=white"/> <img src="https://img.shields.io/badge/Keras-%23D00000.svg?style=for-the-badge&logo=Keras&logoColor=white"/>

<img src='https://img.shields.io/badge/scikit--learn-%23F7931E.svg?style=for-the-badge&logo=scikit-learn&logoColor=white'></a> <img src="https://img.shields.io/badge/pandas-150458?style=for-the-badge&logo=pandas&logoColor=white"/></a>
<img src='https://img.shields.io/badge/opencv-%23white.svg?style=for-the-badge&logo=opencv&logoColor=white'>
## ๋ฐ์ดํฐ์ 
- ์๊ฐ ์ด๋ฏธ์ง ๋ฐ์ดํฐ ์
  - [Yoga-82: A New Dataset for Fine-grained Classification of Human Poses](https://arxiv.org/abs/2004.10362)
  - [Yoga Pose Image classification dataset](https://www.kaggle.com/shrutisaxena/yoga-pose-image-classification-dataset)

## ์ญํ 
 1. ์ธ๊ณต์ง๋ฅ ์๋น์ค ์ด๊ธฐ ๊ธฐํ, ์กฐ์ฌ (์์ฅ์ฑ, ๋์ด๋, ์คํ ๊ฐ๋ฅ์ฑ ์ฌ๋ถ ์ฒดํฌ)
 2. ๋ฐ์ดํฐ ์์ง, ๋ฐ์ดํฐ EDA(Exploratory Data Analysis , ํ์์  ๋ฐ์ดํฐ ๋ถ์), ์ ์ฒ๋ฆฌ, ๋ชจ๋ธ๋ก ์ ์ฒ๋ฆฌ, ๋ชจ๋ธ๋ง, ๋ชจ๋ธ ํ๊ฐ ๋ฐ ์ ํ
 3. tfjs๋ก ํด๋ผ์ด์ธํธ ์ฌ์ด๋ ๋ชจ๋ธ๋ก ๋ณํ ๋ฐ ๊ฒฝ๋ํ
 4. ๋ฉ์ธ ์๋น์ค ํ์คํธ ์ฝ๋ ์์ฑ ๋ฐ ๋ชจ๋ธ ํ์คํธ


 ### ์งํ ๊ณผ์ 
  ๊ณผ์ ์ ์ต๋ํ ์๋ํ ํ๋๋ก ๋ธ๋ ฅํจ
1. ์ด๋ฏธ์ง ์์ง 
  - ์ด๋ฏธ์ง ๊ด๋ จ ์กฐ์ฌ
  - ์ด๋ฏธ์ง ์์ง ์ง์ฒ๋ ๊ฐ ํด๋์ค, ์ ํ์ธ
  - ๋๋ ํ ๋ฆฌ๋ก ๊ด๋ฆฌ
2. ์ด๋ฏธ์ง ์ ์ฒ๋ฆฌ
  - ์ด๋ฏธ์ง ํ์ ์กฐ๊ฑด์ ๋ง์ง ์์ผ๋ฉด ์ ๊ฑฐ,๋ณํ
  - ์ด๋ฏธ์ง ์ ์ฒ๋ฆฌ ์ง์ฒ๋ ๊ฐ ํด๋์ค, ์ ํ์ธ
  - ์ (ไฝ)์ง์ ์ด๋ฏธ์ง๋ฅผ ๋ฅ๋ฌ๋ ๋ชจ๋ธ๋ก threshold ์ฃผ์ด ์ ๊ฑฐ
  - ๋๋ฉ์ธ ์์ญ์ ๋ฐ๋ผ data augmentation ์ ์ฉ 
3. ๋ฐ์ดํฐ ์ ์ฒ๋ฆฌ
  - ์์ฃผ ์ฌ์ฉํ๋ ์ฒ๋ฆฌ๋ ํจ์ ๋ง๋ค์ด ์ฌ์ฉ
  - ๋ชจ๋ธ ์ปค์คํ ๋ ์ด์ด
4. ๋ชจ๋ธ ํ์ต
  - Early Stopping
  - Checkpoints
  - imbalanced dataset ํด๊ฒฐ ๋ฐฉ๋ฒ๋ก  ์ฌ๋ฌ๊ฐ์ง ์ ์ฉ, ๋น๊ต, ์ ํ
5. ๋ชจ๋ธ ํ๊ฐ
  - ์์ฃผ ์ฌ์ฉํ๋ ํ๊ฐ ๋ฉํธ๋ฆญ ํจ์ ์์ฑ(๋ผ์ด๋ธ๋ฌ๋ฆฌ ํ์ฉ)
  - ๋ชจ๋ธ ๋ฒ์  ๋ณ๋ก ์ ์ฅ ๊ด๋ฆฌ
    - Accuracy , ํด๋์ค๋ณ AUC PR curve(OvR), [์ ๊ทํ๋ confusion matrix](ml/model_selection/tuning_classweight.png), [ํด๋์ค๋ณ precision,recall ,f-1 score](ml/model_selection/classication_report.txt)
6. ๋ชจ๋ธ ํ์ดํผํ๋ผ๋ฏธํฐ ํ๋
  - Auto ML ํ์ฉ
7. ๋ชจ๋ธ ํ์คํธ
  - ํน์  FPS์์์ inference time ์ธก์ , ๋น๊ต
  - ํธ๋ ์ด๋ ์คํ ๊ณ ๋ คํด์ ๋ชจ๋ธ ์ ํ
8. ํด๋ผ์ด์ธํธ ์ฌ์ด๋ ๋ชจ๋ธ๋ง
   - ๋ชจ๋ธ ๋ณํ ๋ฐ ๊ฒฝ๋ํ
   - ์น์บ  ํ๊ฒฝ์์ ๋ชจ๋ธ ๋ก๋, ์ธํผ๋ฐ์ค ๊ฐ ๋ฐ์์ ์ฒ๋ฆฌ
   - ์ค์ผ๋ ํค ๋์ํํ๊ณ  ์กฐ๊ฑด์ ๋ฐ๋ผ ํ์(์ค์ผ๋ ํค ์์, ํ์คํธ)
   - ๋งค์ธ ์๋น์ค ๋ก์ง ์ง๊ธฐ

### ์ฑ๊ณผ
- 81 class ๊ธฐ์ค val accuracy 92.1% ๋ฌ์ฑ 
  - Yoga 82 ๋ผ๋ฌธ ๊ธฐ์ค top-1 ๋ถ๋ฅ accuracy ๋น๊ต 13.02% ๋์(๊ณ์ธต ๊ตฌ์กฐ ์ค ์ตํ์ ํด๋์ค ๊ธฐ์ค )
- ์ค์๊ฐ ์น์บ ์์๋ ๋ณํ ์์ธ(pose variation)์๋ robustํ๋ค.
- ์ด์์ ์ด์ง ์์ ์ํฉ์ ๊ฐ์ ํ๊ณ  ํ์คํธ
  - ๊ฐ์  1. ์ค์  ํ์ต์ ์ฌ์ฉ๋๋ ๋ชจ๋  ํด๋์ค์ ์ด๋ฏธ์ง๋ ๋์ผํ๊ธฐ ํ๋ค๋ค.
  - ๊ฐ์  2. ๋ค์ํ ์๋น์ค ์ด์ฉ์ ํ๊ฒฝ์ ๊ณ ๋ คํด์ cpu์์๋ ๋์ํด์ผ ํ๋ค.
