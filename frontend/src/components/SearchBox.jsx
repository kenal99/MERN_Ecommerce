import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [keyword, setkeyword] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <form class="d-flex me-3" onSubmit={submitHandler}>
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search Products..."
          aria-label="Search"
          value={keyword}
          onChange={(e) => setkeyword(e.target.value)}
        />
        <button class="btn btn-outline-light" type="submit">
          Search
        </button>
      </form>
    </>
  );
};

export default SearchBox;
