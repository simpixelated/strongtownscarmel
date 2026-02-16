import { DateTime } from "luxon";

export default function(eleventyConfig) {
	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
	});

	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat('yyyy-LL-dd');
	});

	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n) => {
		if(!Array.isArray(array) || array.length === 0) {
			return [];
		}
		if( n < 0 ) {
			return array.slice(n);
		}

		return array.slice(0, n);
	});

	// Return the smallest number argument
	eleventyConfig.addFilter("min", (...numbers) => {
		return Math.min.apply(null, numbers);
	});

	// Return the keys used in an object
	eleventyConfig.addFilter("getKeys", target => {
		return Object.keys(target);
	});

	eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter(tag => ["all", "posts"].indexOf(tag) === -1);
	});

	eleventyConfig.addFilter("sortAlphabetically", strings =>
		(strings || []).sort((a, b) => a.localeCompare(b))
	);

	// Get tag counts from collections
	eleventyConfig.addFilter("getTagCounts", collections => {
		const tagCounts = {};
		Object.keys(collections).forEach(tag => {
			if (!["all", "posts"].includes(tag)) {
				tagCounts[tag] = collections[tag].length;
			}
		});
		return tagCounts;
	});

	// Sort tags by count (descending)
	eleventyConfig.addFilter("sortByCount", (tags, tagCounts) => {
		return (tags || []).sort((a, b) => (tagCounts[b] || 0) - (tagCounts[a] || 0));
	});

	// Filter events into upcoming (future) events
	eleventyConfig.addFilter("upcomingEvents", (events) => {
		// Normalize "now" and event dates to UTC and compare at day granularity
		const today = DateTime.utc().startOf("day");
		return (events || []).filter(event => {
			if (!event || !event.date) {
				return false;
			}
			// Use eventDate if available, otherwise fall back to date
			const eventDateValue = event.data?.eventDate || event.date;
			const eventDate = DateTime.fromJSDate(new Date(eventDateValue), { zone: "utc" }).startOf("day");
			return eventDate >= today;
		});
	});

	// Filter events into past events and reverse chronological order
	eleventyConfig.addFilter("pastEvents", (events) => {
		// Normalize "now" and event dates to UTC and compare at day granularity
		const today = DateTime.utc().startOf("day");
		return (events || [])
			.filter(event => {
				if (!event || !event.date) {
					return false;
				}
				// Use eventDate if available, otherwise fall back to date
				const eventDateValue = event.data?.eventDate || event.date;
				const eventDate = DateTime.fromJSDate(new Date(eventDateValue), { zone: "utc" }).startOf("day");
				return eventDate < today;
			})
			.sort((a, b) => {
				const aDateValue = a.data?.eventDate || a.date;
				const bDateValue = b.data?.eventDate || b.date;
				const aDate = DateTime.fromJSDate(new Date(aDateValue), { zone: "utc" }).startOf("day");
				const bDate = DateTime.fromJSDate(new Date(bDateValue), { zone: "utc" }).startOf("day");
				return bDate.toMillis() - aDate.toMillis();
			});
	});
};
