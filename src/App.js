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
  ![Image Of a beautiful Cat](https://i.im.ge/2025/01/22/HQVAs9.a252bcd6-9a10-40be-bf99-1d850d2026e4.jpeg)`;
 
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
