import {
  useEffect,
  useReducer,
  useState,
  createContext,
  useContext,
} from 'react';
import reducer from './reducer';
import FlagTest from './FlagTest';

let Countryy = createContext();

let defaultItems = {
  countries: [],
  targetCountry: [],
  isAnswer: false,
  answerExpected: null,
  anwerContent: '',
  answerMessage: '',
  isCorrect: false,
  correctAnswer: '',
  errorMessage: '',
};

let Countries = ({ children }) => {
  let [state, dispatch] = useReducer(reducer, defaultItems);
  useEffect(() => {
    let country = async () => {
      try {
        let response = await fetch('https://restcountries.com/v3.1/all');
        let data = await response.json();
        dispatch({ type: 'SUCCESS', payload: { data } });
      } catch (error) {
        dispatch({ type: 'ERROR', payload: { error } });
      }
    };
    country();
  }, []);
  let newCountry = () => {
    dispatch({ type: 'NEW_COUNTRY' });
  };
  let inputAnswer = (answer) => {
    dispatch({ type: 'INPUT_ANSWER', payload: { answer } });
  };
  let answerChecker = () => {
    dispatch({ type: 'ANSWER_CHECKER' });
  };
  let answerCloser = () => {
    dispatch({ type: 'ANSWER_CLOSER' });
  };
  let close = () => {
    dispatch({ type: 'CLOSE' });
  };
  let noValue = () => {
    dispatch({ type: 'NO_VALUE' });
  };

  return (
    <Countryy.Provider
      value={{
        ...state,
        newCountry,
        inputAnswer,
        noValue,
        close,
        answerChecker,
        answerCloser,
      }}
    >
      <FlagTest />
      {children}
    </Countryy.Provider>
  );
};
export let useGlobalContext = () => {
  return useContext(Countryy);
};

export default Countries;
