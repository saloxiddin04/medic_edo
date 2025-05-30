import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Routes/constants";

import { useDispatch, useSelector } from "react-redux";
import { getModules } from "../../features/modules/moduleSlice";

// icon
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import DeleteModal from "./DeleteModal";
import Pagination from "../../components/Pagination";

const Module = () => {
  const dispatch = useDispatch();
  const { moduleList } = useSelector(({ module }) => module);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ModulToDelete, setModulToDelete] = useState(null);

  const handlePageChange = (page) => {
    localStorage.setItem("currentPage", page.toString());
    dispatch(getModules({ page_size: 10, page }));
  };

  const handleDeleteModal = (id) => {
    setIsModalOpen(true);
    setModulToDelete(id);
  };

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const page = localStorage.getItem("currentPage");
    dispatch(getModules({ page_size: 10, page }));
  }, [dispatch]);

  return (
    <div className="card">
      <div className="flex justify-center flex-wrap lg:flex-nowrap lg:justify-between">
        <Link
          to={ROUTES.CREATEMODULE}
          className="btn-primary mt-3 inline-block text-sm md:text-lg"
        >
          Create Modul
        </Link>

        <Pagination
          totalItems={moduleList.count}
          itemsPerPage={10}
          onPageChange={handlePageChange}
        />
      </div>
      <div className="flex flex-col mt-3">
        <div className="my-2 overflow-auto sm:-mx-6 lg:-mx-8">
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
                  {moduleList?.results?.map((item) => (
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
