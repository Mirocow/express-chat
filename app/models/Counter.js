
module.exports = function(app, model) {

		var mongoose = app.libs.mongoose;

		var Counter = new mongoose.Schema({
				roomid  : String
			, value   : {type: Number, default: 0}
		},
		{safe: undefined});

		Counter.statics.getNextValue = function(roomid, callback) {

				var self = this;
				var counter = new CounterModel({roomid: roomid, value: 0});

				counter.save(function(errSave) {

						CounterModel.findByIdAndUpdate(roomid, {'$inc': {value: 1}}, function(errUpdate, theCounter) {

								var value = theCounter && theCounter.value;
								callback(errUpdate, value);

						});

				});

		};

		Counter.statics.reset = function(roomid, callback) {
				CounterModel.remove({roomid: roomid}, callback);
		};

		var CounterModel = model.mongoose.model('Counter', Counter);

		return CounterModel;
}

