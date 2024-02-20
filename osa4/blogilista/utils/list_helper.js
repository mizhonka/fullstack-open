const dummy = blogs => 1

const sum = blogs => blogs.reduce((x, blog) => x+blog.likes, 0)

module.exports = {
	dummy,
	sum
}

