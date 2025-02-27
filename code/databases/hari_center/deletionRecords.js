const mongoose = require('mongoose');
const { Schema } = mongoose;
// const ObjectId = mongoose.Schema.ObjectId;

const ObjectId = Schema.ObjectId;


const DeletionRecordSchema = new Schema({
    entityId: { type: ObjectId, required: true }, // Reference to either Doctors or Patients
    entityType: { type: String, enum: ['Doctor', 'Patient','Patent-Mitra','Dialysises','Blood-Bank','Appointment','Hospital','Clinic','Pathology','Physiotherapy'], required: true }, // Type of entity being deleted
    deletedBy: { type: ObjectId, ref: 'staff', required: true }, // Reference to Staff
    deletedAt: { type: Date, default: Date.now }
},
{
    strict: false,  // Allows flexibility in case of extra fields
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: 'DeletionRecords'  // Collection name in the MongoDB database
});

module.exports = mongoose.model('DeletionRecords', DeletionRecordSchema);