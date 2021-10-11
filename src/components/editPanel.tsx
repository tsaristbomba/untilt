import React from "react";
import { AiFillEdit } from "@react-icons/all-files/ai/AiFillEdit";
import { IoMdTrash } from "@react-icons/all-files/io/IoMdTrash";
import { IoClose } from "@react-icons/all-files/io5/IoClose";

const Edit: React.FC<EditPanelTypes> = (props) => {
  return (
    <div className="flex flex-row justify-between items-center -m-5 mb-2 md:right-24">
      <div>
        <button
          className="px-4 py-2 m-2 text-lg rounded font-medium inline-block text-white shadow-lg hover:bg-gray-600 bg-gray-700 focus:bg-gray-600 hover:shadow-2xl ring-black ring-opacity-5 transition ease-in-out disabled:opacity-20"
          onClick={props.handleEdit}
          disabled={props.disabled}
        >
          <AiFillEdit />
        </button>
        <button
          className="px-4 py-2 m-2 rounded text-lg font-medium inline-block text-white shadow-lg hover:bg-red-400  bg-red-500  focus:bg-gray-200 ring-black ring-opacity-5 transition ease-in-out"
          onClick={props.handleDelete}
        >
          <IoMdTrash />
        </button>
      </div>

      <div>
        <button
          onClick={props.handleClose}
          className="px-4 py-2 m-2 rounded text-lg font-medium inline-block text-white shadow-lg hover:bg-red-400 bg-red-500  focus:bg-gray-200 ring-black ring-opacity-5 transition ease-in-out"
        >
          <IoClose />
        </button>
      </div>
    </div>
  );
};

export default Edit;
