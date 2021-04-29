const { model, Schema, ObjectId } = require('mongoose');
const Elements = require('./element-model').schema;

const regionsArraySchema = new Schema(
	{
		_id: {
			type: ObjectId,
			required: true
		},

		id: {
			type: Number,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		elements:{
			type : [Elements],
			required: true
		} ,
		subregion: {
			$ref : '#' 							//this means recursive I believe
		}
	},
	{ timestamps: true }
);

const RegionsArray = model('RegionsArray', regionsArraySchema);
module.exports = RegionsArray;