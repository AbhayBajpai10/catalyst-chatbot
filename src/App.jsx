import { useEffect, useRef, useState } from "react";
import "./App.css";
import { URL } from "./constant";
import Answer from "./Components/Answers";
import Recent from "./Components/Recent";
import Questionans from "./Components/Questionans";
import Inputbox from "./Components/Inputbox";

function App() {
  const [question, setquestion] = useState("");
  const [result, setresult] = useState([]);
  const [selecthistory, setselecthistory] = useState("");
  const [rechistory, setrechistory] = useState(
    JSON.parse(localStorage.getItem("history") || "[]")
  );
  const [loader, setloader] = useState(false);
  const scrolltoans = useRef();
  const askquestion = async () => {
    if (!question.trim() && !selecthistory) return; // prevent empty questions
    // Save to history
    if (question) {
      // Remove duplicates (case-insensitive)
      const updatedHistory = [
        question,
        ...rechistory.filter((q) => q.toLowerCase() !== question.toLowerCase()),
      ];

      localStorage.setItem("history", JSON.stringify(updatedHistory));
      setrechistory(updatedHistory);
    }

    const payloaddata = question ? question : selecthistory;
    // Prepare payload
    const payload = {
      contents: [
        {
          parts: [
            {
              text: payloaddata,
            },
          ],
        },
      ],
    };

    try {
      setloader(true);
      let res = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      res = await res.json();

      // Safety check before accessing deep properties
      const datastring = res?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      if (!datastring) throw new Error("No answer received from API");

      const splitAnswers = datastring
        .split("* ")
        .map((item) => item.trim())
        .filter(Boolean);

      setresult((prev) => [
        ...prev,
        { type: "q", text: question ? question : selecthistory },
        { type: "a", text: splitAnswers },
      ]);
      setquestion(""); // clear input
      setTimeout(() => {
        scrolltoans.current.scrollTop = scrolltoans.current.scrollHeight;
      }, 500);
      setloader(false);
    } catch (error) {
      console.error("Error fetching answer:", error);
    }
  };

  const isenter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // optional: prevent form submission
      askquestion();
    }
  };
  useEffect(() => {
    askquestion();
  }, [selecthistory]);
  return (
    <div className="grid-cols-5 grid h-screen text-center">
      <Recent
        rechistory={rechistory}
        setrechistory={setrechistory}
        setselecthistory={setselecthistory}
      />
      {/* Main chat */}
      <div className="col-span-4 p-10">
        <h1
          className="
        text-5xl
        bg-clip-text
        text-transparent
        bg-gradient-to-r from-red-500 to-amber-400
        leading-tight
        font-bold
        inline-block
        pb-5"
        >
          Hello Abhay, Ask something!
        </h1>
        {loader ? (
          <div role="status">
            <svg
              aria-hidden="true"
              class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        ) : null}
        <div ref={scrolltoans} className="container h-110 overflow-auto mb-10">
          <div className="text-white">
            <ul>
              {result.map((item, index) => (
                <Questionans key={index} item={item} index={index} />
              ))}
            </ul>
          </div>
        </div>

        {/* Input box */}
        <Inputbox
          question={question}
          askquestion={askquestion}
          isenter={isenter}
          setquestion={setquestion}
        />
      </div>
    </div>
  );
}

export default App;
