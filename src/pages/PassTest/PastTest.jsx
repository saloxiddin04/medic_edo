import React, {useState, useEffect, useRef, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {FcBookmark} from "react-icons/fc";
import {FaCircle, FaCheck} from "react-icons/fa";
import {VscError} from "react-icons/vsc"
import Footer from "./Footer";
import Header from "./Header";
import {
  clearAnswer,
  getExactTest,
  getTestsById, submitSelectQuestion,
  submitTheAnswer,
} from "../../features/pastTest/pastTestSlice";
import {setItem, getItem} from "../../features/LocalStorageSlice/LocalStorageSlice";

const PastTest = () => {
  const {testList, exactTest, loading, question} = useSelector(({pastTest}) => pastTest);
  const {testID, exactTestID} = useSelector((state) => state.localStorage);
  const dispatch = useDispatch();

  const [selectedAnswer, setSelectedAnswerAnswer] = useState({
    id: null,
    key: "",
    test_question: "",
  });

  const [countIndex, setCountIndex] = useState(0)

  const [selectedText, setSelectedText] = useState('');

  const changeTest = (id, test_id, idx) => {
    dispatch(setItem({key: 'exactTestID', value: test_id}))
    dispatch(getExactTest({id, test_id}))
    dispatch(clearAnswer())
    setSelectedAnswerAnswer({
      test_question: "",
      key: "",
      id: null
    })
    setCountIndex(idx)
    dispatch(setItem({key: 'idx', value: idx}))
  };

  const currentAnswer = (option) => {
    setSelectedAnswerAnswer({
      id: option.id,
      key: option.key,
      test_question: option.test_question,
    });
  };

  const submitOnClick = () => {
    if (!question.is_tutor) {
      setCountIndex(prevState => testList?.count > prevState ? prevState + 1 : prevState)
      dispatch(
        submitTheAnswer({
          id: selectedAnswer.id,
          answer: selectedAnswer.key,
          test_question_id: selectedAnswer.test_question,
          start_test_id: testList.id,
        })
      ).then(() => {
        dispatch(getTestsById(testID));
        testList.count === countIndex + 1 && dispatch(getExactTest({id: testID, test_id: exactTestID}))
        testList.count > countIndex + 1 && dispatch(getExactTest(
          {
            id: testList?.id, test_id:
            testList?.test_ids[countIndex + 1]?.test_question?.id
          }
        ))
        setSelectedAnswerAnswer({
          test_question: "",
          key: "",
          id: null
        })
      })
    } else {
      dispatch(
        submitTheAnswer({
          id: selectedAnswer.id,
          answer: selectedAnswer.key,
          test_question_id: selectedAnswer.test_question,
          start_test_id: testList.id,
        })
      ).then(() => {
        dispatch(getTestsById(testID));
        dispatch(getExactTest({id: testID, test_id: exactTestID}))
      })
    }
  };

  useEffect(() => {
    dispatch(getItem({key: 'testID'}))
    dispatch(getItem({key: 'exactTestID'}))
  }, []);

  useEffect(() => {
    dispatch(getTestsById(testID));
    dispatch(getExactTest({id: testID, test_id: exactTestID}))
  }, [dispatch, exactTestID, testID])

  const handleSelectionChange = () => {
    const selectedText = window.getSelection().toString();
    setSelectedText(selectedText);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleSelectionChange);
    return () => {
      window.removeEventListener('mousemove', handleSelectionChange);
    };
  }, []);

  const timeoutId = useRef(null)
  const selectedQuestion = () => {
    if (selectedText) {
      clearTimeout(timeoutId.current)
      timeoutId.current = setTimeout(() => {
        dispatch(submitSelectQuestion(
          {
            id: question?.id,
            text: selectedText
          }
        )).then(() => {
          dispatch(getExactTest({id: testID, test_id: exactTestID}))
          setSelectedText('')
        })
      }, 200)
    }
  }

  if (loading) return 'Loading...'

  return (
    <div className="min-h-screen bg-darkLayoutStrm flex flex-wrap">
      <ul className="w-[6%] h-full overflow-y-auto bg-white border-r-2">
        {testList &&
          testList?.test_ids?.map((test, index) => (
            <li
              onClick={() => changeTest(testList.id, test.test_question.id, index)}
              key={index}
              className={
                `${index % 2 === 0 && "bg-gray-300"} 
                h-6 flex items-center justify-center cursor-pointer ${test?.order_number === countIndex + 1 ? 'bg-blue-400 text-white' : ''}`
              }
            >
              <div className="flex relative justify-center items-center w-full">
                <span
                  className={`absolute top-2 left-2 ${test?.order_number === countIndex + 1 ? 'bg-blue-400 text-white' : 'text-dark'}`}>
                  {!test.is_check && (<FaCircle size="6"/>)}
                </span>
                {test.order_number}
                <span className="absolute top-1 right-2">
                  {test.mark && (<FcBookmark className="text-white ml-1" size="14"/>)}
                </span>
              </div>
            </li>
          ))}
      </ul>

      <Header index={countIndex} setIndex={setCountIndex} setSelectedAnswerAnswer={setSelectedAnswerAnswer}/>

      <div className="mt-20 p-5 overflow-y-auto w-[94%]">
        <div
          dangerouslySetInnerHTML={{
            __html: exactTest.isFilled && question?.test_question?.question,
          }}
          onMouseUp={selectedQuestion}
        />
        {exactTest.isFilled && question?.test_question?.image2 && (
          <img
            src={testList && question?.test_question?.image2}
            className='w-full h-[50vh] object-cover'
            alt=""
          />
        )}

        <div className="border-primary border-2 mt-10 px-5 w-full">
          {exactTest.isFilled &&
            question?.test_question?.options?.map((option, idx) => (
              <label
                className={`flex items-center gap-2 cursor-pointer my-5 ${
                  question.is_tutor ?
                    (option.key === question.wrong_key && `text-danger`) ||
                    (option.key === question.right_key && `text-success`) :
                    `${
                      question?.is_check ?
                        option?.key === question?.answer && `text-gray-400` :
                        option?.key === selectedAnswer.key && `text-gray-400`
                    }`
                }`}
                htmlFor={option.key}
                key={idx}
              >
                <input
                  type="radio"
                  name="keys"
                  id={option.key}
                  value={option.key}
                  disabled={question?.is_check}
                  checked={question.answer ? option?.key === question?.answer : option.id === selectedAnswer.id}
                  onChange={() => currentAnswer(option)}
                />
                <span className="uppercase">{option.key}</span>
                <span>
                  {option.answer}
                </span>
              </label>
            ))
          }
        </div>
        <button
          className="btn-primary mt-10 inline-block"
          onClick={() => submitOnClick()}
          disabled={selectedAnswer?.key === '' || question?.is_check}
        >
          Submit the Answer
        </button>
        {question?.is_tutor && (
          <div className='py-10 overflow-y-auto'>
            {question?.is_check && (
              <div className='mt-3'>
                <div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: question?.test_question?.correct_answer
                        ?
                        (`
                          <span class="font-black">Correct Answer ${question?.test_question.correct_answer_key}:</span> ${question?.test_question?.correct_answer}
                        `)
                        :
                        "",
                    }}
                  />
                </div>
                {question?.test_question.image3 && (
                  <img src={question?.test_question.image3} alt={'img'}/>
                )}
                {question?.test_question.image && (
                  <img src={question?.test_question.image} alt={'img'}/>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <Footer/>

    </div>
  );
};

export default PastTest;
