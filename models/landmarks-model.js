
const { model, Schema, ObjectId } = require('mongoose');

const landmarkSchema = new Schema(
	{
		_id: {
			type: ObjectId,
			required: true
		},
		name: {
			type: String,
			required: true
		}
	}
);

const landmarks = model('Landmarks', landmarkSchema);
module.exports = landmarks;