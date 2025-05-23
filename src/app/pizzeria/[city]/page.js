import City from "../../../components/City";
export default async function Page({ params }) {
  const { city } = await params; // Extract city from params
  return (
    <div>
      <h1>Pizza Places in {city}</h1>
      <City city={city} />
    </div>
  );
}
