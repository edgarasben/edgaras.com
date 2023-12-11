async function fetchEvents() {
  const response = await fetch(
    'https://www.vega.dk/umbraco/api/EventApi/List?culture=da&date=%7B%7D&includeArchived=false&itemsPerPage=36&pageNumber=1&searchTerm=&siteNodeId=1117&skipPrevious=false',
  )
  const data = await response.json()
  return data.Items
}

export default async function Test() {
  const events = await fetchEvents()
  return (
    <div className="mx-auto mt-24 max-w-7xl space-y-8">
      {events.map((event) => (
        <div key={event.Id} className="rounded-xl border p-8">
          <h2>{event.Name}</h2>
          <p>{event.Start}</p>
          <p className="flex font-bold">{event.GenreNames.join(', ')}</p>
          {/* Additional event details */}
        </div>
      ))}
    </div>
  )
}
