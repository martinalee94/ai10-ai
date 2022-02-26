import os

from PIL import Image
from tqdm.notebook import tqdm


def convert_images(path, format="jpg"):
    """1채널 흑백이미지 제외시키고, 3채널,JPG 포맷으로 변경합니다."""
    img = Image.open(path)

    if img.mode in ["L", "LA"]:
        os.rename(
            path,
            "./invalid/grayscaled_images/"
            + path.split("/")[-2]
            + "_"
            + path.split("/")[-1],
        )  

    elif img.mode in ["P", "PA", "RGBA"] or img.format not in ["JPG", "JPEG"]:
        os.rename(
            path,
            "./invalid/converted_images/"
            + path.split("/")[-2]
            + "_"
            + path.split("/")[-1],
        )  
        img = img.convert("RGB")
        img.save(path.split(".")[0] + "." + format, quality=95)

    return img


def check_invalid_image(path):
    """이미지가 아닌 파일들을 리스트 형태로 리턴합니다."""

    invalid_images = []
    for folder in tqdm(sorted(os.listdir(path))):
        for img_list in tqdm(sorted(os.listdir(path + "/" + folder))):
            try:
                img = convert_images(path + "/" + folder + "/" + img_list)
                img.verify()
                img.close()

            except (IOError, SyntaxError):
                print("Not valid", path + "/" + folder + "/" + img_list)
                invalid_images.append(path + "/" + folder + "/" + img_list)

    return invalid_images


def remove_invalid_images(path_from, path_to):
    """현재 디렉토리에서 이미지가 아닌 파일들을 다른 렉토리로 이동시켜서 분리합니다"""

    path_list = check_invalid_image(path_from)

    for path in path_list:
        os.rename(path, path_to + "/" + path.split("/")[-2] + "_" + path.split("/")[-1])

    return path_list
