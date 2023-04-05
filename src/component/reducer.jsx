let reducer = (state, action) => {
  let randozider = Math.floor(Math.random() * 249);
  let indepCountry = [];
  switch (action.type) {
    case 'SUCCESS':
      action.payload.data.map((single) => {
        if (single.independent == true) {
          indepCountry.push(single);
        }
      });

      return {
        ...state,
        countries: indepCountry,
        targetCountry: [
          indepCountry[Math.floor(Math.random() * indepCountry.length - 2)],
        ],
      };

      break;
    case 'ERROR':
      return { ...state, error: action.payload };
    case 'NEW_COUNTRY':
      return {
        ...state,
        targetCountry: [state.countries[randozider]],
      };
    case 'INPUT_ANSWER':
      if (
        action.payload.answer.toLocaleLowerCase() ==
        state.targetCountry[0].name.common.toLocaleLowerCase()
      ) {
        return {
          ...state,
          isAnswer: true,
          answerMessage: 'you answer is correct',
          targetCountry: [state.countries[randozider]],
        };
      } else if (
        action.payload.answer.toLocaleLowerCase() !=
        state.targetCountry[0].name.common.toLocaleLowerCase()
      ) {
        return {
          ...state,
          isAnswer: true,
          answerMessage: 'you answer is wrong',
        };
      }
      return {
        ...state,
      };

    case 'NO_VALUE':
      return {
        ...state,
        isAnswer: true,
        answerMessage: 'Please enter a value',
      };
    case 'CLOSE':
      return {
        ...state,
        isAnswer: false,
      };
    case 'ANSWER_CHECKER':
      return {
        ...state,
        isCorrect: true,
        correctAnswer: state.targetCountry[0].name.common,
      };
    case 'ANSWER_CLOSER':
      return { ...state, isCorrect: false };

    default:
      throw new Error(
        `${action.payload} is not a valid action payload type`.toLocaleUpperCase()
      );
      break;
  }
};
export default reducer;
