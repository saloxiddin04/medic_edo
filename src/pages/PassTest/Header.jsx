import React from "react";
import { FcBookmark } from "react-icons/fc";
import {useSelector, useDispatch} from "react-redux";
import {clearAnswer, getExactTest, getTestsById, submitMarked} from "../../features/pastTest/pastTestSlice";
import {setItem} from "../../features/LocalStorageSlice/LocalStorageSlice";

const Header = ({index, setIndex}) => {
  const dispatch = useDispatch()
  const {testList, question} = useSelector(({pastTest}) => pastTest);
  const {testID} = useSelector((state) => state.localStorage);

  const handleStep = (direction) => {
    if (direction === 'next') {
      setIndex((prev) => prev + 1);
      if (testList.count > index + 1) {
        dispatch(getExactTest({
          id: testList?.id,
          test_id: testList?.test_ids[index + 1]?.test_question?.id,
        }));
        dispatch(setItem({key: 'exactTestID', value: testList?.test_ids[index + 1]?.test_question?.id}))
      }
      dispatch(clearAnswer())
    } else {
      setIndex((prev) => prev > 0 ? prev - 1 : 0);
      if (index > 0) {
        dispatch(getExactTest({
          id: testList?.id,
          test_id: testList?.test_ids[index - 1]?.test_question?.id,
        }));
        dispatch(setItem({key: 'exactTestID', value: testList?.test_ids[index - 1]?.test_question?.id}))
        dispatch(clearAnswer())
      }
    }
  };

  const submitMark = () => {
    dispatch(submitMarked({id: testList?.test_ids[index]?.id, mark: !testList?.test_ids[index].mark})).then(() => {
      dispatch(getTestsById(testID));
      dispatch(getExactTest({
        id: testList?.id,
        test_id: testList?.test_ids[index]?.test_question?.id,
      }));
    })
  }

  return (
    <nav className="fixed top-0 right-0 w-[94vw] z-10 bg-primary px-4 py-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-5">
          <h1 className="text-white text-center text-sm">
            Question {question?.order_number} of {testList?.count}
            <span className="block font-medium">ID: {testList?.id}</span>
          </h1>
          <div
            className="cursor-pointer"
            onClick={submitMark}
          >
            <FcBookmark className="text-white ml-1" size="22" />
            <p className="text-sm text-white">Mark</p>
          </div>
        </div>
        <div className="flex items-center gap-10 text-white text-5xl">
          <span
            onClick={() => handleStep('prev')}
            className={`cursor-pointer ${index === 0 ? 'opacity-5' : ''}`}
          >
            &#8249;
          </span>
          <span
            onClick={() => handleStep('next')}
            className={`cursor-pointer ${index+1 === testList.count ? 'opacity-5' : ''}`}
          >
            &#8250;
          </span>
        </div>
        <div className="flex items-center gap-7"></div>
      </div>
    </nav>
  );
};

export default Header;
