import os
import urllib.request

from tqdm.notebook import tqdm


def yoga_dataset_downloader(filepath: str, savepath: str):
    """요가 데이터셋을 원하는 디렉토리에 다운로드합니다."""
    file_list = os.listdir(filepath)
    os.mkdir(savepath)

    for file_idx in tqdm(range(len(file_list))):
        f = open(filepath + file_list[file_idx], "r")
        lines = f.readlines()
        f.close()

        for img_idx in tqdm(range(len(lines))):
            try:
                splits = lines[img_idx][: len(lines[img_idx]) - 1].split()
                img_path = splits[0]
                img_url = splits[1]
                folder_name, img_name = img_path.split("/")
                urllib.request.urlretrieve(
                    img_url, savepath + folder_name + "/" + img_name
                )

            except (IOError, OSError):
                pass

    return None
