const { exec } = require('child_process');
const util = require('util');
const chromeExecutable = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


// Promisificar la función exec para manejar errores de manera asincrónica
const execAsync = util.promisify(exec);

const openDevtools = async (page, client) => {
  try {
    // Obtener el ID de marco actual
    const frameId = page.mainFrame()._id;
    // Obtener la URL para devtools desde el navegador de scraping
    const { url: inspectUrl } = await client.send('Page.inspect', { frameId });

    // Abrir la URL de devtools en Chrome local de forma asincrónica
    await execAsync(`"${chromeExecutable}" "${inspectUrl}"`);

    // Esperar a que la interfaz de devtools cargue
    await delay(5000);
  } catch (error) {
    // Manejar errores de manera adecuada
    throw new Error('Unable to open devtools: ' + error);
  }
};

module.exports = {
  openDevtools,
};
