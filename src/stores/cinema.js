import { ref } from 'vue'
import { defineStore } from 'pinia'

const apiBaseUrl = import.meta.env.VITE_API_URL

export const useCinemaStore = defineStore('movies', () => {
  const movies = ref([])
  const movie = ref([])
  const moviesSessions = ref([])
  const movieSessionPlaces = ref([])
  const bookPlace = ref({})

  const getData = async (url = '') => {
    const response = await fetch(`${apiBaseUrl}${url}`)
    return await response.json()
  }

  const postData = async (url = '', data = {}, method = 'POST') => {
    const response = await fetch(`${apiBaseUrl}${url}`, {
      method,
      body: data.body
    })
    return await response.json()
  }

  const getAllMovies = async () => {
    try {
      const response = await getData(`/movies`)
      movies.value = response.data
    } catch (error) {
      console.error(`Error: ${error}`)
    }
  }

  const getMovie = async id => {
    try {
      const response = await getData(`/movies?movie_id=${id}`)
      movie.value = response.data[0]
    } catch (error) {
      console.error(`Error: ${error}`)
    }
  }

  const searchMovie = async data => {
    try {
      const response = await getData(`/movies?${data.name ? `name=${data.name}` : ''}${data.genre ? `&genres=${data.genre}` : ''}`)
      movies.value = response.data
    } catch (error) {
      console.error(`Error: ${error}`)
    }
  }

  const getMovieSessions = async id => {
    try {
      const response = await getData(`/movieShows?movie_id=${id}`)
      moviesSessions.value = response.data[id]
    } catch (error) {
      console.error(`Error: ${error}`)
    }
  }

  const getMovieSessionsPlaces = async data => {
    try {
      let { id, date, time } = data

      const response = await getData(`/showPlaces?movie_id=${id}&daytime=${time}&showdate=${date}`)
      movieSessionPlaces.value = response.data
    } catch (error) {
      console.error(`Error: ${error}`)
    }
  }

  const bookTicket = async data => {
    try {
      const response = await postData(`/bookPlace`, {
        body: JSON.stringify(data)
      })
      bookPlace.value = response.data
    } catch (error) {
      console.error(`Error: ${error}`)
    }

    // for set not free seat
    let index = movieSessionPlaces.value.findIndex(e => e[0].row === data.row)
    if (index !== -1) {
      let row = movieSessionPlaces.value[index]
      let seatIndex = row[1].findIndex(e => e.seat === data.seat)
      if (seatIndex !== -1) {
        movieSessionPlaces.value[index][1][seatIndex].is_free = false
      }
    }
  }

  const clearBookTicket = () => {
    bookPlace.value = {}
  }

  return {
    movies,
    movie,
    moviesSessions,
    movieSessionPlaces,
    bookPlace,

    getAllMovies,
    getMovie,
    searchMovie,
    getMovieSessions,
    getMovieSessionsPlaces,
    bookTicket,
    clearBookTicket
  }
})
