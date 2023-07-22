import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Routes/constants";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getModules } from "../../features/modules/moduleSlice";

// icon
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import DeleteModal from "./DeleteModal";

const Module = () => {
  const dispatch = useDispatch();
  const { moduleList } = useSelector(({ module }) => module);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ModulToDelete, setModulToDelete] = useState(null);

  const handleDeleteModal = (id) => {
    setIsModalOpen(true);
    setModulToDelete(id);
  };

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    dispatch(getModules());
  }, [dispatch]);

  return (
    <div className="card">
      <div className="flex justify-end">
        <Link
          to={ROUTES.CREATEMODULE}
          className="btn-primary mt-3 inline-block"
        >
          Create Modul
        </Link>
      </div>
      <div className="flex flex-col mt-3">
        <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Unique Name
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {moduleList.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {item.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                        {item.unique_name}
                      </td>

                      <td className="flex items-center justify-center px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <Link
                          className="btn-warning btn-sm inline-block"
                          to={`/create-module/${item.id}`}
                        >
                          <span>
                            <AiFillEdit />
                          </span>
                        </Link>

                        <button
                          className="btn-danger btn-sm ml-3"
                          onClick={() => handleDeleteModal(item.id)}
                        >
                          <AiFillDelete />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <DeleteModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        modulId={ModulToDelete}
      />
    </div>
  );
};

export default Module;
