import { load } from "cheerio";
import { request } from "undici";

interface SearchParams {
	name: string;
	provisionalId?: string;
	fullId?: string;
}

export async function scrapeMMC(params: SearchParams) {
	const { name, provisionalId, fullId } = params;

	if (!provisionalId && !fullId) {
		throw new Error("Either provisionalId or fullId must be provided");
	}

	// Build query string based on provided parameters
	const queryParams = new URLSearchParams({ name });
	if (provisionalId) {
		queryParams.append("provisional", provisionalId);
	}
	if (fullId) {
		queryParams.append("full", fullId);
	}

	// Step 1: Fetch the main page to get the ajaxLoadPhp link
	const { statusCode: mainStatus, body: mainBody } = await request(
		`https://merits.mmc.gov.my/search/registeredDoctor?${queryParams.toString()}`,
	);

	if (mainStatus !== 200) {
		throw new Error(`Failed to fetch main page: ${mainStatus}`);
	}

	const mainHtml = await mainBody.text();
	const $main = load(mainHtml);

	// find the "ajaxLoadPhp" URL from the onclick attribute
	const onclickAttr = $main("a.btn.bg-light-blue.btn-circle-sm").attr(
		"onclick",
	);

	if (!onclickAttr) {
		throw new Error("No doctor found");
	}

	// Extract URL from onclick="ajaxLoadPhp('URL', ...)"
	const urlMatch = onclickAttr.match(/ajaxLoadPhp\('([^']+)'/);

	if (!urlMatch || !urlMatch[1]) {
		throw new Error("Could not extract URL from onclick attribute");
	}

	const doctorUrl = urlMatch[1];
	console.log("Found doctor URL:", doctorUrl);

	const { statusCode, body } = await request(doctorUrl);

	if (statusCode !== 200) {
		throw new Error(`Failed to fetch doctor page: ${statusCode}`);
	}

	const html = await body.text();
	const $ = load(html);

	const getValue = (value: string) => {
		const trimmed = value.trim();
		return trimmed === "" || trimmed === "-" ? null : trimmed;
	};

	const doctorInfo = {
		name: getValue($("#div-full-name > div").text()),
		provisionalRegNo: getValue(
			$("#div-provisional-registration-number > div").text(),
		),
		fullRegNo: getValue($("#div-full-registration-number > div").text()),
		APCNo: getValue(
			$(
				"body > fieldset > div.table-responsive > table > tbody > tr:nth-child(2) > td:nth-child(3)",
			).text(),
		), // need to change to child(1) later
		year: getValue(
			$(
				"body > fieldset > div.table-responsive > table > tbody > tr:nth-child(2) > td:nth-child(2)",
			).text(),
		), // need to change to child(1) later
		dateFullReg: (() => {
			const dateStr = $("#div-date-of-full-registration > div").text().trim();
			if (dateStr === "" || dateStr === "-") return null;
			const [day, month, year] = dateStr.split("-");
			return new Date(`${year}-${month}-${day}`);
		})(),
	};

	return doctorInfo;
}

// Example usage:
const result = await scrapeMMC({
	name: "MUHAMMAD ABRAR BIN ROSLAN",
	fullId: "102309",
});
console.log(result);
