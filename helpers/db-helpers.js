const envelopes = require("./../db/envelopes.json")


module.exports.getNextId = function(){
    if(envelopes.length === 0){
        return 1
    }
    const lastEnvelopeId = envelopes[envelopes.length - 1].id
    return lastEnvelopeId + 1
}

module.exports.findEnvelopeById = function(id){
    const envelope = envelopes.filter(item => item.id === Number(id))
    if(envelope.length > 0){
        return envelope[0];
    } else {
        return null;
    }
}

module.exports.checkIfEnvelopeExist = function(id){
    const envelope = envelopes.filter(item => item.id === Number(id))
    if(envelope.length > 0){
        return true;
    } else {
        return false;
    }
}

module.exports.findOneAndUpdate = function(id, body){
    const envelopeIndex = envelopes.findIndex(item => item.id === Number(id))
    if(envelopeIndex >= 0){
        if(body.title){
            envelopes[envelopeIndex].title = body.title;
        }
        if(body.budget){
            envelopes[envelopeIndex].budget = body.budget;
        }
        return envelopes[envelopeIndex];
    } else {
        return null;
    }
}

module.exports.findOneAndDelete = function(id, body){
    const envelopeIndex = envelopes.findIndex(item => item.id === Number(id))
    if(envelopeIndex >= 0){
        envelopes.splice(envelopeIndex, 1)
        return true;
    } else {
        return false;
    }
}