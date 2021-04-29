
const { model, Schema, ObjectId } = require('mongoose');
const Landmarks = require('./landmarks-model').schema;

const elementSchema = new Schema(
	{
		_id: {
			type: ObjectId,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		capital: {
			type: String,
			required: true
		},
		leader: {
			type: String,
			required: true
		},
		flag: {
			type: String,
			required: true
		},
		landmarks: {
			type: [Landmarks],
			required: true
		},
		
		parent:{
			type: String,
			required: false
		}
	}
);

const element = model('Item', elementSchema);
module.exports = element;