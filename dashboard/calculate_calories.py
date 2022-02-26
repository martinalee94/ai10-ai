def calculate_calories(weight: float, time: float, met=3.1) -> float:
    """MET 기반 에너지 소비량 계산
    MET(Metabolic Equivalent of Task):  1분간 소비되는 단위 체중당 에너지 소비량(ml/kg/min)으로
     운동시 사용하는 산소량으로 소모된 칼로리를 계산하는 방법
      요가: 3.1 MET
    Returns:
      bured_calories: 운동한 시간 동안 소비된 칼로리
    """
    bured_calories = weight / 200 * time * met * 3.5
    
    return bured_calories
