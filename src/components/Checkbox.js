export default function Checkbox({
  indicator = null,
  text,
  className,
  ...rest
}) {
  return (
    <label className={className}>
      <input type="checkbox" {...rest} /> <span>{text}</span>
      {indicator ? (
        <span
          className="material-icons-outlined"
          style={{
            fontSize: "18px",
            color: "#25194c",
          }}
        >
          {indicator}
        </span>
      ) : null}
    </label>
  );
}
