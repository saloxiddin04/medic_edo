import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getGroup} from "../../features/modules/moduleSlice";
import {Link} from "react-router-dom";
import {ROUTES} from "../../Routes/constants";
import Pagination from "../../components/Pagination";
import {AiFillDelete, AiFillEdit} from "react-icons/ai";
import DeleteGroup from "./DeleteGroup";

const Group = () => {
  const dispatch = useDispatch();
  const {groupList} = useSelector(({module}) => module);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ModulToDelete, setModulToDelete] = useState(null);
  
  const handlePageChange = (page) => {
    localStorage.setItem("currentPage", page.toString());
    dispatch(getGroup({page_size: 10, page}));
  };
  
  const handleDeleteModal = (id) => {
    setIsModalOpen(true);
    setModulToDelete(id);
  };
  
  const closeModal = () => setIsModalOpen(false);
  
  useEffect(() => {
    const page = localStorage.getItem("currentPage");
    dispatch(getGroup({page_size: 10, page}));
  }, [dispatch]);
  
  return (
    <div className="card">
      <div className="flex justify-center flex-wrap lg:flex-nowrap lg:justify-between">
        <Link
          to={ROUTES.CREATE_GROUP}
          className="btn-primary mt-3 inline-block text-sm md:text-lg"
        >
          Create Group
        </Link>
        
        <Pagination
          totalItems={groupList.count} // Replace with the total number of items you have
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
                {groupList?.results?.map((item) => (
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
                    
                    <td
                      className="flex items-center justify-center px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <Link
                        className="btn-warning btn-sm inline-block"
                        to={`/create-group/${item.id}`}
                      >
                        <span>
                          <AiFillEdit/>
                        </span>
                      </Link>
                      
                      <button
                        className="btn-danger btn-sm ml-3"
                        onClick={() => handleDeleteModal(item.id)}
                      >
                        <AiFillDelete/>
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
      
      <DeleteGroup
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        modulId={ModulToDelete}
      />
    </div>
  );
}

export default Group