function energieDestructurer(data: any) {
  if (!data) {
    return null;
  }

  try {
    let days = 7;
    if (data.perDay.length < 7) {
      days = data.perDay.length;
    }
    interface resultProps {
      days: Array<string>;
      necessaryLight: Array<string>;
      unnecessaryLight: Array<string>;
    }
    let result: resultProps = {
      days: [],
      necessaryLight: [],
      unnecessaryLight: [],
    };

    for (let i = 0; i < days; i++) {
      result.necessaryLight[i] = data.perDay[i].necessaryLight;
		result.necessaryLight[i] = data.perDay[i].necessaryLight;
		result.days[i] = data.perDay[i].day;
    }

    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export default energieDestructurer;
