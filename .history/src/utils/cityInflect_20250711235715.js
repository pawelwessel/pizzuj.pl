import cities from "../data/cities.json";

export function getCityCase(slug, grammaticalCase = "nominative") {
  const city = cities.find((c) => c.slug === slug);
  if (!city) {
    // Fallback: return the slug with first letter capitalized
    return slug.charAt(0).toUpperCase() + slug.slice(1);
  }
  return city[grammaticalCase] || city.nominative;
}

export function getCityInfo(slug) {
  const city = cities.find((c) => c.slug === slug);
  if (!city) {
    // Fallback: return basic info with capitalized slug
    return {
      name: slug.charAt(0).toUpperCase() + slug.slice(1),
      slug: slug,
      nominative: slug.charAt(0).toUpperCase() + slug.slice(1),
      accusative: slug.charAt(0).toUpperCase() + slug.slice(1),
      locative: slug.charAt(0).toUpperCase() + slug.slice(1),
      genitive: slug.charAt(0).toUpperCase() + slug.slice(1),
      dative: slug.charAt(0).toUpperCase() + slug.slice(1),
      instrumental: slug.charAt(0).toUpperCase() + slug.slice(1),
    };
  }
  return city;
}
