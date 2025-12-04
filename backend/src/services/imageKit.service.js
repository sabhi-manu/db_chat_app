const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey : process.env.PUBLIC_KEY,
    privateKey : process.env.PRIVATE_KEY,
    urlEndpoint : process.env.URL_ENDPOINT
})

async function fileUpload ({file,fileName} ){
    let data = await imagekit.upload({
        file,
        fileName,
        folder: "chat_app"
    })
  
    return data
}

module.exports = fileUpload



