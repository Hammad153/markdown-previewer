import React, { useState, useRef } from "react";
import { marked } from "marked";
import { FaExpandArrowsAlt } from "react-icons/fa";
import { TiArrowMinimise } from "react-icons/ti";
import "./App.css";

const App = () => {
  const value = ` # Welcome to my markdown previewer!\n
  ## This is a subheading.\n
  ### And Here are some other cool stuffs.
  # Markdown Previewer

  This is a line of text.

   ---

  This is another section below a horizontal line.

  ***

  Another horizontal line using asterisks.
  ___

  And one more using underscores.

  // This is a multiLine code 
      

  Wild Header | Crazy Header | Another Header?
  ------------ | ------------- | -------------
  Your content can | be here, and it | can be here....
  And here. | Okay. | I think we get it.


  - And of course there are lists.
    - Some are bulleted.
      - With different indentation levels.
          - That look like this.

  -And there are also number lists too
  ## Ordered List
  1. These is an ordered list that will be rendered as a number
  2. Let me call this step two
    1. As you can see this was rendered as a number as i mentioned at the top
    2. And ths is the step two beneath it

  You can also make text **bold**... whoa!
  Or _italic_.
  Or... wait for it... **_both!_**
  And feel free to go crazy ~~crossing stuff out~~.

  There's also [links](https://x.com/Ismailhamm27362), that will take you to my Twitter account, make sure that you follow me.😊
  > Block Quotes!

  1. And last but not least, let me show you also an incredible thing you can do with this which is embedding an images:
  ![Image Of a Cat](data:image/jpeg;base64,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)`;
 
  const [markdown, setMarkdown] = useState(value);
  const [visiblePage, setVisiblePage] = useState("both");
  const textareaRef = useRef(null); // Ref for textarea focus preservation

  marked.setOptions({
    gfm: true,
    breaks: true,
  });

  const handleInputChange = (e) => {
    setMarkdown(e.target.value);
  };

  const togglePage = (page) => {
    setVisiblePage((prevPage) => (prevPage === page ? "both" : page));
  };

  return (
    <div className="pp">
      {/* Editor */}
      <div
        className={`editor ${
          visiblePage === "Page2" ? "hidden" : ""
        }`}
        style={{
          height: visiblePage === "Page1" ? "100vh" : "30vh",
          transition: "height 0.3s ease",
        }}
      >
        <div className="top-div">
          <h2>Editor</h2>
          <button
            className="icon"
            onClick={() => togglePage("Page1")}
          >
            {visiblePage === "Page1" ? <TiArrowMinimise size={20}/> : <FaExpandArrowsAlt size={16}/>}
          </button>
        </div>
        <textarea
          ref={textareaRef}
          style={{
            resize: "none",
            height: visiblePage === "Page1" ? "95vh" : "50vh",
            transition: "height 0.3s ease",
          }}
          value={markdown}
          onChange={handleInputChange}
          placeholder="Enter Markdown text here..."
        ></textarea>
      </div>

      {/* Previewer */}
      <div
        className={`previewer ${
          visiblePage === "Page1" ? "hidden" : ""
        }`}
        style={{
          marginTop: visiblePage === "page1" ? "10px" : "",
          transition: "margin-top 0.3s ease", // Smooth transition
        }}
      >
        <div className="top-div">
          <h2>Previewer</h2>
          <button
            className="icon"
            onClick={() => togglePage("Page2")}
          >
            {visiblePage === "Page2" ? <TiArrowMinimise size={20}/> : <FaExpandArrowsAlt size={16}/>}
          </button>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: marked(markdown) }}
        ></div>
        <div className="top-div">
          <p style={{ marginLeft: "auto", marginRight: "auto" }}>
            Built with ❤️ by Ahmad
          </p>
        </div>
      </div>
    </div>
  );
      };

export default App;
