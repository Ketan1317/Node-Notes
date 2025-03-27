const fs=require('fs');
// const os=require('os');
// console.log(os.cpus().length);

// Write the file =>

// SYNCHRONOUS
// fs.writeFileSync("./filehandling.txt","kidda fer brampton valeyo")
// ASYNCHRONOUS
// fs.writeFile("./filehandling.txt","heloo kivyaa",(err) => {});

// Read the file =>

// const data=fs.readFileSync("./filehandling.txt","utf-8")
// console.log(data)

// Appending the file =>

// fs.appendFileSync("./filehandling.txt","NAA NA BROO");
fs.readFile("./filehandling.txt","utf-8",(err,data) => {
    if(err){
        console.log("Error reading file",err)
        return;
    }
    else{
        console.log(data);
    }
})


