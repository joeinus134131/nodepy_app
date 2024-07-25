const express = require('express')
const {spawn} = require('child_process');
const app = express()
const port = 3000
app.get('/', (req, res) => {
 
    var dataToSend;
    var largeDatasets = [];
    
    // const python = spawn('python', ['test_pynode.py']);
    // const python = spawn('python', ['param.py','node.js','python']);
    const python = spawn('python', ['json_read.py']);
    
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        // dataToSend = data.toString();
        largeDatasets.push(data)
    });
    
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        
        // res.send(dataToSend)
        res.send(largeDatasets.join(""))
    });
 
})
app.listen(port, () => console.log(`Node Python app listening on port 
${port}!`))