import Loading from "./Loading";

function Card({ info }) {
  return (
    <div className="card">
      <div className="fixed-height">
        <p className="name">{info.name}</p>
        <p>Price: {info.price}</p>
        <p>Colors: {info.color.join("-")}</p>
        <p>Mfr.: {info.manufacturer}</p>
      </div>
      {info.availability ? (
        // todo: find better way to style availability info due to text
        <p
          className={
            info.availability === "OUT OF STOCK"
              ? "out"
              : info.availability === "LESS THAN 10"
              ? "less-than-10"
              : ""
          }
        >
          {info.availability}
        </p>
      ) : (
        <Loading />
      )}
    </div>
  );
}
export default Card;
