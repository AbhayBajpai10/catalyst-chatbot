import React from "react";

function Recent({ rechistory, setrechistory, setselecthistory }) {
  const deletehis = () => {
    localStorage.clear();
    setrechistory([]);
  };

  return (
    <>
      {/* Sidebar */}
      <div className="col-span-1 bg-zinc-800 overflow-auto">
        <h1 className="text-white text-xl pt-3 flex text-center justify-center">
          <span>History</span>
          <button
            className="border border-zinc-700 rounded-full outline-none hover:bg-zinc-500 ml-2 "
            onClick={deletehis}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#e3e3e3"
            >
              <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
            </svg>
          </button>
        </h1>
        <ul className="text-left overflow-auto text-sm">
          {rechistory.map((item, idx) => (
            <li
              onClick={() => setselecthistory(item)}
              key={idx}
              className="p-2 pl-5 truncate text-zinc-300 border-b border-zinc-400 cursor-pointer hover:bg-zinc-700 hover:text-white"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Recent;
