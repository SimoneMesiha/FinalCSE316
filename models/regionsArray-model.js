const { model, Schema, ObjectId } = require('mongoose');

const regionArraySchema = new Schema(
	{
		_id: {
			type: ObjectId,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		subregion:{
			type:[String],
			required: true
		},
		capital:{
			type: String,
			required:true
		},
		leader:{
			type:String,
			required:true
		},
		flag:{
			type:String,
			required:true
		},
		landmark:{
			type:[String],
			required:true
		},
		isitmap:{
			type: Boolean,
			required:true
		},
		owner:{
			type:String
		}

	},
	{ timestamps: true }
);

const RegionArray = model('RegionArray', regionArraySchema);
module.exports = RegionArray;