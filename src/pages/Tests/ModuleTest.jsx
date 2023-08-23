import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Routes/constants";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getTests } from "../../features/modules/moduleSlice";

// icon
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import DeleteModal from "./DeleteModal";
import Pagination from "../../components/Pagination";

const ModuleTest = () => {
  const dispatch = useDispatch();
  const { testList } = useSelector(({ module }) => module);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testToDelete, setTestToDelete] = useState(null);

  const handlePageChange = (page) => {
    dispatch(getTests({ page_size: 10, page }));
  };

  const handleDeleteModal = (id) => {
    setIsModalOpen(true);
    setTestToDelete(id);
  };

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    dispatch(getTests({ page_size: 10, page: 1 }));
  }, [dispatch]);

  return (
    <div className="card">
      <div className="flex justify-between">
        <Link
          to={ROUTES.CREATEMODULETEST}
          className="btn-primary mt-3 inline-block"
        >
          Create Test
        </Link>

        <Pagination
          totalItems={testList.count} // Replace with the total number of items you have
          itemsPerPage={10} // Replace with the number of items to display per page
          onPageChange={handlePageChange} // Pass the handlePageChange function
        />
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
                      Modul
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Quetion
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Correct Answer Key
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
                  {testList?.results?.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {item.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {item.modul_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                        <span
                          className="max-w-[200px] inline-block overflow-hidden"
                          dangerouslySetInnerHTML={{ __html: item.question }}
                        ></span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                        {item.correct_answer_key}
                      </td>

                      <td className="flex items-center justify-center px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <Link
                          className="btn-warning btn-sm inline-block"
                          to={`/create-module-test/${item.id}`}
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
        testId={testToDelete}
      />
    </div>
  );
};

export default ModuleTest;
