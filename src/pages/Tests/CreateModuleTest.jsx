import React, { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";

import {
  IoIosRemoveCircleOutline,
  IoIosAddCircleOutline,
  IoIosTrash
} from "react-icons/io";
import {
  createTest,
  getModules, getSystems,
  getTestById,
  updateTest,
} from "../../features/modules/moduleSlice";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const CreateModuleTest = () => {
  // router
  const navigate = useNavigate();
  const { id } = useParams();

  // store
  const { moduleList, systemList } = useSelector(({ module }) => module);
  const dispatch = useDispatch();

  // joditEditor
  const editor = useRef(null);
  const correctAnswerRef = useRef(null);

  // variables
  const variants = [
    { value: "a", label: "A" },
    { value: "b", label: "B" },
    { value: "c", label: "C" },
    { value: "d", label: "D" },
    { value: "e", label: "E" },
    { value: "f", label: "F" },
    { value: "g", label: "G" },
    { value: "h", label: "H" },
  ];

  const [data, setData] = useState({
    id: null,
    modul_id: null,
    sistema_id: null,
    image: '',
    image2: '',
    image3: '',
    question: "",
    correct_answer: "",
    correct_answer_key: "",
    options: [{ key: "", answer: "" }],
    modul_name: "",
    modul_unique_name: "",
  });

  const [isUploaded, setIsUploaded] = useState(false);
  const [isUploaded2, setIsUploaded2] = useState(false);
  const [isUploaded3, setIsUploaded3] = useState(false);
  const [imageName, setImageName] = useState("");
  const [imageName2, setImageName2] = useState("");
  const [imageName3, setImageName3] = useState("");
  const [showRequired, setShowRequired] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // add/delete variants
  const handleSelectChange = (selectedOption, index) => {
    const newFormData = JSON.parse(JSON.stringify(data.options));
    newFormData[index].key = selectedOption.value;
    setData({ ...data, options: newFormData });
  };

  const handleInputChange = ({ target: { value } }, index) => {
    const newFormData = JSON.parse(JSON.stringify(data.options));
    newFormData[index].answer = value;
    setData({ ...data, options: newFormData });
  };

  const handleAddForm = () => {
    setData({ ...data, options: [...data.options, { key: "", answer: "" }] });
  };

  const handleDeleteForm = (index) => {
    const newFormData = [...data.options];
    newFormData.splice(index, 1);
    setData({ ...data, options: newFormData });
  };

  // image upload
  const uploadImage = ({ target: { files } }) => {
    setImageName(files[0].name);
    setIsUploaded(true);
    setData({ ...data, image: files[0] });
  };

  const uploadSecondImage = ({ target: { files } }) => {
    setImageName2(files[0].name);
    setIsUploaded2(true);
    setData({ ...data, image2: files[0] });
  };

  const uploadThirdImage = ({ target: { files } }) => {
    setImageName3(files[0].name);
    setIsUploaded3(true);
    setData({ ...data, image3: files[0] });
  };

  // api
  const saveDatas = (e) => {
    e.preventDefault();
    const optionKeys = data.options
      .map((item) => item.key !== "")
      .every((key) => key === true);

    const optionAnswers = data.options
      .map((item) => item.answer !== "")
      .every((answer) => answer === true);

    if (
      data.question &&
      data.correct_answer &&
      data.correct_answer_key &&
      optionKeys &&
      optionAnswers
    ) {
      if (isSubmitted) return;
      const newFormData = [...data.options];
      setData({ ...data, options: newFormData });

      const formData = new FormData();
      formData.append("id", data.id);
      formData.append("modul_id", data.modul_id);
      formData.append("sistema_id", data.sistema_id);
      formData.append("question", data.question);
      formData.append("correct_answer", data.correct_answer);
      formData.append("correct_answer_key", data.correct_answer_key.toLowerCase());
      formData.append("options", JSON.stringify(data.options));
      formData.append("image", data.image);
      formData.append("image2", data.image2);
      formData.append("image3", data.image3);

      // if (typeof data.image == "string") {
      //   formData.delete("image");
      // }
      // if (typeof data.image2 == "string") {
      //   formData.delete("image2");
      // }
      // if (typeof data.image3 == "string") {
      //   formData.delete("image3");
      // }

      if (Number(id)) {
        dispatch(updateTest(formData)).then(() => {
          navigate("/module-test");
        });
        setShowRequired(false);
      } else {
        dispatch(createTest(formData)).then(() => {
          navigate("/module-test");
        });
        setShowRequired(false);
      }
      setIsSubmitted(true);
    } else {
      setShowRequired(true);
    }
  };

  const bindItems = (
    id,
    options,
    correct_answer,
    correct_answer_key,
    image,
    image2,
    image3,
    modul_id,
    question,
    modul_name,
    modul_unique_name,
    sistema_id,
    sistema_name,
  ) => {
    setData({
      id,
      options,
      correct_answer,
      correct_answer_key,
      image,
      image2,
      image3,
      modul_id,
      question,
      modul_name,
      modul_unique_name,
      sistema_id,
      sistema_name,
    });
  };

  useEffect(() => {
    if (Number(id)) {
      dispatch(getTestById(Number(id))).then(({ payload }) => {
        if (payload && payload.name !== "AxiosError") {
          // added new checker
          bindItems(
            payload.id,
            payload.options,
            payload.correct_answer,
            payload.correct_answer_key,
            payload.image,
            payload.image2,
            payload.image3,
            payload.modul,
            payload.question,
            payload.modul_name,
            payload.modul_unique_name,
            payload.sistema,
            payload.sistema_name
          );
          setImageName(payload.image_name);
          setImageName2(payload.image2_name);
          setImageName3(payload.image3_name);
        }
      });
    }
    dispatch(getModules({ page_size: 1000 }));
    dispatch(getSystems({ page_size: 1000 }));
  }, [dispatch, id]);
  
  return (
    <form onSubmit={saveDatas} className="card">
      <div className="my-5 flex items-start gap-5">
        <div className="w-1/2">
          <div className='flex items-center gap-5'>
            <div className='w-1/2'>
              <label htmlFor="moduleName">Select Modul</label>
              <Select
                options={moduleList?.results}
                getOptionLabel={(modul) => modul.name}
                getOptionValue={(modul) => modul.id}
                onChange={(e) => setData({ ...data, modul_id: e.id })}
                placeholder={data.modul_name}
              />
              <p className="text-danger">
                {showRequired && !data.modul_id && "required"}
              </p>
            </div>
            <div className='w-1/2'>
              <label htmlFor="moduleName">Select System</label>
              <Select
                options={systemList?.results}
                getOptionLabel={(modul) => modul.name}
                getOptionValue={(modul) => modul.id}
                onChange={(e) => setData({ ...data, sistema_id: e.id })}
                placeholder={data.sistema_name}
              />
              <p className="text-danger">
                {showRequired && !data.modul_id && "required"}
              </p>
            </div>
          </div>
          {data.options &&
            data.options.map((section, index) => (
              <div key={index} className="flex items-center gap-5 mt-5">
                <label className="w-2/12">
                  Key
                  <Select
                    placeholder=""
                    options={variants}
                    value={
                      variants.find((option) => option.value === data.key) || {
                        value: section.key,
                        label: section.key.toUpperCase(),
                      }
                    }
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, index)
                    }
                  />
                  <p className="text-danger">
                    {showRequired && !section.key && "required"}
                  </p>
                </label>
                <label className="w-9/12">
                  Answer
                  <input
                    type="text"
                    className="form-input"
                    value={section.answer}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                  <p className="text-danger">
                    {showRequired && !section.answer && "required"}
                  </p>
                </label>

                <div className="w-1/12 flex justify-between items-center mt-8">
                  {index === data.options.length - 1 && (
                    <button
                      type="button"
                      className="text-primary"
                      onClick={handleAddForm}
                    >
                      <IoIosAddCircleOutline size="20px" />
                    </button>
                  )}
                  {data.options.length !== 1 && (
                    <button
                      type="button"
                      className="text-danger"
                      onClick={() => handleDeleteForm(index)}
                    >
                      <IoIosRemoveCircleOutline size="20px" />
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>

        <div className="w-1/2">
          <label htmlFor="testQuestion">Test question</label>
          <JoditEditor
            className="mt-1 mb-3"
            ref={editor}
            value={data.question}
            onChange={(newContent) => {
              setData({ ...data, question: newContent });
            }}
          />

          <p className="text-danger">
            {showRequired && !data.question ? "required field" : ""}
          </p>

          <label htmlFor="fileUpload" className="mt-3 ">
            Image
          </label>
          <div className={'flex items-center gap-1'}>
            <input
              id="fileUpload"
              type="file"
              className="form-file-input"
              onChange={uploadSecondImage}
            />
            <div
              className={'bg-red-500 rounded flex items-center px-2 py-1 cursor-pointer'}
              onClick={() => {
                setImageName2('');
                setIsUploaded2(false);
                setData({ ...data, image2: id ? 'delete' : '' });
              }}
            >
              <IoIosTrash size={30} color={'#fff'}/>
            </div>
          </div>

          <span className="bg-primary text-white py-1 px-3 mt-2 inline-block rounded">
            {(imageName2 === 'delete' || imageName2 === '' || imageName2 === null) ? 'No photo' : imageName2}
          </span>
        </div>
      </div>

      <hr />
      <div className="mt-5">
        <h1>Correct answer</h1>
        <div className="mt-10 flex gap-5">
          <div>
            <label className="w-1/12">
              Key
              <Select
                placeholder=""
                options={variants}
                value={{
                  value: data.correct_answer_key,
                  label: data.correct_answer_key.toUpperCase(),
                }}
                onChange={(e) =>
                  setData({ ...data, correct_answer_key: e.value })
                }
              />
              <p className="text-danger">
                {showRequired && !data.correct_answer_key
                  ? "required field"
                  : ""}
              </p>
            </label>

            <label htmlFor="fileUpload" className="mt-3 inline-block">
              Image
            </label>
            <div className={'flex items-center gap-2'}>
              <input
                id="fileUpload"
                type="file"
                className="form-file-input"
                onChange={uploadImage}
              />
              <div
                className={'bg-red-500 rounded flex items-center px-2 py-1 cursor-pointer'}
                onClick={() => {
                  setImageName('');
                  setIsUploaded(false);
                  setData({ ...data, image: id ? 'delete' : '' });
                }}
              >
                <IoIosTrash size={30} color={'#fff'}/>
              </div>
            </div>

            <span className="bg-primary text-white py-1 px-3 mt-2 inline-block rounded">
              {(imageName === 'delete' || imageName === '' || imageName === null) ? 'No photo' : imageName}
            </span>

            <div className="mt-5">
              <label htmlFor="fileUpload" className="inline-block">
                Image 2
              </label>
              <div className={'flex items-center gap-2'}>
                <input
                  id="fileUpload"
                  type="file"
                  className="form-file-input"
                  onChange={uploadThirdImage}
                />
                <div
                  className={'bg-red-500 rounded flex items-center px-2 py-1 cursor-pointer'}
                  onClick={() => {
                    setImageName3('');
                    setIsUploaded3(false);
                    setData({ ...data, image3: id ? 'delete' : '' });
                  }}
                >
                  <IoIosTrash size={30} color={'#fff'}/>
                </div>
              </div>

              <span className="bg-primary text-white py-1 px-3 mt-2 inline-block rounded">
                {(imageName3 === 'delete' || imageName3 === '' || imageName3 === null) ? 'No photo' : imageName3}
              </span>
            </div>
          </div>

          <label className="w-11/12">
            Answer
            <JoditEditor
              ref={correctAnswerRef}
              value={data.correct_answer}
              onChange={(newContent) => {
                setData({ ...data, correct_answer: newContent });
              }}
            />
            <p className="text-danger">
              {showRequired && !data.correct_answer ? "required field" : ""}
            </p>
          </label>
        </div>
      </div>

      <div className="flex justify-end mt-10 mb-5">
        {isSubmitted ? (
          <button
            type="button"
            disabled
            className="btn-primary flex gap-3 items-center justify-between"
          >
            <AiOutlineLoading3Quarters className="animate-spin" />
            Processing...
          </button>
        ) : (
          <button type="submit" className="btn-primary">
            Save
          </button>
        )}
      </div>
    </form>
  );
};

export default CreateModuleTest;
