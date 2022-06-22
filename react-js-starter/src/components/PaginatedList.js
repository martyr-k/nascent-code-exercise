import { useState } from "react";
import {
  ArrowCircleRightIcon,
  ArrowCircleLeftIcon,
} from "@heroicons/react/solid";

const PaginatedList = ({ list, limit }) => {
  const [page, setPage] = useState(0);
  const lastPage = Math.ceil(list.length / limit) - 1;

  const handleClickL = () => {
    setPage((page) => page - 1);
  };

  const handleClickR = () => {
    setPage((page) => page + 1);
  };

  return (
    <>
      <div className="flex mt-3">
        <button
          type="button"
          className={`shrink-0 self-center mr-2 ${page === 0 && "opacity-30"}`}
          onClick={handleClickL}
          disabled={page === 0}
        >
          <ArrowCircleLeftIcon className="h-10" />
        </button>
        <div className="flex gap-3 flex-wrap mt-3">
          {list.slice(page * limit, page * limit + limit).map((item) => (
            <span
              className="capitalize bg-blue-50 p-2 rounded-md cursor-pointer"
              key={item.name}
            >
              {item.name}
            </span>
          ))}
        </div>
        <button
          type="button"
          className={`shrink-0 self-center ml-2 ${
            page === lastPage && "opacity-30"
          }`}
          onClick={handleClickR}
          disabled={page === lastPage}
        >
          <ArrowCircleRightIcon className="h-10" />
        </button>
      </div>
    </>
  );
};

export default PaginatedList;
