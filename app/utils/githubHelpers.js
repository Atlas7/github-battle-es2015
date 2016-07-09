// fetch some data from GitHub
import axios from 'axios'
import { id, secret } from '../secrets/githubAPIConfig'

const param = `?client_id=${id}&client_secret=${secret}`

// Promises here

// fetch Github user info
function getUserInfo(username) {
  return axios.get(`https://api.github.com/users/${username + param}`)
}

// fetch Github usernames repos
function getRepos(username) {
  return axios.get(`https://api.github.com/users/${username}/repos${param}&per_page=100`)
}

// calculate all the stars that the user has
function getTotalStars(repos) {
  return repos.data.reduce(function (prev, current) {
    return prev + current.stargazers_count
  }, 0)
}

// getRepos
// getTotalStars
// return object with that data
async function getPlayersData({login, followers}) {
  try {
    const repos = await getRepos(login)
    const totalStars = await getTotalStars(repos)
    return {
      followers,
      totalStars
    }
  } catch (error) {
    console.warn('Error in getPlayersData: ', error)
  }
}

// return an array, after doing some fancy algorithms to determine a winner
function calculateScores(players) {
  return [
    players[0].followers * 3 + players[0].totalStars,
    players[1].followers * 3 + players[1].totalStars
  ]
}

// core module here
export async function getPlayersInfo (players) {
  try {
    const info = await Promise.all(players.map((username) => getUserInfo(username)))
    return info.map((user) => user.data)
  } catch (error) {
    console.warn('Error in getPlayersInfo: ', err)
  }
}

export async function battle (players) {
  try {
    const playerOneData = getPlayersData(players[0]);
    const playerTwoData = getPlayersData(players[1]);
    const playersData = await Promise.all([playerOneData, playerTwoData])
    return await calculateScores(playersData)
  } catch (error) {
    console.warn('Error in getPlayersInfo: ', err)
  }
}
