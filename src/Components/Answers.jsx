import { useEffect, useState } from "react";
import { checker, rmstar } from "../helper";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";

const Answer = ({ ans, index, total }) => {
  const [heading, setheading] = useState(false);
  const [res, setres] = useState(ans);

  useEffect(() => {
    if (checker(ans)) {
      setheading(true);
      setres(rmstar(ans));
    }
  }, [ans]);

  const render = {
    code({ inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      const lang = match ? match[1] : "cpp"; // default to cpp if not found
      return !inline ? (
        <SyntaxHighlighter {...props} language={lang} style={dark} PreTag="div">
          {String(children)}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <>
      {total > 1 && index === 0 ? (
        <span className="text-lg block">{res}</span>
      ) : heading ? (
        <span className="font-bold py-2 block text-zinc-300">{res}</span>
      ) : (
        <span>
          <ReactMarkdown components={render}>{res}</ReactMarkdown>
        </span>
      )}
    </>
  );
};

export default Answer;
