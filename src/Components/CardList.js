import Card from "./Card";

function CardList({ list }) {
  return (
    <div className="grid">
      {list.map((item, index) => (
        <Card key={index} info={item} />
      ))}
    </div>
  );
}

export default CardList;
