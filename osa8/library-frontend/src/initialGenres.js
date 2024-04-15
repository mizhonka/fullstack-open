export let initialGenres = []

export const setInitialGenres = (data) => {
    initialGenres = ['']
    data.map((b) =>
        b.genres.map((gs) => (initialGenres = initialGenres.concat(gs))),
    )
    initialGenres = [...new Set(initialGenres)]
}

export const addNewGenre = (newGenre) => {
    initialGenres = initialGenres.concat(newGenre)
    initialGenres = [...new Set(initialGenres)]
}
