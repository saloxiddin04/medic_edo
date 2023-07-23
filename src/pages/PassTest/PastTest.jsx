import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {FcBookmark} from "react-icons/fc";
import {FaCircle} from "react-icons/fa";
import Footer from "./Footer";
import Header from "./Header";
import {useNavigate} from "react-router-dom";

import {
  getExactTest,
  getTestsById,
  submitTheAnswer,
} from "../../features/pastTest/pastTestSlice";
import {setItem, getItem} from "../../features/LocalStorageSlice/LocalStorageSlice";

const PastTest = () => {
  const {testList, exactTest, answer, loading, question} = useSelector(({pastTest}) => pastTest);
  const {testID, exactTestID} = useSelector((state) => state.localStorage);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [selectedAnswer, setSelectedAnswerAnswer] = useState({
    id: null,
    key: "",
    test_question: "",
  });

  const [countIndex, setCountIndex] = useState(0)
  const [iD, setId] = useState(null)
  const [testId, setTestId] = useState(null)

  const changeTest = (id, test_id, idx) => {
    dispatch(getExactTest({id, test_id}))
    dispatch(setItem(id))
    setSelectedAnswerAnswer({
      test_question: "",
      key: "",
      id: null
    })
    setCountIndex(idx)
    setTestId(test_id + 1)
    setId(id + 1)
  };

  const currentAnswer = (option) => {
    setSelectedAnswerAnswer({
      id: option.id,
      key: option.key,
      test_question: option.test_question,
    });
  };

  if (testList.count <= countIndex) {
    alert('All questions are solved')
    navigate('/create-custom-test')
    setCountIndex(0)
  }

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
      );
      testList.count > countIndex && dispatch(getExactTest({id: testList?.id, test_id: testList?.test_ids[countIndex + 1]?.test_id}))
    } else {
      dispatch(
        submitTheAnswer({
          id: selectedAnswer.id,
          answer: selectedAnswer.key,
          test_question_id: selectedAnswer.test_question,
          start_test_id: testList.id,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(getItem({key: 'testID'}))
    dispatch(getItem({key: 'exactTestID'}))
    dispatch(getTestsById(testID));
    dispatch(getExactTest({id: testID, test_id: exactTestID}))
  }, [dispatch]);

  if (loading) return 'Loading...'

  return (
    <div className="min-h-screen bg-darkLayoutStrm flex">
      <ul className="w-[6vw] h-screen overflow-y-scroll bg-white border-r-2">
        {testList &&
          testList?.test_ids?.map((test, index) => (
            <li
              onClick={() => changeTest(testList.id, test.test_id, index)}
              key={index}
              className={`${index % 2 === 0 && "bg-gray-300"} 
                h-10 flex items-center justify-center cursor-pointer`}
            >
              <div className="flex relative justify-center items-center w-full">
                <span className="absolute top-2 left-2 text-dark">
                  {!test?.is_check && (<FaCircle size="6"/>)}
                </span>
                {test.order_number}
                <span className="absolute top-1 right-2">
                  {test?.mark && (<FcBookmark className="text-white ml-1" size="14"/>)}
                </span>
              </div>
            </li>
          ))}
      </ul>

      <Header index={countIndex}/>

      <div className="w-[94vw] mt-20 p-5 h-[80vh] overflow-y-scroll">
        <div
          dangerouslySetInnerHTML={{
            __html: exactTest.isFilled ? question.question : "",
          }}
        />
        {testList?.isFilled && testList?.test_ids[0]?.test?.image2 && (
          <img
            src={testList?.isFilled && testList?.test_ids[0]?.test?.image2}
            className='w-full h-[50vh] object-cover'
            alt=""
          />
        )}

        <div className="border-primary border-2 mt-10 px-5">
          {exactTest.isFilled &&
            question?.options?.map((option, idx) => (
              <label
                className={`flex items-center gap-2 cursor-pointer my-5 ${
                  selectedAnswer?.key === option.key ?
                  selectedAnswer?.key === answer?.answer?.correct_answer_key
                    ? 'text-green-500'
                    : `text-${answer?.color}`
                    : `${option.key === answer?.answer?.correct_answer_key && 'text-green-500'}`
                }`}
                htmlFor={option.key}
                key={idx}
              >
                <input
                  type="radio"
                  name="keys"
                  id={option.key}
                  value={option.key}
                  checked={selectedAnswer?.key === option?.key}
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
        >
          Sumit the Answer
        </button>
      </div>

      <Footer/>
    </div>
  );
};

export default PastTest;
