const errorHandler=(error, request, response, next) => {
	if(error.name==='ValidationError'){
		return response.status(400).json({ error: error.message })
	}
	else if(error.name==='MongoServerError' && error.message.includes('E11000 duplicate key error')){
		return response.status(400).json({ error: 'excepted username to be unique' })
	}
    else if(error.name==='JsonWebTokenError'){
        return response.status(400).json({error: 'token missing or invalid'})
    }

	next(error)
}

const tokenExtractor=(request, response, next)=>{
    const authorization=request.get('authorization')
    if(authorization && authorization.startsWith('Bearer ')){
        console.log('authorized')
        request.token=authorization.replace('Bearer ', '')
    }
    else request.token=null
    next()
}

module.exports={
    errorHandler,
    tokenExtractor
}
