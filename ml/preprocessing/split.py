import glob
import pandas as pd
from sklearn.model_selection import train_test_split
import tensorflow as tf


def combine_poeses_csv(path, save_path):
    """포즈 별 csv파일을 위치를 받아오면 하나의 csv로 합쳐서 원하는 위치에 저장합니다."""
    path_list = [f for f in sorted(glob.glob(path + "*.csv"))]
    #cvs파일 갯수에 맞춰 라벨 인코딩
    for i in range(len(path_list)):
        a = pd.read_csv(path_list[i], index_col=0)
        a.class_no = i
        a.to_csv(path_list[i])

    poses = range(len(path_list))
    poses_df = pd.concat([pd.read_csv(path_list[idx], index_col=0) for idx in poses])
    poses_df.file_name = poses_df[["class_name", "file_name"]].agg("/".join, axis=1)
    poses_df = poses_df.reset_index()
    poses_df.drop(columns=["index"], inplace=True)
    poses_df.to_csv(save_path)

    return None


def train_test_val_split(path, train_frac=0.8, test_frac=0.5):
    """Pose estimator에서 나온 csv 데이터셋을 랜덤하게 층화 추출하여 모델 학습용, 검정용, 테스트용으로 나눈다.
    Args:
      path: 파일 위치, 17개 키포인트의 x,y값과 confidence score,
        label encoding값이 있는 csv파일의 디렉토리 위치를 입력한다.
      train_frac: 학습용 데이터셋과 검정용 , 테스트용 데이터셋의 비율에서 학습용 데이터셋 비율을 정한다.
      test_frac: 검정용과 테스트용 데이터셋에서 테스트 데이터셋 비율을 정한다.
    Returns:
      X_train: 학습용 데이터셋으로 기본값으로 80%비율을 갖는다.
      X_test: 테스트용 데이터셋으로 기본값으로 10%비율을 갖는다.
      X_val: 검정용 데이터셋으로 기본값으로 10%비율을 갖는다.
      y_train: 학습용 데이터셋의 정답값으로 기본값으로 80%비율을 갖는다.
      y_test: 테스트용 데이터셋의 정답값으로 기본값으로 10%비율을 갖는다.
      y_val: 검정용 데이터셋의 정답값으로 기본값으로 10%비율을 갖는다.
      class_names: 인덱스와 해당 하는 클래스 이름을 리턴한다.
      image_path_df: 인덱스와 해당 하는 이미지 저장 위치를 리턴한다.
        truth labels (y) to use later to train a pose classification model.
    """

    dataframe = pd.read_csv(path, index_col=0)
    dataframe.reset_index()
    df_to_process = dataframe.copy()
    image_path_df = df_to_process[["file_name"]]
    df_to_process.drop(columns=["file_name"], inplace=True)
    classes = df_to_process["class_name"].unique()

    for i in range(len(classes)):
        df_to_process.loc[df_to_process["class_name"] == classes[i], "class_no"] = i
    classes = df_to_process.pop("class_name").unique()

    y = df_to_process.pop("class_no")

    X = df_to_process.astype("float64")

    X_train, X_val, y_train, y_val = train_test_split(
        X, y, train_size=train_frac, shuffle=True, stratify=y
    )
    X_test, X_val, y_test, y_val = train_test_split(
        X_val, y_val, test_size=test_frac, shuffle=True, stratify=y_val
    )
    y_train = tf.keras.utils.to_categorical(y_train)
    y_test = tf.keras.utils.to_categorical(y_test)
    y_val = tf.keras.utils.to_categorical(y_val)

    return X_train, X_test, X_val, y_train, y_test, y_val, classes, image_path_df
