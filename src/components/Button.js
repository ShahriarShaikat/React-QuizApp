import classes from "../styles/button.module.css";

export default function Button({ className, children, ...rest }) {
  return (
    <button className={`${classes.button} ${className}`} {...rest}>
      <span>{children}</span>
    </button>
  );
}
