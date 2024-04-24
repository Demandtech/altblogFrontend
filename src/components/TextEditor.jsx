import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import PropTypes from "prop-types";

const TextEditor = ({ setValues, body }) => {
	return (
		<div>
			<div>
				<ReactQuill
					theme="snow"
					className=""
					placeholder="write your content ...."
					onChange={(content) => {
						setValues((prev) => {
							return {
								...prev,
								body: content,
							};
						});
					}}
					value={body}
					style={{ height: "400px" }}
				></ReactQuill>
			</div>
		</div>
	);
};

TextEditor.propTypes = {
	body: PropTypes.string,
	setValues: PropTypes.func,
};

export default TextEditor;
