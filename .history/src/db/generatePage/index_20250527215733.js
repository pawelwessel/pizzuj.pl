export async function generatePage() {
    setIsLoading(true);
    setLoadingStarted(true);
    setError(null);
    const existingPage = await getDocument(
      "pages",
      createLinkFromText(searchTerm)
    );
    if (existingPage) {
      setIsLoading(false);
      setSearchTerm("");
      setError(null);
      // Redirect to the existing page
      window.location.href = `/${createLinkFromText(searchTerm)}`;
      return;
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_LINK}/api/generatePage/${createLinkFromText(
        searchTerm
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).