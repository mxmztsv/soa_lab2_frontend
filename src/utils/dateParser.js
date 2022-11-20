export const parseDate = (rawDate) => {
	const rawDatePart = rawDate.split('[')[0]
	const date = new Date(rawDatePart)
	return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
}
