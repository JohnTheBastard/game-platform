const mongoose = require( 'mongoose' );
const dbURI = process.env.LOCAL_MONGO_URI || process.env.OPENSHIFT_MONGODB_DB_URL;

mongoose.Promise = Promise;
mongoose.connect(dbURI); 

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + mongoose.connection.name 
				+ ' on host ' + mongoose.connection.host 
				+ ' on port ' + mongoose.connection.port);
}); 

// If the connection throws an error
mongoose.connection.on('error',function (error) {  
  console.log('Mongoose default connection error: ' + error);
  throw error;
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 