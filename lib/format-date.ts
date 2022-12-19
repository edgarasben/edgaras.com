export function formatDate(dateString: string) {
    const date = new Date(dateString)
    const options = { month: 'short', day: 'numeric' } as Intl.DateTimeFormatOptions
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date)
    return formattedDate
}
