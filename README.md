# Puppeteer PDF generator REST api

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

This is a pdf generator rest api which generates pdfs using the headless chrome instance powered by [Puppeteer](https://github.com/GoogleChrome/puppeteer).

Live api base url: https://gentle-reaches-67283.herokuapp.com

## Usage
### `POST /generate`

**Parameters**
The api doesn't care much how you send the parameters. Wether it's form-data form-urlencoded or as raw json. It's all welcome here.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `url` | `string` | **Required if no html**. The url of the webpage to convert to pdf |
| `html` | `string` | **Required if no url**. The html to convert to pdf |
| `scale` | `string` | **Optional**. Scale of the webpage rendering. Defaults to 1. Scale amount must be between 0.1 and 2 |
| `displayHeaderFooter` | `boolean` | Display header and footer. Defaults to `false ` |
| `headerTemplate` | `string` | HTML template for the print header. Should be valid HTML markup with following classes used to inject printing values into them: `date`, `title`, `url`, `pageNumber`, `totalPages` |
| `footerTemplate` | `string` | HTML template for the print footer. Should use the same format as the `headerTemplate` |
| `printBackground` | `boolean` | Print background graphics. Defaults to `false` |
| `landscape` | `boolean` | Paper orientation. Defaults to `false` |
| `pageRanges` | `string` | Paper ranges to print, e.g., '1-5, 8, 11-13'. Defaults to the empty string, which means print all pages |
| `format` | `string` | Paper format. If set, takes priority over width or height options. Defaults to 'Letter' |
| `width` | `integer` | Paper width, accepts values labeled with units |
| `height` | `integer` | Paper height, accepts values labeled with units |
| `margin.top` | `integer` | Top margin, accepts values labeled with units |
| `margin.right` | `integer` | Right margin, accepts values labeled with units |
| `margin.bottom` | `integer` | Bottom margin, accepts values labeled with units |
| `margin.left` | `integer` | Left margin, accepts values labeled with units |
| `preferCSSPageSize` | `boolean` | Give any CSS `@page` size declared in the page priority over what is declared in `width` and `height` or `format` options. Defaults to `false`, which will scale the content to fit the paper size |

**Response**
If the request was succesful the response will look like this:
```
{
    "success": true,
    "url": "https://gentle-reaches-67283.herokuapp.com/exports/1564590445-necij.pdf",
    "path": "/exports/1564590445-necij.pdf",
    "expires": 1564590505
}
```

If one of the parameters was invalid the request will look something like:
```
{
    "success": true,
    "errors": {
        "errors": [
            {
                "msg": "Must provide either url or html",
                "param": "url_html",
                "location": "body"
            }
        ]
    }
}
```

## Installation

Aside from the option to deploy this project on Heroku the instruction below is meant for either a local or standalone setup.

1. Clone the repo
```
git clone https://github.com/fritsvt/puppeteer-pdf-generator.git
```
2. Navigate in the project directory
```
cd puppeteer-pdf-generator
```
3. Install the npm dependencies
```
npm install
```
4. Copy the contents of [config-example.json](config-example.json) and place them in a new config.json
```
cp config-example.json config.json
```
5. Fill in the config.json with your configuration
6. Run the app
```
npm run start
```

## Technologies
[puppeteer](https://github.com/GoogleChrome/puppeteer)
[expressjs](https://github.com/expressjs/express)
[express-slow-down](https://github.com/nfriedly/express-slow-down)
[express-validator](https://github.com/express-validator/express-validator)
[multer](https://github.com/expressjs/multer)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)