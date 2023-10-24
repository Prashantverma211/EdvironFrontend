import React, { useRef, useState } from "react";
import styles from "./_schoolForm.module.scss";
import Error from "../../Modal/Error/Error";
import { EdvitronAction } from "../../../store/edvitron-slice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function SchoolForm() {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const history = useHistory();
  const edvitronState = useSelector((state) => state.edvitron);
  const [error, setError] = useState({ isError: false, errorMessage: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("School ID submitted:", inputRef.current.value);
    const schoolId = { schoolId: inputRef.current.value };
    const isValidId = async () => {
      dispatch(EdvitronAction.idLoading(true));

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/idCheck`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(schoolId),
        }
      );

      dispatch(EdvitronAction.idLoading(false));
      if (!response.ok) {
        const resData = await response.json();
        throw resData;
      }
      const resData = await response.json();
      console.log(resData);
      if (resData.schoolId) {
        dispatch(
          EdvitronAction.setSchoolId({
            schoolId: resData.schoolId,
            schoolName: resData.schoolName,
          })
        );
      }

      history.push("./homePage/dashboard");
      return "Valid Id";
    };

    try {
      const res = await isValidId();
      console.log("stripe payment: " + res);
    } catch (error) {
      setError({ isError: true, errorMessage: error.message });
    }
  };

  return (
    <div className={styles.school_form}>
      {error.isError && (
        <Error message={error?.errorMessage || "Server Error"}></Error>
      )}
      <h2>Edvitron</h2>
      <form
        onSubmit={
          edvitronState.idLoading
            ? (e) => {
                e.preventDefault();
              }
            : handleSubmit
        }
      >
        <div>
          <label htmlFor="school_id">School ID:</label>
          <input
            type="text"
            id="school_id"
            placeholder="school_id"
            ref={inputRef}
          />
        </div>

        {!edvitronState.idLoading && <button type="submit">Submit</button>}

        {edvitronState.idLoading && <button>Loading...</button>}
      </form>
    </div>
  );
}

export default SchoolForm;
