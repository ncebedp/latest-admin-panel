const production = 'production';
const development = 'development';

const mode = development; // Change this to 'production' for production mode
let base_url = '';
if (mode === production) {
  base_url = "";
} else {
  base_url = 'http://localhost:8080';   // Change this to your local server URL
} 

export {base_url}