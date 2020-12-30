import express from 'express';
import { ObjectId } from 'mongodb';
import auth from '../middleware/auth';
import { Message } from '../models/message.model';
import { MessageTemplate, IMesssageTemplate } from '../models/messageTemplate.model';
import errorHandler from './error';

const router = express.Router();

router.post("/newTemplate", auth, async (req, res) => {

    if (!req.body.messageTxt || req.body.messageTxt === '') {
        res.status(400).send("Please Enter Message Text!");
    } else if (req.body.image == null) {
        const newMessageTemplate = new MessageTemplate({
            language: req.body.language,
            text: req.body.messageTxt,
            type: req.body.type,
        })
        return newMessageTemplate.save().then( () => {
            res.status(200).json({
                success: true
            });
        }).catch((err) => {console.log(err.message) });
    } else {
        const newMessageTemplate = new MessageTemplate({
            language: req.body.language,
            text: req.body.messageTxt,
            type: req.body.type,
        })
        return newMessageTemplate.save().then( () => {
            res.status(200).json({
                success: true
            });
        }).catch((err)  => {console.log(err.message)});
    }
})

router.post("/deleteTemplate", async (req, res) => {
    const id = req.body.id;
    return MessageTemplate.findByIdAndDelete(new ObjectId(id)).then(() => {
        res.status(200);
    });
});

router.get("/templates", auth, async (req, res) => {
    return MessageTemplate.find().then( (messageTemplates) => {
        res.status(200).json(messageTemplates);
    }).catch((err)  => {console.log(err.message)});
})

export default router;