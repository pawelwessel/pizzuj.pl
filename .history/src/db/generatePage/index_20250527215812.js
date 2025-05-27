export async function generatePage(searchTerm) {
  await fetch(
    `${process.env.NEXT_PUBLIC_LINK}/api/generatePage/${createLinkFromText(
      searchTerm
    )}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
