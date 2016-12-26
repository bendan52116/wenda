import mongodb form 'mongodb'
import config form '../config'

export const ObjectID=mongodb.ObjectID
const MongoClient=mongodb.MongoClient

function _connect(callback){
	MongoClient.connect(config.connStr,(err,db)=>{
		if(err){
			throw err
		}
		callback(null,db)
	})
}


export function find(collectionName,conditionDoc,callback){
	_connect((err,db)=>{
		if(err){
			return callback(err)
		}
		db.collection(collectionName)
		  .find(conditionDoc)
		  .toArray((err,docs)=>{
		  	db.close()
		  	if(err){
		  		return callback(err)
		  	}
		  	callback(null,docs)
		  })
	})
}

export function insertOne(collectionName,doc,callback){
	_connect((err,db)=>{
		if(err){
			return callback(err)
		}
		db.collection(collectionName)
		   .insertOne(doc,(err,result)=>{
		   	 db.close()
		   	 if(err){
		   	 	return callback(err)
		   	 }
		   	 callback(null,result)
		   })
	})
}

export function deleteOne(collectionName,conditionDoc,callback){
	_connect((err,db)=>{
		if(err){
			return callback(err)
		}
		db.collection(collectionName)
	   .deleteOne(conditionDoc,(err,result)=>{
	   	db.close()
	   	if(err){
	   		return callback(err)
	   	}
	   	callback(null,result)

	   })
	})

}
export function findOne(collectionName,conditionDoc,callback){
	_connect((err,db)=>{
		if(err){
			return callback(err)
		}
		db.collection(collectionName)
		  .deleteOne(conditionDoc,(err,doc)=>{
		  	if(err){
		  		return callback(err)
		  	}
		  	callback(null,doc)
		  })

	})
}

export function updataOne(collectionName,conditionDoc,doc,callback){
	_connect((err,db)=>{
		if(err){
			return callback(err)
		}
	})
	db.collection(collectionName)
	  
}