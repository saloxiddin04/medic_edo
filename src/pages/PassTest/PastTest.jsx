import React, {useState, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {FcBookmark} from "react-icons/fc";
import {FaCheck, FaCircle} from "react-icons/fa";
import Footer from "./Footer";
import Header from "./Header";
import {
  clearAnswer,
  getExactTest,
  getTestsById, patchLineOption,
  submitSelectQuestion,
  submitTheAnswer,
} from "../../features/pastTest/pastTestSlice";
import {
  setItem,
  getItem,
} from "../../features/LocalStorageSlice/LocalStorageSlice";
import {VscError} from "react-icons/vsc";
import TimeUpModal from "./TimeUpModal";

const PastTest = () => {
  const {testList, exactTest, question, loading} = useSelector(
    ({pastTest}) => pastTest
  );
  const {testID, exactTestID} = useSelector((state) => state.localStorage);
  const {seconds} = useSelector(({timer}) => timer);
  
  const dispatch = useDispatch();
  
  const selectedAnswerInput = document.querySelector(
    'input[name="keys"]:checked'
  );
  
  const [selectedAnswer, setSelectedAnswerAnswer] = useState({
    id: null,
    key: "",
    test_question: "",
  });
  
  const [countIndex, setCountIndex] = useState(0);
  const [selectedText, setSelectedText] = useState("");
  const [isTimeUp, setIsTimeUp] = useState(false);
  
  const changeTest = (id, test_id, idx) => {
    dispatch(setItem({key: "exactTestID", value: test_id}));
    dispatch(getExactTest({id, test_id}));
    dispatch(clearAnswer());
    setSelectedAnswerAnswer({
      test_question: "",
      key: "",
      id: null,
    });
    setCountIndex(idx);
    dispatch(setItem({key: "idx", value: idx}));
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
      setCountIndex((prevState) =>
        testList?.count > prevState ? prevState + 1 : prevState
      );
      dispatch(
        submitTheAnswer({
          id: selectedAnswer.id,
          answer: selectedAnswer.key,
          test_question_id: selectedAnswer.test_question,
          start_test_id: testList.id,
        })
      ).then(() => {
        dispatch(getTestsById(testID));
        testList.count === countIndex + 1 &&
        dispatch(getExactTest({id: testID, test_id: exactTestID}));
        testList.count > countIndex + 1 &&
        dispatch(
          getExactTest({
            id: testList?.id,
            test_id: testList?.test_ids[countIndex + 1]?.test_question?.id,
          })
        );
        setSelectedAnswerAnswer({
          test_question: "",
          key: "",
          id: null,
        });
      });
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
        dispatch(getExactTest({id: testID, test_id: exactTestID}));
      });
    }
  };
  
  useEffect(() => {
    dispatch(getItem({key: "testID"}));
    dispatch(getItem({key: "exactTestID"}));
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(getTestsById(testID));
    dispatch(getExactTest({id: testID, test_id: exactTestID}));
  }, [dispatch, exactTestID, testID]);
  
  const handleSelectionChange = () => {
    const selectedText = window.getSelection().toString();
    setSelectedText(selectedText);
  };
  
  useEffect(() => {
    window.addEventListener("mousemove", handleSelectionChange);
    return () => {
      window.removeEventListener("mousemove", handleSelectionChange);
    };
  }, []);
  
  const timeoutId = useRef(null);
  const selectedQuestion = () => {
    if (selectedText) {
      clearTimeout(timeoutId.current);
      timeoutId.current = setTimeout(() => {
        dispatch(
          submitSelectQuestion({
            id: question?.id,
            text: selectedText,
          })
        ).then(() => {
          dispatch(getExactTest({id: testID, test_id: exactTestID}));
          setSelectedText("");
        });
      }, 200);
    }
  };
  
  useEffect(() => {
    if (seconds <= 0) {
      setIsTimeUp(true);
    }
  }, [seconds]);
  
  // if (loading) {
  //   return (
  //     <div className="w-[100wh] h-[100vh] flex justify-center items-center">
  //       <span className="relative flex h-16 w-16">
  //         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
  //         <span className="relative inline-flex rounded-full h-16 w-16 bg-primary"></span>
  //       </span>
  //     </div>
  //   );
  // }
  
  return (
    <div className="min-h-screen bg-darkLayoutStrm flex flex-wrap pb-20">
      <ul className="w-[6%] h-full overflow-y-auto bg-white border-r-2">
        {testList &&
          testList?.test_ids?.map((test, index) => (
            <li
              onClick={() =>
                changeTest(testList.id, test.test_question.id, index)
              }
              key={index}
              className={`${index % 2 === 0 && "bg-gray-300"} 
                h-6 flex items-center justify-center cursor-pointer ${
                test?.order_number === countIndex + 1
                  ? "bg-blue-400 text-white"
                  : ""
              }`}
            >
              <div className="flex relative justify-center items-center w-full">
                <span
                  className={`absolute top-2 left-2 ${
                    test?.order_number === countIndex + 1
                      ? "bg-blue-400 text-white"
                      : "text-dark"
                  }`}
                >
                  {!test.is_check && <FaCircle size="6"/>}
                </span>
                {test.order_number}
                <span className="absolute top-1 right-2">
                  {test.mark && (
                    <FcBookmark className="text-white ml-1" size="14"/>
                  )}
                </span>
              </div>
            </li>
          ))}
      </ul>
      
      <Header
        index={countIndex}
        setIndex={setCountIndex}
        setSelectedAnswerAnswer={setSelectedAnswerAnswer}
      />
      
      <div className="mt-20 p-5 overflow-y-auto w-[94%]">
        <div
          dangerouslySetInnerHTML={{
            __html: question?.test_question?.question,
          }}
          onMouseUp={selectedQuestion}
        />
        {question?.test_question?.image2 && (
          <img
            src={question?.test_question?.image2}
            className="max-w-[50vw] max-h-[500px]"
            alt=""
          />
        )}
        
        <div className="border-primary border-2 mt-10 px-5 w-full">
          {question?.test_question?.options?.map((option, idx) => (
            <label
              className={`flex items-center gap-2 cursor-pointer my-5 ${
                question.is_tutor
                  ? (option.key === question.wrong_key && `text-danger`) ||
                  (option.key === question.right_key && `text-success`)
                  : `${
                    question?.is_check
                      ? option?.key === question?.answer && `text-gray-400`
                      : option?.key === selectedAnswer.key &&
                      `text-gray-400`
                  }`
              } ${option.is_strik ? 'line-through' : ''}`}
              htmlFor={option.key}
              key={idx}
              onDoubleClick={() => {
                dispatch(
                  patchLineOption({
                    start_test_id: question?.start_test_result,
                    test_id: question?.id,
                    option_id: option?.id,
                    is_strik: !option.is_strik
                  })
                ).then(() => {
                  dispatch(getExactTest({id: testID, test_id: exactTestID}))
                })
              }}
            >
              <input
                type="radio"
                name="keys"
                id={option.key}
                value={option.key}
                disabled={question?.is_check}
                checked={
                  question.answer
                    ? option?.key === question?.answer
                    : option.id === selectedAnswer.id
                }
                onChange={() => currentAnswer(option)}
              />
              <span className="uppercase">{option.key}</span>
              <span>{option.answer}</span>
            </label>
          ))}
        </div>
        <button
          className="btn-primary mt-10 inline-block"
          onClick={() => submitOnClick()}
          disabled={selectedAnswer?.key === "" || question?.is_check}
        >
          Submit the Answer
        </button>
        {question?.is_tutor && question?.is_check && (
          <div className="p-2 mt-4 rounded shadow-lg shadow-blue-400 border border-blue-400">
            {selectedAnswerInput?.value === question?.right_key ? (
              <FaCheck
                className="text-4xl m-auto"
                color={"green"}
                title={"correct"}
              />
            ) : (
              <VscError
                className="text-4xl m-auto"
                color={"red"}
                title={"Incorrect"}
              />
            )}
          </div>
        )}
        {question?.is_tutor && (
          <div className="py-10 overflow-y-auto">
            {question?.is_check && (
              <div className="mt-3">
                <div className="p-3 border-blue-400 border-2">
                  <strong className="text-3xl">Explation:</strong>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: question?.test_question?.correct_answer
                        ? `
                          <span class="font-black">Correct Answer ${question?.test_question.correct_answer_key}:</span> ${question?.test_question?.correct_answer}
                        `
                        : "",
                    }}
                  />
                </div>
                {question?.test_question.image3 && (
                  <img src={question?.test_question.image3} alt={"img"} className='max-w-[50vw] max-h-[500px]'/>
                )}
                {question?.test_question.image && (
                  <img src={question?.test_question.image} alt={"img"} className='max-w-[50vw] max-h-[500px]'/>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      
      <Footer/>
      <TimeUpModal isModalOpen={isTimeUp}/>
    </div>
  );
};

export default PastTest;
