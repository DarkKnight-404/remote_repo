let express = require("express");
let app = express();
const fs = require("fs");
const path = require("path");

app.use(express.static(__dirname + "/" + "public"));
app.use(express.json());




async function generateProjectImage(dirName) {
    let fileArr;
    let completeFileArr;

    fileArr = await fs.promises.readdir(__dirname, { withFileTypes: true })
    return {
        fileArr
    }

}
generateProjectImage().then(val => {
    let arr = val.fileArr.map((dirent) => {
        return {
            name: dirent.name,
            parentPath: dirent.parentPath.replace(/\//g, "\\").replace(/\\/g, "\\\\"),
            path: path.join(dirent.path, dirent.name).replace(/\//g, "\\").replace(/\\/g, "\\\\")
        }
    })
    console.log(arr)
})




app.post("/projDirs", (req, res) => {
    console.log(req.body);
    generateProjectImage().then(val => {
        let arr = val.fileArr.map((dirent) => {
            return {
                name: dirent.name,
                parentPath: dirent.parentPath.replace(/\//g,"\\").replace(/\\/g,"\\\\"),
                path: path.join(dirent.path, dirent.name).replace(/\//g,"\\").replace(/\\/g,"\\\\")
            }
        })
        console.log(arr);
        res.send(JSON.stringify({
            fileArr: arr
        }));
    })
})


app.post("/", (req, res) => {

    console.log(req.body);
    try {

        console.log("pass")
        const rs = fs.createReadStream(req.body.fileName)
        rs.pipe(res);
    } catch (error) {
        // console.log(error)
    }
})

app.listen(9000, () => { console.log("launched") });