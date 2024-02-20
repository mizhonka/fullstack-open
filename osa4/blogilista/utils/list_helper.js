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

module.exports = {
	dummy,
	sum,
	favoriteBlog
}


