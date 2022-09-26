// import libraries 
import { createLogger } from '@lvksh/logger';
import * as chalk from 'chalk';
import * as express from 'express';
import * as dotenv from 'dotenv';
import { query } from 'express';
import { stringify } from 'querystring';

// init @lvksh/logger
const log = createLogger(
  {
    ok: {
      label: chalk.greenBright`[OK]`,
      newLine: '| ',
      newLineEnd: '\\-',
    },
    debug: chalk.magentaBright`[DEBUG]`,
    info: {
      label: chalk.cyan`[INFO]`,
      newLine: chalk.cyan`⮡`,
      newLineEnd: chalk.cyan`⮡`,
    },
    veryBigNetworkError: chalk.bgRed.white.bold`[NETWORK]`,
  },
  { padding: 'PREPEND' },
  console.log
);

// init dotenv
dotenv.config();

// greet user
log.info('Welcome NoScriptCalc!', 'It\'s just a calculator,', 'No fuss!')

// define expressJS
const app = express();
const port = process.env.PORT || 8080


// main menu
app.get('/', (req: any, res: any) => {
  let n = req.query.n || 0
  res.type('html');
  res.set('Cache-control', 'public, max-age=21600')
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <link rel="stylesheet" href="/css"><meta name="description" content="NoscriptCalc is a calculator webapp without client side JS"><title>NoScriptCalc</title><meta content="width=device-width,initial-scale=1" name=viewport>
    </head>
    <body>
      <h1>${n}</h1>
      <div>
      <a id='c' href='/?n=0'>clear</a>
      </div>
      <br>
      <br>
      <div>
      <a href='/setnum?n=0&e=${n}'>0</a>
      <a href='/setnum?n=1&e=${n}'>1</a>
      <a href='/setnum?n=2&e=${n}'>2</a>
      <a href='/setnum?n=3&e=${n}'>3</a>
      <a href='/setnum?n=4&e=${n}'>4</a>
      <a href='/setnum?n=5&e=${n}'>5</a>
      <a href='/setnum?n=6&e=${n}'>6</a>
      <a href='/setnum?n=7&e=${n}'>7</a>
      <a href='/setnum?n=8&e=${n}'>8</a>
      <a href='/setnum?n=9&e=${n}'>9</a>
      </div>
      <br>
      <div>
      <a class='op' href='/addmenu?e=${n}'>+</a>
      <a class='op' href='/subtractmenu?e=${n}'>-</a>
      <a class='op' href='/multiplymenu?e=${n}'>*</a>
      <a class='op' href='/dividemenu?e=${n}'>/</a>
      </div>
    </body>
  </html>
  `);
});

// for the setting of numbers
app.get('/setnum', (req: any, res: any) => {
  let n = req.query.n
  let e = req.query.e
  res.redirect(`/?n=${parseInt(e + n, 10)}`)
});

// menus and do api endpoints for ['+','-','*','/']
app.get('/addmenu', (req: any, res: any) => {
  let e = req.query.e
  let n = req.query.n || 0
  let d = ''
  if (n !== undefined) {
   d = `+${n}`
  }
  res.set('Cache-control', 'public, max-age=21600')
  res.send(`
  <!DOCTYPE html>
  <head>
    <link rel="stylesheet" href="/css"><meta name="description" content="NoscriptCalc is a calculator webapp without client side JS"><title>NoScriptCalc</title><meta content="width=device-width,initial-scale=1" name=viewport>
  </head>
  <html lang="en">
    <body>
      <h1>${e+d}</h1>
      <a href='/addmenu?n=${n+0}&e=${e}'>0</a>
      <a href='/addmenu?n=${n+1}&e=${e}'>1</a>
      <a href='/addmenu?n=${n+2}&e=${e}'>2</a>
      <a href='/addmenu?n=${n+3}&e=${e}'>3</a>
      <a href='/addmenu?n=${n+4}&e=${e}'>4</a>
      <a href='/addmenu?n=${n+5}&e=${e}'>5</a>
      <a href='/addmenu?n=${n+6}&e=${e}'>6</a>
      <a href='/addmenu?n=${n+7}&e=${e}'>7</a>
      <a href='/addmenu?n=${n+8}&e=${e}'>8</a>
      <a href='/addmenu?n=${n+9}&e=${e}'>9</a>
      <br>
      <br>
      <a class='op' href='/doadd?e=${e}&n=${n}'>=</a>
    </body>
  </html>
  `)
});
app.get('/doadd', (req: any, res: any) => {
  let n = req.query.n
  let e = req.query.e
  res.redirect(`/?n=${Number(e) + Number(n)}`)
})
// menus and do api endpoints for ['+','-','*','/']
app.get('/subtractmenu', (req: any, res: any) => {
  let e = req.query.e
  let n = req.query.n || 0
  let d = ''
  if (n !== undefined) {
   d = `+${n}`
  }
  res.set('Cache-control', 'public, max-age=21600')
  res.send(`
  <!DOCTYPE html>
  <head>
    <link rel="stylesheet" href="/css"><meta name="description" content="NoscriptCalc is a calculator webapp without client side JS"><title>NoScriptCalc</title><meta content="width=device-width,initial-scale=1" name=viewport>
  </head>
  <html lang="en">
    <body>
      <h1>${e+d}</h1>
      <a href='/subtractmenu?n=${n+0}&e=${e}'>0</a>
      <a href='/subtractmenu?n=${n+1}&e=${e}'>1</a>
      <a href='/subtractmenu?n=${n+2}&e=${e}'>2</a>
      <a href='/subtractmenu?n=${n+3}&e=${e}'>3</a>
      <a href='/subtractmenu?n=${n+4}&e=${e}'>4</a>
      <a href='/subtractmenu?n=${n+5}&e=${e}'>5</a>
      <a href='/subtractmenu?n=${n+6}&e=${e}'>6</a>
      <a href='/subtractmenu?n=${n+7}&e=${e}'>7</a>
      <a href='/subtractmenu?n=${n+8}&e=${e}'>8</a>
      <a href='/subtractmenu?n=${n+9}&e=${e}'>9</a>
      <br>
      <br>
      <a class='op' href='/dosubtract?e=${e}&n=${n}'>=</a>
    </body>
  </html>
  `)
});
app.get('/dosubtract', (req: any, res: any) => {
  let n = req.query.n
  let e = req.query.e
  res.redirect(`/?n=${Number(e) - Number(n)}`)
})
// menus and do api endpoints for ['+','-','*','/']
app.get('/multiplymenu', (req: any, res: any) => {
  let e = req.query.e
  let n = req.query.n || 0
  let d = ''
  if (n !== undefined) {
   d = `+${n}`
  }
  res.set('Cache-control', 'public, max-age=21600')
  res.send(`
  <!DOCTYPE html>
  <head>
    <link rel="stylesheet" href="/css"><meta name="description" content="NoscriptCalc is a calculator webapp without client side JS"><title>NoScriptCalc</title><meta content="width=device-width,initial-scale=1" name=viewport>
  </head>
  <html lang="en">
    <body>
      <h1>${e+d}</h1>
      <a href='/multiplymenu?n=${n+0}&e=${e}'>0</a>
      <a href='/multiplymenu?n=${n+1}&e=${e}'>1</a>
      <a href='/multiplymenu?n=${n+2}&e=${e}'>2</a>
      <a href='/multiplymenu?n=${n+3}&e=${e}'>3</a>
      <a href='/multiplymenu?n=${n+4}&e=${e}'>4</a>
      <a href='/multiplymenu?n=${n+5}&e=${e}'>5</a>
      <a href='/multiplymenu?n=${n+6}&e=${e}'>6</a>
      <a href='/multiplymenu?n=${n+7}&e=${e}'>7</a>
      <a href='/multiplymenu?n=${n+8}&e=${e}'>8</a>
      <a href='/multiplymenu?n=${n+9}&e=${e}'>9</a>
      <br>
      <br>
      <a class='op' href='/domultiply?e=${e}&n=${n}'>=</a>
    </body>
  </html>
  `)
});
app.get('/domultiply', (req: any, res: any) => {
  let n = req.query.n
  let e = req.query.e
  res.redirect(`/?n=${Number(e) - Number(n)}`)
})
// menus and do api endpoints for ['+','-','*','/']
app.get('/dividemenu', (req: any, res: any) => {
  let e = req.query.e
  let n = req.query.n || 0
  let d = ''
  if (n !== undefined) {
   d = `+${n}`
  }
  res.set('Cache-control', 'public, max-age=21600')
  res.send(`
  <!DOCTYPE html>
  <head>
    <link rel="stylesheet" href="/css"><meta name="description" content="NoscriptCalc is a calculator webapp without client side JS"><title>NoScriptCalc</title><meta content="width=device-width,initial-scale=1" name=viewport>
  </head>
  <html lang="en">
    <body>
      <h1>${e+d}</h1>
      <a href='/dividemenu?n=${n+0}&e=${e}'>0</a>
      <a href='/dividemenu?n=${n+1}&e=${e}'>1</a>
      <a href='/dividemenu?n=${n+2}&e=${e}'>2</a>
      <a href='/dividemenu?n=${n+3}&e=${e}'>3</a>
      <a href='/dividemenu?n=${n+4}&e=${e}'>4</a>
      <a href='/dividemenu?n=${n+5}&e=${e}'>5</a>
      <a href='/dividemenu?n=${n+6}&e=${e}'>6</a>
      <a href='/dividemenu?n=${n+7}&e=${e}'>7</a>
      <a href='/dividemenu?n=${n+8}&e=${e}'>8</a>
      <a href='/dividemenu?n=${n+9}&e=${e}'>9</a>
      <br>
      <br>
      <a class='op' href='/dodivide?e=${e}&n=${n}'>=</a>
    </body>
  </html>
  `)
});
app.get('/dodivide', (req: any, res: any) => {
  let n = req.query.n
  let e = req.query.e
  res.redirect(`/?n=${Number(e) - Number(n)}`)
})
app.get('/css', (req: any, res: any) => {
  res.set('Cache-control', 'public, max-age=31536000')
  res.sendFile(process.cwd() + "/style.css")
})

// listen
app.listen(port, () => {
  log.ok(`Server is running at http://0.0.0.0:${port}`);
});
