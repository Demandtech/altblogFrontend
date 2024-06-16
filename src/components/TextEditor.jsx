import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import PropTypes from "prop-types";

const TextEditor = ({ setValues, body, setIsEdited }) => {
	const modules = {
		toolbar: [
			[{ header: "1" }, { header: "2" }, { font: [] }],
			[{ size: [] }],
			["bold", "italic", "underline", "strike", "blockquote"],
			[
				{ list: "ordered" },
				{ list: "bullet" },
				{ indent: "-1" },
				{ indent: "+1" },
			],
			["link", "image", "video"],
			["clean"],
		],
	};
	const formats = [
		"header",
		"font",
		"size",
		"bold",
		"italic",
		"underline",
		"strike",
		"blockquote",
		"list",
		"bullet",
		"indent",
		"link",
		"image",
		"video",
	];
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
						if (setIsEdited) {
							setIsEdited(true);
						}
					}}
					value={body}
					style={{ height: "400px" }}
					modules={modules}
					formats={formats}
				></ReactQuill>
			</div>
		</div>
	);
};

TextEditor.propTypes = {
	body: PropTypes.string,
	setValues: PropTypes.func,
	setIsEdited: PropTypes.func,
};

export default TextEditor;
