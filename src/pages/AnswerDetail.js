import React from "react";
import { IoPersonOutline } from "react-icons/io5";

function AnswerDetail({ answer }) {
  return (
		<div className="header_question">
			<div className="question_user" style={{ textAlign: "center" }}>
				<IoPersonOutline style={{ width: "90%", height: "80%" }} />
				<span>{answer ? answer.user_name : "Unknown User"} </span>
			</div>
			<div className="question_title" style={{ height: "80%" }}>
				<div> {answer ? answer.answer : "New Answer"}</div>
			</div>
		</div>
	);
}

export default AnswerDetail;
