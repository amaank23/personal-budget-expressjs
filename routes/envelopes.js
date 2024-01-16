const express = require("express");
const router = express.Router()
const envelopes = require("./../db/envelopes.json")
const { getNextId, findEnvelopeById, checkIfEnvelopeExist, findOneAndUpdate, findOneAndDelete } = require("./../helpers/db-helpers")


router.get("/", (req, res) => {
    res.status(200).send(envelopes)
})


router.get("/:id", (req, res) => {
    const retrieveingFromDB = findEnvelopeById(req.params.id)
    if(retrieveingFromDB){
        res.status(200).json(retrieveingFromDB)
    } else {
        res.status(404).json({ message: "Envelope Not Found" })
    }
})

router.post("/", (req, res) => {
    const { title, budget } = req.body;
        if(!title || !budget){
            res.status(400).json({ message: "Fill all the Fields" })
            return;
        }
        const newEnvelope = {
            id: getNextId(),
            title,
            budget
        }
        envelopes.push(newEnvelope)
        res.status(201).json(newEnvelope)
})

router.put("/:id", (req, res) => {
    const { id } = req.params;
    if(checkIfEnvelopeExist(id)){
        const updatedEnvelope = findOneAndUpdate(id, { ...req.body })
        res.status(200).json(updatedEnvelope);
    } else {
        res.status(404).json({ message: "Envelope Not Found" })
    }
})

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    if(checkIfEnvelopeExist(id)){
        if(findOneAndDelete(id)){
            res.status(204).json();
        } else {
            res.status(400).json({ message: "Something went wrong!" })
        }
    } else {
        res.status(404).json({ message: "Envelope Not Found" })
    }
})





module.exports = router