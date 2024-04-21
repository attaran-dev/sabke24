function Button(props) {
  if (props.disabled) {
    return <button disabled>{props.children}</button>;
  }
  return <button>{props.children}</button>;
}

export default Button;