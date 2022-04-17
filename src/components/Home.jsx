import React, { useEffect, useState } from "react";
import DebounceInput from "react-debounce-input";
import Badge from "react-bootstrap/Badge";
import { v4 as uuidv4 } from "uuid";
import { Spinner } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";

import {
  fetchTodos,
  toggleStatus,
  toggleSubTask,
  deleteTodo,
  fetchTags,
} from "../redux/action/todoAction";

import TagsContainer from "./TagsContainer";

function Home() {
  const [search, setSearch] = useState("");
  const [tpage, setTpage] = useState(1);

  const dispatch = useDispatch();

  useEffect(
    (tpage) => {
      dispatch(fetchTodos(search, "", tpage));
    },
    [dispatch, search]
  );

  const todos = useSelector((state) => state.todo.todos);
  const loading = useSelector((state) => state.todo.loading);

  return (
    <div className="" style={{ width: "100%" }}>
      <div
        style={{
          border: "1px solid black",
          display: "flex",
          minHeight: "100vh",
        }}
      >
        <div
          className="filter_div"
          style={{ borderRight: "1px solid black", flexBasis: "28%" }}
        >
          <div className="badge-container" style={{ margin: "1rem" }}>
            <div
              className="
          d-flex justify-content-between align-items-sm-center"
            >
              <h5>Filter</h5>
              <button
                className="btn btn-outline-danger btn-sm clear_btn"
                onClick={() => {
                  // console.log("clear");
                  dispatch(fetchTodos());
                  setSearch("");
                  dispatch(fetchTags(1));
                  setTpage(1);
                }}
              >
                Clear All
              </button>
            </div>
            <hr />
            <h5>Tags</h5>
            <TagsContainer tpage={tpage} />
          </div>

          <div className="badge-container" style={{ margin: "1rem" }}>
            <hr />
            <div className="">
              <h5>Search</h5>
              <DebounceInput
                className="form-control form-control-sm "
                style={{ marginBottom: "1.5rem" }}
                debounceTimeout={500}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                placeholder="Title's "
              />
            </div>
          </div>
        </div>

        {todos.length === 0 && search.length > 1 ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ flexBasis: "100%" }}
          >
            <h1>No Todos Found</h1>
          </div>
        ) : todos.length === 0 || loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ flexBasis: "100%" }}
          >
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <div className="container todo_card" style={{ flexBasis: "100%" }}>
            {todos.map((todo) => (
              <div className="card mb-3" key={todo._id}>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-sm-center">
                    <h5 className="card-title">{todo.title}</h5>
                    <div style={{marginBottom:"0.5rem"}} >{
                      new Date(todo.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    }</div>
                  </div>
                  <div className="card-text" style={{ marginBottom: "1rem" }}>
                    <div className="d-flex justify-content-between align-items-sm-center">
                      <div>
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => {
                            dispatch(toggleStatus(todo._id, tpage));
                          }}
                        >
                          {todo.isCompleted === false ? "Active" : "Completed"}
                        </button>
                      </div>

                      <div>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => {
                            dispatch(deleteTodo(todo._id, tpage));
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <div className="badge_tag">
                      {todo.tags.map((tag) => (
                        <span key={tag}>
                          <Badge bg="secondary">{tag}</Badge>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ marginBottom: "1rem" }}>
                    <h5 className="card-title">Description</h5>
                    <p className="card-text">{todo.description}</p>
                  </div>

                  <div className="">
                    <h5 className="card-title">Sub-Task</h5>
                    {todo.subTasks.map((subTask) => (
                      <div className="form-check" key={uuidv4()}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id={subTask._id}
                          checked={subTask.isCompleted}
                          onChange={() => {
                            dispatch(
                              toggleSubTask(todo._id, subTask._id, tpage)
                            );
                          }}
                        />
                        <label
                          className={
                            subTask.isCompleted
                              ? "form-check-label text-decoration-line-through text-muted"
                              : "form-check-label"
                          }
                          htmlFor={subTask._id}
                        >
                          {subTask.title}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pagination_div" style={{ margin: "1rem" }}>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ gap: "1rem" }}
        >
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => {
              setTpage(tpage - 1 > 0 ? tpage - 1 : 1);
            }}
            disabled={tpage === 1}
            style={{
              backgroundColor: tpage === 1 ? "#ccc" : "",
              // cursor: tpage === 1 ? "not-allowed" : "pointer",
            }}
          >
            Previous
          </button>
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => {
              setTpage(tpage + 1 || 1);
            }}
            disabled={todos.length < 10}
            style={{
              backgroundColor: todos.length < 10 ? "#ccc" : "",
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
