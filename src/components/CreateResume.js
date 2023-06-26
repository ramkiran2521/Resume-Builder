import { useEffect, useState } from "react";

import AddExtraDetail from "./AddExtraDetail";
import { useNavigate } from "react-router-dom";

const CreateResume = () => {
  const allSkill = [
    "C++",
    "Javascript",
    "HTML",
    "CSS",
    "ReactJs",
    "NodeJs",
    "GIT",
    "Python",
    "C",
    "PHP",
  ];

  const navigate = useNavigate();

  const [enteredDetails, setEnteredDetails] = useState({});
  const [eduItem, setEduItem] = useState(["edu0"]);
  const [expItem, setExpItem] = useState(["exp0"]);
  const [skills, setSkills] = useState([]);
  const [enteredSkill, setEnteredSkill] = useState("");

  const defaultState = {
    name: "",
    email: "",
    address: "",
    phoneNo: "",
    skills: "",
  };

  const [inputRecords, setInputRecords] = useState(defaultState);

  const inputChangeHandler = (e) => {
    const iKey = e.target.id;
    const iValue = e.target.value;

    setInputRecords({ ...inputRecords, [iKey]: iValue });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setEnteredDetails([inputRecords]);

    navigate("/show-resume", { state: inputRecords });
  };

  const addEduItem = () => {
    setEduItem((prev) => [...prev, "edu" + prev.length]);
  };

  const addExpItem = () => {
    setExpItem((prev) => [...prev, "exp" + prev.length]);
  };

  const removeItemHandler = (e) => {
    console.log(e.target.id);
    let filteredItem;

    if (e.target.id.includes("edu")) {
      filteredItem = eduItem.filter((ele) => ele !== e.target.id);
      setEduItem(filteredItem);
    } else {
      filteredItem = expItem.filter((ele) => ele !== e.target.id);
      setExpItem(filteredItem);
    }
    delete inputRecords[e.target.id];
    setInputRecords({ ...inputRecords });
  };

  const getDetails = (inp) => {
    setInputRecords({
      ...inputRecords,
      ...inp,
    });
  };

  const addSkills = (event) => {
    setEnteredSkill(event.target.value);
  };

  const removeAddedSkills = (e) => {
    let filteredSkills = skills.filter((ele) => ele !== e.target.id);
    setSkills(filteredSkills);
  };

  const autoFillEventHandler = (e) => {
    if (!skills.includes(e.target.innerText)) {
      setSkills([...skills, e.target.innerText]);
    }
  };

  useEffect(() => {
    setInputRecords({ ...inputRecords, skills: skills });
  }, [skills]);

  return (
    <div className="m-5">
      <form
        style={{
          boxShadow: "#0000000d 0px 0px 14px 8px",
        }}
        className="form-res p-3 w-50 mx-auto rounded"
        onSubmit={submitHandler}
      >
        <h1 className="text-center">CreateResume</h1>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            className="form-control"
            id="name"
            type="text"
            required
            value={inputRecords.name}
            onChange={inputChangeHandler}
          ></input>
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            className="form-control"
            id="email"
            type="email"
            required
            value={inputRecords.email}
            onChange={inputChangeHandler}
          ></input>
          <div></div>
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            className="form-control"
            id="address"
            type="text"
            required
            value={inputRecords.address}
            onChange={inputChangeHandler}
          ></input>
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            className="form-control"
            id="phoneNo"
            type="tel"
            maxLength="10"
            required
            value={inputRecords.phoneNo}
            onChange={inputChangeHandler}
          ></input>
        </div>
        <div className="form-group">
          <div className=" pt-3 pb-3 d-flex justify-content-between align-items-center ">
            <h6 className="mb-0">Education</h6>
            <button
              className="btn btn-outline-dark"
              onClick={addEduItem}
            >
              +
            </button>
          </div>

          {eduItem.map((ele) => {
            return (
              <AddExtraDetail
                key={ele}
                id={ele}
                detailtype="education"
                inputField1="institute"
                inputField2="passing-year"
                inputField3="degree"
                sendDetails={getDetails}
                onRemoveItem={removeItemHandler}
              />
            );
          })}
        </div>
        <div className="form-group">
          <div className=" pt-3 pb-3 d-flex justify-content-between align-items-center ">
            <h6 className="mb-0">Experience</h6>
            <button
              className="btn btn-outline-dark"
              onClick={addExpItem}
            >
              +
            </button>
          </div>

          {expItem.map((ele) => {
            return (
              <AddExtraDetail
                key={ele}
                id={ele}
                detailtype="experience"
                inputField1="company"
                inputField2="year-of-experience"
                inputField3="designation"
                sendDetails={getDetails}
                onRemoveItem={removeItemHandler}
              />
            );
          })}
        </div>
        <div className="form-group bg-light p-3 rounded">
          <h6 className="mb-0">Skills</h6>
          <div>
            <ul className="list-group flex-row py-3 w-100 flex-wrap">
              {skills.map((skill, i) => {
                return (
                  <li
                    className="py-2 px-3 mr-3 mb-3 list-group-item rounded d-flex align-items-center"
                    key={i}
                  >
                    <span>{skill}</span>
                    <button
                      id={skill}
                      className="p-2 ml-2 d-inline-flex  btn btn-outline-danger rounded "
                      onClick={removeAddedSkills}
                    >
                      X
                    </button>
                  </li>
                );
              })}
            </ul>
            <input
              className="form-control"
              placeholder="Add Skills"
              id="skills"
              type="text"
              onKeyUp={addSkills}
            ></input>
            <div className="position-relative">
              <ul
                style={{
                  maxHeight: "8em",
                  boxShadow: "#00000021 0px 5px 15px 5px",
                  overflow: "auto",
                }}
                className="list-group position-absolute w-100"
              >
                {allSkill.map((ele, index) => {
                  if (
                    ele
                      .toLocaleLowerCase()
                      .includes(enteredSkill.toLocaleLowerCase()) &&
                    enteredSkill.length > 0
                  ) {
                    return (
                      <li
                        className="list-group-item py-2"
                        key={index}
                        onClick={autoFillEventHandler}
                      >
                        {ele}
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          </div>
        </div>

        <button
          className="btn btn-outline-success w-100 mt-5"
          type="submit"
        >
          Create Resume
        </button>
      </form>
    </div>
  );
};

export default CreateResume;
