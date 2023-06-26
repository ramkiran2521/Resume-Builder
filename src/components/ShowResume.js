import { useLocation } from "react-router-dom";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";

const ShowResume = () => {
  const { state } = useLocation();
  const education = [];
  const experience = [];

  const resume = useRef();
  if (state) {
    Object.keys(state).map((key) => {
      if (key.includes("edu")) {
        return education.push(state[key]);
      } else if (key.includes("exp")) {
        return experience.push(state[key]);
      }
    });

    const downloadResume = () => {
      const input = resume.current;
      console.log(input);
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("pdf");
        const pdf = new jsPDF("p", "mm", "a4", true);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(
          pdfWidth / imgWidth,
          pdfHeight / imgHeight
        );
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 30;

        pdf.addImage(
          imgData,
          "PNG",
          imgX,
          imgY,
          imgWidth * ratio,
          imgHeight * ratio
        );
        pdf.save(`${name}.pdf`);
      });
    };

    const name = state.name[0].toUpperCase() + state.name.slice(1);
    return (
      <div className="p-5">
        <div className="d-flex justify-content-end pr-3 pb-3">
          <button
            className="btn btn-primary "
            onClick={downloadResume}
          >
            Download Now
          </button>
        </div>
        <div
          ref={resume}
          style={{
            width: "1240px",
            boxShadow: "#0000000d 0px 0px 14px 8px",
          }}
          className="resume-sec bg-body mx-auto p-3"
        >
          <div className=" py-2 border-bottom border-dark">
            <h1>{name}</h1>
            <div className="d-flex justify-content-between">
              <span>{state.phoneNo}</span>
              <span>{state.email}</span>
              <span>{state.address}</span>
            </div>
          </div>
          <div className="py-2">
            <h4>EDUCATION</h4>
            <table className="table w-100 m-0">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Institute</th>
                  <th scope="col">Degree</th>
                  <th scope="col">Year of passing</th>
                </tr>
              </thead>
              <tbody>
                {education.map((ele, index) => {
                  return (
                    <tr key={index}>
                      <td>{ele.institute}</td>
                      <td>{ele["passing-year"]}</td>
                      <td>{ele.degree}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="py-2">
            <h4>EXPERIENCE</h4>
            <table className="table m-0">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Company</th>
                  <th scope="col">Year of Experience</th>
                  <th scope="col">Designation</th>
                </tr>
              </thead>
              <tbody>
                {experience.map((ele, index) => {
                  return (
                    <tr key={index}>
                      <td>{ele.company}</td>
                      <td>{ele["year-of-experience"]}</td>
                      <td>{ele.designation}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div>
            <h4>SKILLS</h4>
            <div className="d-flex flex-wrap">
              {state.skills.map((ele, index) => {
                return (
                  <span
                    key={index}
                    className="bg-primary p-2 mr-2 rounded text-white"
                  >
                    {ele}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <a href="/">CreateResume</a>;
  }
};

export default ShowResume;
