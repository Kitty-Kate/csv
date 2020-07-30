// Test import of a JavaScript function, an SVG, and Sass
// import { HelloWorld } from './js/HelloWorld'
import WebpackLogo from './images/logo.png'
import './styles/index.css'

// Create SVG logo node
const logo = document.createElement('img')
logo.src = WebpackLogo

// Create heading node
const greeting = document.createElement('h1')
// greeting.textContent = HelloWorld()

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
});