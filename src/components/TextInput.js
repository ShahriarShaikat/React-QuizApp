import classes from "../styles/TextInput.module.css";

export default function TextInput({ iconName, ...rest }) {
  return (
    <div className={classes.textInput}>
      <input {...rest} />
      <span className="material-icons-outlined"> {iconName} </span>
    </div>
  );
}
