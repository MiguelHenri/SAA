import Donations from "../models/Donations.js";
import mongoose from "mongoose";
import generatePdf from "../services/donationReportGen.js";
import {unlink} from "fs"
import path from "node:path"
export async function registerDonation(req, res) {
    try{
        const newDonation = new Donations(req.body);
        const savedDonation = await newDonation.save();
        return res.status(201).send({id: savedDonation._id});
    } catch(e){
        if (e instanceof mongoose.Error.ValidationError){
            const errors = Object.values(e.errors).map(e => ({[e.path]: e.message}));
            return res.status(400).send({validationErrors: Object.assign({}, ...errors)});
        }
        console.error('Unhandled error registering donation.', e);
        return res.status(500).send({message: 'Error ao registrar doação.'})
    }
}

export async function getDonations(req, res) {
    try {
        const donations = await Donations.find(null, null, {sort: {date: -1}});
        return res.status(200).send(donations);
    } catch (e){
        return res.status(400).send({ error: e.message });
    }
}


export async function getDonation(req, res) {
    try {
        const donation = await Donations.findById(req.params.id);
        return (donation) 
            ? res.status(200).send(donation)
            : res.status(404).send({message: 'Doação não existe'});
    } catch (e){
        return res.status(400).send({ error: e.message });
    }
}
//receives in json start date and end date
export async function getReport(req, res) {
    try {
        let {startDate, endDate} = req.body;
        const validDonations = await Donations.find({
            date : {
                $gte : startDate,
                $lte : endDate
            }
        }).sort({date: 1});
        //must convert to date so generatePdf can be used
        startDate = new Date(startDate);
        endDate = new Date(endDate);
        res.contentType("application/pdf");
        const doc = generatePdf(startDate, endDate, validDonations, "temp/report.pdf");
        doc.pipe(res);
        doc.end();
        return res.status(200);
    } catch (e){
        return res.status(400).send({ error: e.message });
    }


}

export async function deleteDonation(req, res) {
    try {
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)) {
            console.log("id não é válido");
            return res.status(400).send({message: 'ID do post é inválido.'});
        }

        const result = await Donations.findByIdAndDelete(id);

        if (result == null) {
            return res.status(404).send({message: 'A doação não foi encontrada.'});
        }
        return res.status(200).send({message: 'A doação foi deletada'});

    } catch (e) {
        if (e instanceof moongose.Error.ValidationError) {
            const errors = Object.values(e.errors).map(e => ({[e.path]: e.message}));
            return res.status(400).send({validationErrors: Object.assign({}, ...errors)});
        }
        console.error('Unhandled error in donation deletion.', e);
        return res.status(500).send({message: 'Erro ao deletar a doação.'});
    }

}