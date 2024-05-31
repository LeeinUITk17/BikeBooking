const messageModel = require('../model/chat/chat.model');

const getmessagebyid = async(id) => {
    return await messageModel.findById(id).exec();
}

const addmessage = async(body) => {
    const message = new messageModel({
        room: body.room,
        message: body.message
    });
    try {
        await message.save();
        return message;
    } catch (err) {
        throw new Error(err.message);
    }
}

const deletemessage = async(id) => {
    try {
        const message = await messageModel.findById(id);
        if (!message) throw new Error('Message not found');
    
        await message.remove();
        return { message: 'Deleted Message' };
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = {
    getmessagebyid,
    addmessage,
    deletemessage,
}