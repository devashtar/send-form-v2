const route = require('express').Router();
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const controlling = Object.create(null);

route.post('/upload', (req, res) => {
    const limitFileSize = 10500000;                     // Maximum allowed file size
    const timeLimit = 180000;                    // After what time interval to interrupt the connection (miliseconds)

    const fileName = req.headers['x-file-name'];
    const fileSize = req.headers['content-length'];

    if (!fileName || !fileSize) {
      res.writeHead(400, "No file name or undefined size of file!");  // If not exist name or size of upload file
      res.end();
    } else if (fileSize > limitFileSize) {
      res.writeHead(413, "File limit exceeded! Max size of file 10MB");  // Max limit 10MB for file!
      res.end();
    } else {
      let uploadedSizeFile = 0;
      controlling[fileName] = 1;
      const filePath = path.join(__dirname, 'uploads', fileName);
      const fileStream = fs.createWriteStream(filePath, { flags: 'w', encoding: 'utf8' });
      const writeStream = req.pipe(fileStream);
      
      setTimeout(timeLimitEnd, timeLimit, filePath)

      req.on('data', (chunk) => {
          uploadedSizeFile += chunk.length;
          if (uploadedSizeFile > limitFileSize) {     // 10 MB
              resFatalMaxLimit();
          } else if (uploadedSizeFile == fileSize) {
              res.writeHead(200, "File uploaded").end();
              delete controlling[fileName];
          }
      })
      
      function resFatalMaxLimit() {
        if (controlling[fileName]) {
            res.writeHead(413, "File limit exceeded! Max size of file 10MB");  // Max limit 10MB for file!
            res.end();
            writeStream.destroy();
            fs.unlink(filePath, (err) => {
              if (err) console.log(err);
            })
            delete controlling[fileName];
            req.destroy();
        } 
      }

      function timeLimitEnd(path) {
        if (fs.existsSync(path)) {
          res.writeHead(408, "Try uploading the file again!");  // Max limit 10MB for file!
          res.end();
          writeStream.destroy();
          fs.unlink(path, (err) => { if (err) throw err })
          req.destroy()
        }
      }

    } // else 

})  // /post '/upload'

route.post('/uploadjson', jsonParser, (req, res) => {
    if (!req.body.name || !req.body.mail || !req.body.text) res.writeHead(400, "No data received!").end();
    const userName = req.body.name;
    const userMail = req.body.mail;
    const userText = req.body.text;
    if (req.body.nameFile) {
      const fileName = req.body.nameFile;
      const filePath = path.join(__dirname, 'uploads', fileName);

      main(userName, userMail, userText, fileName, filePath).then((response, error) => {
        if (error) {
          throw error;
        } else {
          res.writeHead(200, "Message sent succesfully!").end();
          fs.unlink(filePath, (err) => {
            if (err) console.log(err);
          })
        }
      }).catch(er => {res.writeHead(503, "Service is unavailable!").end(); fs.unlink(filePath, (err) => { if (err) throw err })});
      delete controlling[fileName];
      } else {
        main2(userName, userMail, userText).then((response, error) => {
          if (error) {
            throw error;
          } else {
            res.writeHead(200, "Message sent succesfully!").end();
          }
        }).catch((err) => res.writeHead(503, "Service is unavailable!").end());
      }
})  //   /uploadjson


// // ******************************** mail send ************************************
async function main(userName, userMail, userText, fileName, filePath) {
  
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.mail.ru", // The type of connection and data transfer between your mail and the server
    port: 465, // For smtp connect this port
    secure: true, // true for 465 port
    auth: {
      user: "mylogin@mail.ru", // Your email login
      pass: 'mypassword', // Your email Pass
    },
  });

  // options for "mail.ru"
  const options = {
    from: "mylogin@mail.ru",  // The field must match the field auth: {user: my login post}
    to: "login_any_person@mail.ru",  // List to whom to send this letter
    subject: `Письмо с сайта от ${userName}, почта отправителя: ${userMail}`, // Message subject
    html: `<b>${userText}</b>`,
    attachments: [{
      filename: fileName,
      path: filePath
    }]             // Your text in html format
  }
  
  return transporter.sendMail(options);

}
// // ******************************** mail send ************************************
//                     >>>>>>>>>>     mail2  <<<<<<<<<
async function main2(userName, userMail, userText) {
  
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.mail.ru", // The type of connection and data transfer between your mail and the server
    port: 465, // For smtp connect this port
    secure: true, // true for 465 port
    auth: {
      user: "mylogin@mail.ru", // Your email login
      pass: 'mypassword', // Your email Pass
    },
  });

  // options for "mail.ru"
  const options = {
    from: "mylogin@mail.ru",  // The field must match the field auth: {user: my login post}
    to: "login_any_person@mail.ru",  // List to whom to send this letter
    subject: `Письмо с сайта от ${userName}, почта отправителя: ${userMail}`, // Message subject
    html: `<b>${userText}</b>`
  }
  return transporter.sendMail(options);
}

module.exports = route;