import { useEffect, useState } from "react";

const AddExtraDetail = (props) => {
  const [extraDetails, setExtraDetails] = useState({});

  const isFirstItem = props.id.slice(-1) <= 0;

  const changeHandler = (e) => {
    const ikey = e.target.name;
    const ivalue = e.target.value;
    console.log(extraDetails);

    setExtraDetails({ ...extraDetails, [ikey]: ivalue });
  };

  useEffect(() => {
    props.sendDetails({
      [props.id]: extraDetails,
    });
  }, [extraDetails]);

  return (
    <div className="mb-3 p-3 bg-light rounded" id={props.id}>
      {!isFirstItem && (
        <div className="d-flex justify-content-end">
          <button
            id={props.id}
            className="btn btn-outline-danger "
            onClick={props.onRemoveItem}
          >
            X
          </button>
        </div>
      )}
      <div className="form-group">
        <label>{props.inputField1}</label>
        <input
          className="form-control"
          name={props.inputField1}
          id={props.inputField1 + props.id}
          type="text"
          required
          onChange={changeHandler}
        />
      </div>
      <div className="form-group">
        <label>{props.inputField2}</label>
        <input
          className="form-control"
          name={props.inputField2}
          id={props.inputField2 + props.id}
          type="number"
          min="0"
          step="1"
          required
          onChange={changeHandler}
        />
      </div>
      <div className="form-group">
        <label>{props.inputField3}</label>
        <input
          className="form-control"
          name={props.inputField3}
          id={props.inputField3 + props.id}
          type="text"
          required
          onChange={changeHandler}
        />
      </div>
    </div>
  );
};

export default AddExtraDetail;
