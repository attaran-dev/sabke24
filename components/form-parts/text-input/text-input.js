function TextInput(props) {
  return (
    <>
      <label htmlFor={props.id}>{props.children}</label>
      <input type="text" id={props.id} name={props.id} />
    </>
  );
}
