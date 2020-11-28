import Loading from "./Loading";

function Scroll(props) {
  return (
    <div className="scroll">
      {props.isLoading ? <Loading /> : <div>{props.children}</div>}
    </div>
  );
}

export default Scroll;
