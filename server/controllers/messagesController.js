const messageModel = require("../model/messageModel");

module.exports.addMessage = async (req,res,next) =>{

    try {
        const {from, to ,msg} = req.body;
        const data = await messageModel.create({
            message: {text: msg},
            users: [from, to],
            sender: from,
        });
        if(data){
            return res.json({msg: "Message added sucessfully." });
        }
        return res.json({msg: "Failed to add message to the database"});
    } catch (error) {
        next(error);
    }
};

module.exports.getAllMessages = async (req,res,next) =>{
    try {
        const {from, to} =req.body;
        const messages = await messageModel.find({users:{
            $all: [from,to]
        }}).sort({updatedAt: 1});

        const projectMessages = messages.map((msg)=> {
            return ({
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            });
        });
        res.json(projectMessages);
    } catch (error) {
        next(error);
    }
};