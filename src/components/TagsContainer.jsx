import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Badge from "react-bootstrap/Badge";
import { v4 as uuidv4 } from "uuid";
import { Spinner } from "react-bootstrap";

import { fetchTodos, fetchTags } from "../redux/action/todoAction";

function TagsContainer({tpage}) {
  const [tag, setTag] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodos("", tag));
  }, [dispatch, tag]);

  useEffect(() => {
    // console.log("tpage", tpage);
    dispatch(fetchTags(tpage));
  }, [dispatch, tpage]);

  const tags = useSelector((state) => state.todo.tags);
  const loading = useSelector((state) => state.todo.loading);

  let arr = [];
  tags.map((todo) => {
    todo.tags.map((tag) => {
      arr.push(tag);
    });
  });

  let unique = [...new Set(arr)];
  unique.sort();
  //   console.log("unique", unique);

  const handleClick = (tag) => {
    setTag(tag);
  };

  return (
    <>
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
        >
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div>
          <div className="tags-container">
            {unique.map((tag) => {
              return (
                <Badge
                  style={{ cursor: "pointer", margin: "5px" }}
                  key={uuidv4()}
                  onClick={() => {
                    handleClick(tag);
                  }}
                >
                  {tag}
                </Badge>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default TagsContainer;
