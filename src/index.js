import Papa from 'papaparse';
import * as _ from 'lodash';
import Logo from './images/logo.png'
import './styles/index.css'


const logo = document.createElement('img')
logo.src = Logo

const greeting = document.createElement('h1')

const app = document.querySelector('#root')
app.append(logo, greeting)


const dropArea = document.getElementById('drop-area');
const infoZone = document.getElementById('info');
const downloadButton = document.getElementById('download');
let dataCsvFormat = '';

downloadButton.addEventListener('click', event => {
	event.preventDefault();
	downloadCsv();
})

dropArea.addEventListener('dragover', event => {
	event.stopPropagation();
	event.preventDefault();
	event.dataTransfer.dropEffect = 'copy';
	infoZone.innerHTML = 'drop file here :)'
});

dropArea.addEventListener('dragleave', event => {
	event.stopPropagation();
	event.preventDefault();
	event.dataTransfer.dropEffect = 'none';
	infoZone.innerHTML = 'please, come back to drop zone :)'
});

dropArea.addEventListener('drop', event => {
	event.stopPropagation();
	event.preventDefault();

	const fileList = event.dataTransfer.files;

  	Papa.parse(fileList[0], {
		complete: function(results) {

			const data = results.data;
			const allNames = [];
			const allDates = [];

			for(let i = 1; i < data.length; i++){
				allNames.push({ name: results.data[i][0], dates: [], hours: [] });
				allDates.push(data[i][1]);
			}

			const uniqueNames = _.uniqBy(allNames, 'name');
			const uniqueDates = _.uniq(allDates);

			for(let i = 1; i < data.length; i++){
				for(let j = 0; j < uniqueNames.length; j++){
					if(data[i][0] === uniqueNames[j].name) {
						uniqueNames[j].dates.push(data[i][1]);
						uniqueNames[j].hours.push(data[i][2]);
					}
				}
			}

			dataCsvFormat = ConvertToCSV(uniqueNames, uniqueDates);
		}
	});

	infoZone.innerHTML = 'file loaded, parsed and ready to download';

});

function ConvertToCSV(names, dates) {
	let title = 'Name / Date';
	let result = '';

	for(let i = 0; i < dates.length; i++) {
		title += ','
		title += dates[i];
	}

	result += title; 
	result += '\r\n';

	for(let i = 0; i < names.length; i++) {
		const line = '' + names[i].name;

		for (let j in names[i].dates) {
			if (line != '') line += ','

			line += names[i].hours[j];
		}

		result += line + '\r\n';
	}

	return result;
}

function downloadCsv() {
	const blob = new Blob([dataCsvFormat]);

	if (window.navigator.msSaveOrOpenBlob) {
		window.navigator.msSaveBlob(blob, "filename.csv");
	}
	else {
		const a = window.document.createElement("a");

		a.href = window.URL.createObjectURL(blob, {
			type: "text/csv; charset=utf-8;"
		});
		a.download = "filename.csv";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}
}