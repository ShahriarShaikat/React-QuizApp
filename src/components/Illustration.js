import classes from "../styles/illustration.module.css";

export default function Illustration(props) {
  return (
    <div className={classes.illustration}>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img {...props} />
    </div>
  );
}
