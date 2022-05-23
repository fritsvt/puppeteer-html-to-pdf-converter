const { validationResult } = require('express-validator');
const puppeteer = require('puppeteer');
const config = require('../config');
const baseURL = config('BASE_URL');
const expiresIn = config('EXPIRES_IN');
const PDFMerger = require('pdf-merger-js');

module.exports = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: true,
      errors: errors.errors,
    });
  }

  const timestamp = Math.round(Date.now() / 1000);

  const files = [];

  const mergedFileId = `${timestamp}-merged-${revisedRandId()}`;

  req.body.base64Htmls.forEach((htmlElement) => {});

  for (const index in req.body.base64Htmls) {
    const htmlElement = req.body.base64Htmls[index];

    const randomID = `${timestamp}-${revisedRandId()}`;
    const pdfOptions = {
      path: `static/exports/${randomID}.pdf`,
      format: 'A4',
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    };

    const availableOptions = ['scale', 'displayHeaderFooter', 'headerTemplate', 'footerTemplate', 'printBackground', 'landscape', 'pageRanges', 'format', 'width', 'height', 'margin.top', 'margin.right', 'margin.bottom', 'margin.left', 'preferCSSPageSize'];
    const integerOptions = ['scale', 'width', 'height'];
    for (const option of availableOptions) {
      if (req.body[option] && !option.includes('margin')) {
        if (integerOptions.indexOf(option) > -1) {
          pdfOptions[option] = Number(req.body[option]);
        } else {
          pdfOptions[option] = req.body[option];
        }
      }

      if (req.body[option] && option.includes('margin')) {
        pdfOptions.margin[option.replace('margin.', '')] = req.body[option];
      }
    }

    if (!global.browser) {
      global.browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    }
    const page = await global.browser.newPage();

    const dec = Buffer(htmlElement, 'base64').toString('UTF8');
    await page.setContent(dec);

    await page.pdf(pdfOptions);

    await page.close();

    files.push(randomID);
  }

  const merger = new PDFMerger();

  await (async () => {
    files.forEach((id) => {
      merger.add('static/exports/' + id + '.pdf');
    });

    await merger.save('static/exports/' + mergedFileId + '.pdf'); //save under given name and reset the internal document
  })();

  return res.download(`static/exports/${mergedFileId}.pdf`);
};

function revisedRandId() {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(2, 10);
}
