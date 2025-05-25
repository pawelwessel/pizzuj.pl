export function createLinkFromText(sentence) {
  const translationDict = {
    ą: "a",
    ć: "c",
    ę: "e",
    ł: "l",
    ń: "n",
    ś: "s",
    ó: "o",
    ż: "z",
    ź: "z",
  };
  const sanitizedSentence = sentence
    ?.replace(
      /[ąćęłńśóżź]/gi,
      (matched) => translationDict[matched?.toLowerCase()] || ""
    )
    .replace(/\s/g, "-")
    .replace(/[^\w\s-]/g, "")
    .toLowerCase()
    .replace(/-+/g, "-")
    .replace(/-$/, "");

  return sanitizedSentence;
}
