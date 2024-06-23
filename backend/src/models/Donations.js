import mongoose from "mongoose";

const donationsSchema = new mongoose.Schema({
    admin_username: {
        type: String,
        required: [true, 'O administrador que preencheu é obrigatório.'],
    },
    source: {
        type: String,
        required: [true, 'A origem da doação é obrigatória.']
    }, 
    destination: {
        type : String
    },
    type: {
        type: String,
        required: [true, 'O tipo é obrigatório']
    },
    amount: {
        type: Number,
        required: [true, 'A quantidade é obrigatória'],
        min: 0
    },
    date: {
        type: Date,
        required : [true, "A data é obrigatória"]
    }
});

const Donations = new mongoose.model("Donations", donationsSchema);
export default Donations;