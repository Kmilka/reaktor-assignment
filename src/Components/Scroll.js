import { useEffect, useState, useRef } from "react";

import Loading from "./Loading";

function Scroll(props) {
  let scrollChild = useRef(null);
  const content = props.children.props.list;
  const stepValue = 20;
  let [stepNumber, setStepNumber] = useState(1);
  let [visibleContent, setVisibleContent] = useState(
    content.slice(0, stepValue)
  );
  let [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    createObserver();
    // when component dismounts it sets state to the initial
    return () => {
      setStepNumber(1);
      setVisibleContent(content.slice(0, stepValue));
    };
  }, []);

  useEffect(() => {
    const min = Math.min(content.length, stepValue * (stepNumber + 1));
    // if the whole content list is on display, it stops to show loader
    if (min !== content.length) {
      setHasMore(true);
    }
    setStepNumber(stepNumber + 1);
    setVisibleContent(content.slice(0, min));
  }, [hasMore]);

  const createObserver = () => {
    let options = {
      // default
      rootMargin: "0px",
      // default
      threshold: 1,
    };

    const observer = new IntersectionObserver(() => {
      //triggers rerender
      setHasMore(false);
    }, options);
    observer.observe(scrollChild.current);
  };

  return (
    <div className="scroll">
      <props.children.type list={visibleContent} />
      <div ref={scrollChild}>{hasMore && <Loading />}</div>
    </div>
  );
}

export default Scroll;
