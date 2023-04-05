import React, { useState } from 'react';
import { useGlobalContext } from './countries';

import './flagtest.scss';

function FlagTest() {
  let {
    countries,
    targetCountry,
    newCountry,
    inputAnswer,
    answerChecker,
    isAnswer,
    answerMessage,
    noValue,
    close,
    correctAnswer,
    answerCloser,
    isCorrect,
  } = useGlobalContext();
  let [answer, setAnswer] = useState('');
  //   console.log(countries);
  return (
    <>
      <div className='container'>
        <h1>whose flag is this!!</h1>
        <div className='sub-container'>
          <div className='is-answer'>
            {isAnswer && (
              <div
                className={`answer-message ${
                  answerMessage == 'you answer is correct' ? 'green' : 'red'
                }`}
              >
                {answerMessage}
              </div>
            )}
          </div>
          <div className='correct'>
            {isCorrect && <div className='blue'>{correctAnswer}</div>}
          </div>

          {targetCountry.map((country, index) => {
            return (
              <div className='single-flag' key={index}>
                <img src={country.flags.png} alt={country.name.common} />
              </div>
            );
          })}
          <form
            action=''
            onSubmit={(e) => {
              e.preventDefault();
              if (answer) {
                inputAnswer(answer);
                setAnswer('');
                setTimeout(() => {
                  close();
                }, 1000);
              } else {
                noValue();
                setTimeout(() => {
                  close();
                }, 1000);
              }
            }}
          >
            <input
              type='text'
              name=''
              id=''
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
            />
            <button
              type='button'
              onClick={() => {
                answerChecker();
                setTimeout(() => {
                  answerCloser();
                  newCountry();
                }, 2000);
              }}
            >
              Reveal Answer
            </button>
            <button
              type='button'
              onClick={() => {
                newCountry();
              }}
            >
              get a new country
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default FlagTest;
