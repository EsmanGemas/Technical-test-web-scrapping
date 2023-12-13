import puppeteer from "puppeteer";
import { browser, page, setBrowser, setPage } from "./shared/store";
import {
  DOLAR_OFICIAL_PAGE_GOOGLE,
  DOLAR_PAGE_CRONISTA,
  HOME_PAGE_GOOGLE,
} from "./shared/static";
import testOneSel from "./selectors/test-one.sel";

async function setUp() {
  setBrowser(
    await puppeteer.launch({
      headless: false,
      userDataDir: "./userData",
    }),
  );
  setPage(await browser.newPage());
}

export async function main() {
  await setUp();
  await testOne();
  // await testTwo(); // Completa la primera para hacer la segunda
}

/**
 * Tarea: Realizar una Búsqueda en Google y Extraer Resultados
 *
 * En esta prueba, tu objetivo es realizar una búsqueda en Google y obtener información específica de los resultados.
 * Deberás seguir los siguientes pasos:
 *
 * 1. Navegar a la página principal de Google.
 * 2. Encontrar el campo de búsqueda y escribir la palabra clave "AIRTM".
 * 3. Enviar la búsqueda y esperar a que se carguen los resultados.
 * 4. Extraer los primeros cuatro resultados orgánicos, es decir, aquellos que no son anuncios patrocinados (sponsored).
 *
 * ! Nota: Asegúrate de excluir cualquier resultado patrocinado o anuncio que aparezca antes de los resultados orgánicos.
 */
async function testOne() {
  await page.goto(HOME_PAGE_GOOGLE);

  await page.waitForSelector(testOneSel.textarea);

  // Introducir la búsqueda
  await page.type(testOneSel.textarea, "AIRTM");

  // Enviar la búsqueda
  await page.keyboard.press("Enter");

  // Continua
}

/**
 * Tarea: Extracción Básica de Datos de un Sitio Web
 *
 * En esta prueba, tu objetivo es navegar a el sitio web "El Cronista" y realizar los siguientes pasos:
 *
 * 1. Extraer el precio del "DOLAR BLUE", "DOLAR MEP" y "DOLAR TURISTA" (precio de compra).
 * 2. Imprimir estos datos en la consola.
 * 3. Extraer el precio del "DOLAR OFICIAL" en DOLAR_OFICIAL_PAGE_GOOGLE (google).
 * 4. Calcular el `spread` entre el "DOLAR OFICIAL" y el "DOLAR BLUE".
 *
 */
async function testTwo() {
  await page.goto(DOLAR_PAGE_CRONISTA);

  // Continua
  // Es recomendado usar la funcion `findDivByText` en './utils'

  // await page.goto(DOLAR_OFICIAL_PAGE_GOOGLE); // Entrar una vez tengas los datos de cronista
}

