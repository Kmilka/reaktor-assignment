function Switcher({ categories, categoryOnDisplay, switchCategory }) {
  return (
    <div className="switcher flex-row">
      {categories.map((item, index) => {
        return (
          <button
            style={
              categoryOnDisplay === item ? { border: "2px solid black" } : {}
            }
            onClick={() => switchCategory(item)}
            key={index}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}

export default Switcher;
