import Answer from "./Answers";

const Questionans = ({ item, index }) => {
  if (item.type === "q") {
    return (
      <li className="flex justify-end p-2">
        <div className="text-amber-400 text-lg border border-zinc-500 rounded-3xl bg-zinc-700 px-4 max-w-[70%]">
          <Answer ans={item.text} index={0} total={1} />
        </div>
      </li>
    );
  } else {
    return item.text.map((ansitem, ansindex) => (
      <li key={`${index}-${ansindex}`} className="flex justify-start">
        <div className="text-left text-white px-4 max-w-[70%]">
          <Answer ans={ansitem} index={ansindex} total={item.text.length} />
        </div>
      </li>
    ));
  }
};

export default Questionans;
