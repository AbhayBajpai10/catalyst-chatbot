import React from "react";

function Inputbox({ question, isenter, askquestion, setquestion }) {
  return (
    <>
      <div className="flex bg-zinc-800 w-1/2 text-white m-auto rounded-4xl p-1 border border-zinc-600 h-16 pr-5">
        <input
          onChange={(e) => setquestion(e.target.value)}
          value={question}
          className="w-full h-full p-3 outline-none"
          type="text"
          placeholder="Ask me a question"
          onKeyDown={isenter}
        />
        <button
          onClick={askquestion}
          className="cursor-pointer hover:font-medium"
        >
          Ask
        </button>
      </div>
    </>
  );
}

export default Inputbox;
