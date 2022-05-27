const Doc = require('../models/doc');

module.exports = {
    create,
    deleteStar
}

async function create(req, res){
 
    try {
		// Find a post, so we need the id of the post
        const doc = await Doc.findById(req.params.id);
		
        doc.star.push({username: req.user.username, userId: req.user._id}); //mutating a document
        await doc.save()// save it
        res.status(201).json({data: 'star added'})
    } catch(err){
       
        res.status(400).json({err})
    }
    
}

async function deleteStar(req, res){
    try {
        
        const doc = await Doc.findOne({'star._id': req.params.id, 'star.username': req.user.username});
        doc.docs.remove(req.params.id) // mutating a document
		console.log(doc, " <-= doc in delete!")
        // req.params.id is the like id 
        await doc.save() // after you mutate a document you must save
        res.json({data: 'star removed'})
    } catch(err){
        res.status(400).json({err})
    }
}