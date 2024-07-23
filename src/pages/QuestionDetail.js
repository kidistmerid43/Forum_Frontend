import React from "react";
import { useNavigate } from "react-router-dom";
import { IoPersonOutline } from "react-icons/io5";
import "../pages/question.css";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

function QuestionDetail({ question }) {
  const navigate = useNavigate();
  console.log(question)

  const handleClick = () => {
    navigate(`/answer/${question.questionid}`);
  };
  
  return (
		<div className="header_question">
			<div className="question_user" style={{ textAlign: "center" }}>
				<IoPersonOutline 
					style={{ width: "80%", height: "80%", margin: "auto" }}
				/>
				<div style={{ width: "80%", height: "20%", margin: "auto" }}>
					{question ? question.username + "" : "New User"}{" "}
				</div>
			</div>
			<div className="question_title" onClick={handleClick}>
				<div className="question_content">
					{question ? question.title : "New Title"}
				</div>
				<div className="question_arrow">
					<MdKeyboardDoubleArrowRight size={25} />
				</div>
			</div>
		</div>
	);
}

export default QuestionDetail;
