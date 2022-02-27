import glob

import pandas as pd


def combine_poeses_csv(path: str, save_path: str):
    """포즈 별 csv파일을 위치를 받아오면 하나의 csv로 합쳐서 원하는 위치에 저장합니다."""
    path_list = [f for f in sorted(glob.glob(path + "*.csv"))]
    # cvs파일 갯수에 맞춰 라벨 인코딩
    for i in range(len(path_list)):
        a = pd.read_csv(path_list[i], index_col=0)
        a.class_no = i
        a.to_csv(path_list[i])

    poses = range(len(path_list))
    poses_df = pd.concat([pd.read_csv(path_list[idx],index_col=0) for idx in poses])

    poses_df.file_name = poses_df[["class_name", "file_name"]].agg("/".join, axis=1)

    no_class = poses_df.class_name.nunique()

    poses_df = poses_df.reset_index()
    poses_df.drop(columns=["index"], inplace=True)
    poses_df.to_csv(f"{save_path}/{no_class}poses.csv")

    return None


def remove_specific_poses(df2remove: pd.DataFrame, pose_names: list, path: str):
    """데이터 프레임에서 특정 포즈 이름을 입력하면
     해당 필드값 제외하여 자동적으로 csv파일 생성한다.
     """

    mask = df2remove.class_name.isin(pose_names)
    masked_df = df2remove[~mask]
    no_class = masked_df.class_name.nunique()
    masked_df.to_csv(f"{path}/{no_class}poses.csv")
    return None
