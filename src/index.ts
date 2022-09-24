// import libraries 
import { createLogger } from '@lvksh/logger';
import * as chalk from 'chalk';
import * as express from 'express';
import * as dotenv from 'dotenv';

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
log.info('Welcome NoScriptCalc', 'Just a calculator', 'No fuss!')

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
  <html>
    <head>
      <link rel="stylesheet" href="/css"><title>NoScriptCalc</title><meta content="width=device-width,initial-scale=1" name=viewport>
    </head>
    <body>
      <h1>${parseInt(n, 10)}</h1>
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
      <a class='op' href='/addmenu?n=${n}'>+</a>
      <a class='op' href='/subtractmenu?n=${n}'>-</a>
      <a class='op' href='/multiplymenu?n=${n}'>*</a>
      <a class='op' href='/dividemenu?n=${n}'>/</a>
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
  let n = req.query.n
  res.set('Cache-control', 'public, max-age=21600')
  res.send(`
  <!DOCTYPE html>
  <head>
    <link rel="stylesheet" href="/css"><title>NoScriptCalc</title><meta content="width=device-width,initial-scale=1" name=viewport>
  </head>
  <html>
    <body>
      <h1>${parseInt(n, 10)}</h1>
      <a href='/doadd?n=0&e=${n}'>0</a>
      <a href='/doadd?n=1&e=${n}'>1</a>
      <a href='/doadd?n=2&e=${n}'>2</a>
      <a href='/doadd?n=3&e=${n}'>3</a>
      <a href='/doadd?n=4&e=${n}'>4</a>
      <a href='/doadd?n=5&e=${n}'>5</a>
      <a href='/doadd?n=6&e=${n}'>6</a>
      <a href='/doadd?n=7&e=${n}'>7</a>
      <a href='/doadd?n=8&e=${n}'>8</a>
      <a href='/doadd?n=9&e=${n}'>9</a>
    </body>
  </html>
  `)
});
app.get('/doadd', (req: any, res: any) => {
  let n = req.query.n
  let e = req.query.e
  res.redirect(`/?n=${Number(e) + Number(n)}`)
})
app.get('/subtractmenu', (req: any, res: any) => {
  let n = req.query.n
  res.set('Cache-control', 'public, max-age=21600')
  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <link rel="stylesheet" href="/css"><title>NoScriptCalc</title><meta content="width=device-width,initial-scale=1" name=viewport>
  </head>
    <body>
      <h1>${parseInt(n, 10)}</h1>
      <a href='/dosubtract?n=0&e=${n}'>0</a>
      <a href='/dosubtract?n=1&e=${n}'>1</a>
      <a href='/dosubtract?n=2&e=${n}'>2</a>
      <a href='/dosubtract?n=3&e=${n}'>3</a>
      <a href='/dosubtract?n=4&e=${n}'>4</a>
      <a href='/dosubtract?n=5&e=${n}'>5</a>
      <a href='/dosubtract?n=6&e=${n}'>6</a>
      <a href='/dosubtract?n=7&e=${n}'>7</a>
      <a href='/dosubtract?n=8&e=${n}'>8</a>
      <a href='/dosubtract?n=9&e=${n}'>9</a>
    </body>
  </html>
  `)
});
app.get('/dosubtract', (req: any, res: any) => {
  let n = req.query.n
  let e = req.query.e
  res.redirect(`/?n=${Number(e) - Number(n)}`)
})
app.get('/multiplymenu', (req: any, res: any) => {
  let n = req.query.n
  res.set('Cache-control', 'public, max-age=21600')
  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <link rel="stylesheet" href="/css"><title>NoScriptCalc</title><meta content="width=device-width,initial-scale=1" name=viewport>
  </head>
    <body>
      <h1>${parseInt(n, 10)}</h1>
      <a href='/domultiply?n=0&e=${n}'>0</a>
      <a href='/domultiply?n=1&e=${n}'>1</a>
      <a href='/domultiply?n=2&e=${n}'>2</a>
      <a href='/domultiply?n=3&e=${n}'>3</a>
      <a href='/domultiply?n=4&e=${n}'>4</a>
      <a href='/domultiply?n=5&e=${n}'>5</a>
      <a href='/domultiply?n=6&e=${n}'>6</a>
      <a href='/domultiply?n=7&e=${n}'>7</a>
      <a href='/domultiply?n=8&e=${n}'>8</a>
      <a href='/domultiply?n=9&e=${n}'>9</a>
    </body>
  </html>
  `)
});
app.get('/domultiply', (req: any, res: any) => {
  let n = req.query.n
  let e = req.query.e
  res.redirect(`/?n=${Number(e) * Number(n)}`)
})
app.get('/dividemenu', (req: any, res: any) => {
  let n = req.query.n
  res.set('Cache-control', 'public, max-age=21600')
  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <link rel="stylesheet" href="/css"><title>NoScriptCalc</title><meta content="width=device-width,initial-scale=1" name=viewport>
  </head>
    <body>
      <h1>${parseInt(n, 10)}</h1>
      <a href='/dodivide?n=0&e=${n}'>0</a>
      <a href='/dodivide?n=1&e=${n}'>1</a>
      <a href='/dodivide?n=2&e=${n}'>2</a>
      <a href='/dodivide?n=3&e=${n}'>3</a>
      <a href='/dodivide?n=4&e=${n}'>4</a>
      <a href='/dodivide?n=5&e=${n}'>5</a>
      <a href='/dodivide?n=6&e=${n}'>6</a>
      <a href='/dodivide?n=7&e=${n}'>7</a>
      <a href='/dodivide?n=8&e=${n}'>8</a>
      <a href='/dodivide?n=9&e=${n}'>9</a>
    </body>
  </html>
  `)
});
app.get('/dodivide', (req: any, res: any) => {
  let n = req.query.n
  let e = req.query.e
  res.redirect(`/?n=${Number(e) / Number(n)}`)
})
app.get('/css', (req: any, res: any) => {
  res.set('Cache-control', 'public, max-age=31536000')
  res.sendFile(process.cwd() + "/style.css")
})

// listen
app.listen(port, () => {
  log.ok(`Server is running at http://0.0.0.0:${port}`);
});
