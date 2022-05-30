const Doc = require('../models/doc');
const S3 = require('aws-sdk/clients/s3');
const { v4: uuidv4 } = require('uuid');

const s3 = new S3();

module.exports = {
    create,
    index,
    removeDoc
}

async function create(req, res){
    console.log(req.file, req.body, 'this is create method', req.user)
    try {
        const filePath = `${uuidv4()}/${req.file.originalname}`
        const params = {Bucket: process.env.BUCKET_NAME, Key: filePath, Body: req.file.buffer};
        s3.upload(params, async function(err, data){
			console.log(err, ' from aws')
            const doc = await Doc.create({title: req.body.title, description: req.body.description, user: req.user._id, docUrl: data.Location});
            console.log(doc)
			// make sure the post we're sending back has the user populated
			await doc.populate('user');
        })
            res.status(201).json({doc: doc})
    } catch(err){
        console.log(err)
        res.json({data: err})
    }
}

async function index(req, res){
    try {
        // this populates the user when you find the posts
        console.log("Index is triggered")
        const docs = await Doc.find({}).populate('user').exec()
        console.log("Index doc next")
        res.status(200).json({docs})
        console.log("Index res status next")
        console.log("End of Index")
    } catch(err){
        console.log('Index didnt work')
        res.status(400).json(err)
    }
}


async function removeDoc(req, res) {
    try {
      console.log(req.params.id, "<--- Doc to be deleted")
      const deleted = await Doc.deleteOne({"_id": req.params.id})
        res.status(200).json(deleted);
    }catch(err){
        res.status(400).json({err})
    }
}