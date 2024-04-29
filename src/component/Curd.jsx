import React, { useRef, useState } from "react";
import "./styles.css"
function Curd() {
  const list = [
    {
      id: 1,
      name: "HP",
      Price: "2000",
      email: "hp@example.com",
      subject: "Computer Science",
      grade: "A",
    },
    {
      id: 2,
      name: "Dell",
      Price: "2000",
      email: "dell@example.com",
      subject: "Mathematics",
      grade: "B",
    },
  ];

  const [lists, setList] = useState(list);
  const [updateState, setupdateState] = useState(-1);

  function handleEdit(id) {
    setupdateState(id);
  }

  function handledelte(id) {
    const newlist = lists.filter((li) => li.id !== id);
    setList(newlist);
  }

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   const name = event.target.elements.name.value;
  //   const price = event.target.elements.price.value;
  //   const email = event.target.elements.email.value;
  //   const subject = event.target.elements.subject.value;
  //   const grade = event.target.elements.grade.value;

  //   const newlist = lists.map((li) =>
  //     li.id === updateState
  //       ? { ...li, name, Price: price, email, subject, grade }
  //       : li
  //   );

  //   setList(newlist);
  //   setupdateState(-1);
  // }
  function handleSubmit(updatedItem) {
    const newlist = lists.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setList(newlist);
    setupdateState(-1);
  }

  return (
    <div className="Curd">
      <div>
        <AddList setList={setList} />
        <form onSubmit={handleSubmit} >
          <table>
            <tbody>
              {lists.map((current) =>
                updateState === current.id ? (
                  <EditList
                    key={current.id}
                    current={current}
                    lists={lists}
                    setList={setList}
                    handleSubmit={handleSubmit}
                  />
                ) : (
                  <tr key={current.id}>
                    <td>{current.name}</td>
                    <td>{current.Price}</td>
                    <td>{current.email}</td>
                    <td>{current.subject}</td>
                    <td>{current.grade}</td>
                    <td>
                      <button
                        className="edit"
                        onClick={() => handleEdit(current.id)}
                      >
                        edit
                      </button>
                      <button
                        className="delete"
                        type="button"
                        onClick={() => handledelte(current.id)}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
}

function EditList({ current, handleSubmit }) {
  const [updatedItem, setUpdatedItem] = useState(current);

  function handleInput(name, value) {
    setUpdatedItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  }

  function handleUpdate() {
    handleSubmit(updatedItem);
  }

  return (
    <tr>
      <td>
        <input
          type="text"
          onChange={(e) => handleInput("name", e.target.value)}
          name="name"
          value={updatedItem.name}
        ></input>
      </td>
      <td>
        <input
          type="text"
          onChange={(e) => handleInput("Price", e.target.value)}
          name="Price"
          value={updatedItem.Price}
        ></input>
      </td>
      <td>
        <input
          type="text"
          onChange={(e) => handleInput("email", e.target.value)}
          name="email"
          value={updatedItem.email}
        ></input>
      </td>
      <td>
        <input
          type="text"
          onChange={(e) => handleInput("subject", e.target.value)}
          name="subject"
          value={updatedItem.subject}
        ></input>
      </td>
      <td>
        <input
          type="text"
          onChange={(e) => handleInput("grade", e.target.value)}
          name="grade"
          value={updatedItem.grade}
        ></input>
      </td>
      <td>
        <button type="button" className="update" onClick={handleUpdate}>
          Update
        </button>
      </td>
    </tr>
  );
}


function AddList({ setList }) {
  const nameRef = useRef();
  const priceRef = useRef();
  const emailRef = useRef();
  const subjectRef = useRef();
  const gradeRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    const name = nameRef.current.value;
    const price = priceRef.current.value;
    const email = emailRef.current.value;
    const subject = subjectRef.current.value;
    const grade = gradeRef.current.value;

    const newlist = {
      id: Math.random(),
      name,
      Price: price,
      email,
      subject,
      grade,
    };

    setList((prevList) => {
      return [...prevList, newlist];
    });

    nameRef.current.value = ""; // Clear input value
    priceRef.current.value = ""; // Clear input value
    emailRef.current.value = ""; // Clear input value
    subjectRef.current.value = ""; // Clear input value
    gradeRef.current.value = ""; // Clear input value
  }

  return (
    <div className="main-section">
      <h2>CURD-Operation</h2>
    <form className="form-div" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="enter your name"
        ref={nameRef} // Assign ref to the input element
      />
      <input
        type="text"
        name="Price"
        placeholder="enter your price"
        ref={priceRef} // Assign ref to the input element
      />
      <input
        type="text"
        name="email"
        placeholder="enter your email"
        ref={emailRef} // Assign ref to the input element
      />
      <input
        type="text"
        name="subject"
        placeholder="enter your subject"
        ref={subjectRef} // Assign ref to the input element
      />
      <input
        type="text"
        name="grade"
        placeholder="enter your grade"
        ref={gradeRef} // Assign ref to the input element
      />
      <button type="submit" className="button-submit">submit</button>
    </form>
    </div>
  );
}

export default Curd;
