import Logo from './images/logo.png'
import './styles/index.css'

// Create SVG logo node
const logo = document.createElement('img')
logo.src = Logo

// Create heading node
const greeting = document.createElement('h1')

// Append SVG and heading nodes to the DOM
const app = document.querySelector('#root')
app.append(logo, greeting)


const dropArea = document.getElementById('drop-area');

dropArea.addEventListener('dragover', (event) => {
	event.stopPropagation();
	event.preventDefault();
	// Style the drag-and-drop as a "copy file" operation.
	event.dataTransfer.dropEffect = 'copy';
});

dropArea.addEventListener('drop', (event) => {
	event.stopPropagation();
	event.preventDefault();
	const fileList = event.dataTransfer.files;

	Papa.parse(fileList[0], {
		complete: function(results) {

			const data = results.data;
			const allNames = [];
			const allDates = [];

			for(let i = 1; i < data.length; i++) {
				allNames.push({ name: results.data[i][0], dates: [], hours: [] });
				allDates.push(data[i][1]);
			}

			const uniqueNames = _.uniqBy(allNames, 'name');
			const uniqueDates = _.uniq(allDates);

			for(let i = 1; i < data.length; i++) {
				for(let j = 0; j < uniqueNames.length; j++) {
					if(data[i][0] === uniqueNames[j].name) {
						uniqueNames[j].dates.push(data[i][1]);
						uniqueNames[j].hours.push(data[i][2]);
					}
				}
			}

			const jsonObject = JSON.stringify(uniqueNames);

			console.log(jsonObject)

		}
	});
});