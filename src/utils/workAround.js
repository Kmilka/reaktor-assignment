export const formatPayload = (payload) => {
  let formattedPayload = payload.replace(
    "<AVAILABILITY>\n  <INSTOCKVALUE>",
    ""
  );
  formattedPayload = formattedPayload.replace(
    "</INSTOCKVALUE>\n</AVAILABILITY>",
    ""
  );
  switch (formattedPayload) {
    case "OUTOFSTOCK":
      formattedPayload = "OUT OF STOCK";
      break;
    case "LESSTHAN10":
      formattedPayload = "LESS THAN 10";
      break;
    case "INSTOCK":
      formattedPayload = "IN STOCK";
      break;
    default:
      break;
  }

  return formattedPayload;
};
