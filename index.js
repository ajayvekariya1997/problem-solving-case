const csv = require('csv');
const fs = require('fs');
const inputFile = process.argv[2];

function parseFile(inputFile) {
	try {
		let fileData = fs.readFileSync(inputFile);
		fileData = csv.parse(fileData, {columns: false, skip_empty_lines: true});
		let orderArr = [];
	
		return new Promise(resolve => {
			fileData.on('data', function(resp) {
				let tmp  = {
					id: resp[0],
					loc: resp[1],
					product: resp[2],
					qty: resp[3],
					brand: resp[4]
				}
				orderArr.push(tmp);
			})
	
			fileData.on('end', function() {
				resolve(orderArr);
			})
		});
	} catch (error) {
		// console.log("parseFile >> error while read file data >> ", error);
		return false;
	}
}

async function init(inputFile) {
	try{
		let fileData = await parseFile(inputFile);

		if (fileData === false) {
			console.log("No data to process!");
			return false;
		}
		let allProducts = {};
		let productCsvData = '';
		let brandCsvData = '';

		for (let i = 0; i < fileData.length; i++) {
			let {product, brand} = fileData[i];
			if (allProducts[product]) {
				allProducts[product].qty += parseInt(fileData[i].qty);
			} else {
				allProducts[product] = {
					qty: parseInt(fileData[i].qty), 
					avg: 0, 
					brands: {}, 
					topBrand: '', 
					topOrder: 0
				};
			}

			if (allProducts[product].brands[brand]) {
				allProducts[product].brands[brand]++;
			} else {
				allProducts[product].brands[brand] = 1;
			}

			if (allProducts[product].brands[brand] > allProducts[product].topOrder) {
				allProducts[product].topBrand = brand;
				allProducts[product].topOrder = allProducts[product].brands[brand];
			}
		}
		let products = Object.keys(allProducts);

		for (let i = 0; i < products.length; i++) {
			let avg = allProducts[products[i]].qty / fileData.length;
			productCsvData += `${products[i]},${avg}\n`;
			brandCsvData += `${products[i]},${allProducts[products[i]].topBrand}\n`;
		}

		fs.writeFileSync('0_'+inputFile,productCsvData);
		fs.writeFileSync('1_'+inputFile,brandCsvData);
		console.log("File created successfully!");
		return true;
	} catch (error) {
		console.log("init >> error while processing file data >> ", error);
		return false;
	}
}

if(inputFile && inputFile.split('.').pop() === "csv")
	init(inputFile);
else
	console.log("Input file name not provided as command line argument!");

module.exports = { init, parseFile };