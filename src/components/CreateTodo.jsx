import React, { useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

function CreateTodo() {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState("");

  const [subTasksTitle, setSubTasksTitle] = useState([{ title: "" }]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value.split(",").map((tag) => tag.trim()));
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubTasksTitleChange = (e) => {
    setSubTasksTitle(
      e.target.value.split(",").map((subTask) => ({ title: subTask.trim() }))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const todo = {
      title,
      description,
      tags,
      subTasks: subTasksTitle,
    };
    // console.log(todo);

    alert("Todo Created Successfully");

    setTitle("");
    setTags([]);
    setDescription("");
    setSubTasksTitle([{ }]);

    /* ------ POST DATA ------ */
    axios
      .post("https://todo-backend-db.herokuapp.com/todos", todo)
      .then((res) => console.log("ok"));
  };

  return (
    <div id="createTodo_div" >
      <div className="container" style={{ width: "35rem" }}>
        <div className="card mb-3" style={{ padding: "1rem" }}>
          <Button variant="danger" id="close_span">
            {" "}
            x{" "}
          </Button>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  aria-describedby="title"
                  placeholder="Enter Title"
                  value={title}
                  onChange={handleTitleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="tags">
                  Tags ( if mutiple write with comma separated ){" "}
                </label>
                <input
                  type="text"
                  className="
                form-control"
                  id="tags"
                  aria-describedby="tags"
                  placeholder="Enter Tags"
                  value={tags}
                  onChange={handleTagsChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="3"
                  value={description}
                  onChange={handleDescriptionChange}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="subTasksTitle">
                  Sub-Task ( if mutiple write with comma separated )
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="subTasksTitle"
                  aria-describedby="subTasksTitle"
                  placeholder="Enter Sub-Task"
                  onChange={handleSubTasksTitleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Create Todo
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTodo;
