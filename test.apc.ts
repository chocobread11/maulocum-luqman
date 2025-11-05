import { PDFParse } from "pdf-parse";
import { scrapeMMC } from "./test.scrape";

async function scanAPC(url: string) {
	try {
		const parser = new PDFParse({ url });
		const result = await parser.getText();
		await parser.destroy();

		const lines = result.text.split("\n").filter((line) => line.trim() !== "");
		const formatted = {
			name: lines[15].trim(),
			IC: lines[16].trim(),
			apc: lines[7].slice(3, 10).trim(),
			year: lines[7].slice(11).trim(),
			address: lines
				.slice(18, 22)
				.map((line) => line.trim())
				.join(", "),
		};

		const scrape = await scrapeMMC({
			name: formatted.name,
			fullId: "102309",
		});

		const verify = {
			nameMatch: scrape.name === formatted.name,
			apcMatch: scrape.APCNo === formatted.apc.split(" / ")[0], // Extract APC number before the year
			details: {
				pdf: { name: formatted.name, apc: formatted.apc, year: formatted.year },
				mmc: { name: scrape.name, apc: scrape.APCNo, year: scrape.year },
			},
		};

		console.log("=== VERIFICATION RESULT ===");
		console.log(`Name Match: ${verify.nameMatch ? "✓" : "✗"}`);
		console.log(`APC Match: ${verify.apcMatch ? "✓" : "✗"}`);
		console.log("\nPDF Data:", verify.details.pdf);
		console.log("MMC Data:", verify.details.mmc);

		if (verify.nameMatch && verify.apcMatch) {
			console.log("\n✓ Verification PASSED - Data matches!");
		} else {
			console.log("\n✗ Verification FAILED - Data mismatch!");
		}

		return { formatted, scrape, verify };
	} catch (error) {
		console.log(error);
	}
}

scanAPC("/Users/khairulfitri/Downloads/apc.pdf");
