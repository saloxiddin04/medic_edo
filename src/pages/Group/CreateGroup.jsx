import React, { useEffect, useState } from "react";
import {
  createModule, createSystem, getGroupById,
  getModuleById, getSystemById, postGroup, updateGroup,
  updateModule, updateSystem,
} from "../../features/modules/moduleSlice";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

const CreateGroup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [moduleName, setModuleName] = useState("");
  const [moduleUniqueName, setModuleUniqueName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { id } = useParams();
  
  const saveData = (e) => {
    e.preventDefault();
    if (isSubmitted) return;
    if (Number(id)) {
      dispatch(
        updateGroup({
          id: Number(id),
          name: moduleName,
          unique_name: moduleUniqueName,
        })
      ).then(() => {
        navigate("/group");
      });
    } else {
      dispatch(
        postGroup({ name: moduleName, unique_name: moduleUniqueName })
      ).then(() => {
        navigate("/group");
      });
    }
    setIsSubmitted(true);
  };
  
  const bindItems = (name, unique_name) => {
    setModuleName(name);
    setModuleUniqueName(unique_name);
  };
  
  useEffect(() => {
    if (Number(id)) {
      dispatch(getGroupById(Number(id))).then(({ payload }) => {
        bindItems(payload.name, payload.unique_name);
      });
    }
  }, [dispatch, id]);
  
  return (
    <form className="card" onSubmit={saveData}>
      <div className="my-5 flex items-center flex-wrap lg:flex-nowrap gap-10">
        <div className="lg:w-1/2 w-full">
          <label htmlFor="moduleName">Group name</label>
          <input
            required
            id="moduleName"
            type="text"
            className="form-input"
            placeholder="System name"
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
          />
        </div>
        <div className="lg:w-1/2 w-full">
          <label htmlFor="modulUniqueName">Group unique name</label>
          <input
            required
            id="modulUniqueName"
            type="text"
            className="form-input"
            placeholder="System unique name"
            value={moduleUniqueName}
            onChange={(e) => setModuleUniqueName(e.target.value)}
          />
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

export default CreateGroup;
