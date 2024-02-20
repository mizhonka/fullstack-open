const dummy = blogs => 1

const sum = blogs => blogs.reduce((x, blog) => x+blog.likes, 0)

const favoriteBlog=(blogs) => {
	if(!blogs.length){return {}}
	const likes=blogs.map(blog => blog.likes)
	const maxLikes=likes.reduce((a,b) => Math.max(a,b), -Infinity)
	const favorites=blogs.filter(blog => blog.likes===maxLikes)
	return {
		title: favorites[0].title,
		author: favorites[0].author,
		likes: favorites[0].likes
	}
}

const mostBlogs=(blogs) => {
	const authors=blogs.map(blog => blog.author)
	let count=new Map()
	for(const i in authors){
		const a=authors[i]
		if(!count.get(a)){count.set(a, 1)}
		else {count.set(a, count.get(a)+1)}
	}

	let result=''
	let maxCount=0
	count.forEach((posts, author) => {
		if(posts>=maxCount){
			maxCount=posts
			result=author
		}
	})

	return {
		author: result,
		blogs: maxCount
	}
}

module.exports = {
	dummy,
	sum,
	favoriteBlog,
	mostBlogs
}


