import React from "react";

import Footer from "../PassTest/Footer";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getExplanation} from "../../features/testResults/testResultsSlice";
import {Link, useParams} from "react-router-dom";
import {FcBookmark} from "react-icons/fc";
import {FaCircle} from "react-icons/fa";
import {ROUTES} from "../../Routes/constants";

const Explanation = () => {
  const dispatch = useDispatch();
  const {explanation} = useSelector(({testResults}) => testResults);
  
  const {id} = useParams();
  
  useEffect(() => {
    const testID = JSON.parse(localStorage.getItem("testID"));
    dispatch(getExplanation({id: testID, test_id: id}));
  }, [dispatch, id]);
  
  return (
    <div className="min-h-screen bg-darkLayoutStrm flex">
      <ul className="w-[6vw] h-screen overflow-y-scroll bg-white border-r-2">
        <li
          className={`bg-gray-300 h-10 flex items-center justify-center cursor-pointer`}
        >
          <div className="flex relative justify-center items-center w-full">
            <span className="absolute top-2 left-2 text-dark">
              {!explanation?.is_check && <FaCircle size="6"/>}
            </span>
            {explanation.order_number}
            <span className="absolute top-1 right-2">
              {explanation?.mark && (
                <FcBookmark className="text-white ml-1" size="14"/>
              )}
            </span>
          </div>
        </li>
      </ul>
      
      <nav className="fixed top-0 right-0 w-[94vw] z-10 bg-primary px-4 h-14 flex items-center">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-5">
            <h1 className="text-white text-center text-sm">
              <span className="block font-medium">ID: {explanation.id}</span>
            </h1>
            <div className="cursor-pointer">
              {explanation.mark && (
                <>
                  <FcBookmark className="text-white ml-2" size="22"/>
                  <p className="text-sm text-white">Marked</p>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-7"></div>
        </div>
      </nav>
      
      <div className="w-[94vw] mt-20 p-5 h-[80vh] overflow-y-scroll">
        <div
          className="w-[50vw]"
          dangerouslySetInnerHTML={{
            __html: explanation.isFilled
              ? explanation.test_question.question
              : "",
          }}
        />
        <div className="w-[50vw]">
          {explanation?.isFilled && explanation?.test_question?.image2 && (
            <img
              src={explanation?.test_question?.image2}
              className="w-full h-full"
              alt=""
            />
          )}
        </div>
        
        <div className="w-[50vw] border-primary border-2 mt-10 px-5">
          {explanation.test_question?.options?.map((option, idx) => (
            <label
              className={`flex items-center gap-2  my-5 ${option.is_strik ? 'line-through' : ''}`}
              htmlFor={option.key}
              key={idx}
            >
              <input
                type="radio"
                name="keys"
                id={option.key}
                value={option.key}
                disabled
                checked={option.key === explanation.wrong_key}
              />
              <span
                className={
                  (option.key === explanation.wrong_key && "text-danger") ||
                  (option.key === explanation.right_key && "text-success")
                }
              >
                  <span className="uppercase mr-2">{option.key}</span>
                  <span>{option.answer}</span>
                </span>
            </label>
          ))}
        </div>
        
        {explanation.is_tutor && (
          <div className="mt-10">
            <h1 className="text-2xl text-center">Correct Answer</h1>
            <hr className="my-5"/>
            <div
              className="w-[50vw] mb-3"
              dangerouslySetInnerHTML={{
                __html: explanation.isFilled
                  ? explanation.test_question.correct_answer
                  : "",
              }}
            />
            <div className="max-w-[50vw] max-h-[500px] overflow-hidden">
              {explanation?.test_question?.image && (
                <img
                  src={explanation?.test_question?.image}
                  className="w-full h-full"
                  alt=""
                />
              )}
            </div>
            <div className="max-w-[50vw] max-h-[500px] overflow-hidden mt-3">
              {explanation?.test_question?.image3 && (
                <img
                  src={explanation?.test_question?.image3}
                  className="w-full h-full"
                  alt=""
                />
              )}
            </div>
          </div>
        )}
        <Link to={ROUTES.RESULTS}>
          <button className="btn-primary mt-10 inline-block">back</button>
        </Link>
      </div>
      
      <Footer/>
    </div>
  );
};

export default Explanation;
