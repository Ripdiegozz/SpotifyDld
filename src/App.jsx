import { useState } from 'react'
import SkeletonLoader from './components/SkeletonLoader'

function App() {
  const [songLink, setSongLink] = useState('')
  const [squareState, setsquareState] = useState('mt-10 hidden')
  const [buttonStyle, setButtonStyle] = useState("btn btn-primary cursor-not-allowed rounded-lg max-w-md mt-6 mx-auto w-full")
  const [song, setSong] = useState({})

  const changeSong = (e) => {
    setSongLink(e.target.value)
  }

  const searchHandler = async () => {

    setSong({
      title: undefined,
      artist: undefined,
      album: undefined,
      cover: 'https://images.pexels.com/photos/2746823/pexels-photo-2746823.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      link: '#'
    })

    setButtonStyle("btn btn-primary cursor-not-allowed rounded-lg max-w-md mt-6 mx-auto w-full")

    const url = songLink.split('/')[4]

    const response = await fetch(`https://spotify-downloader1.p.rapidapi.com/download/${url}`, {
      "method": "GET",
      headers: {
        'X-RapidAPI-Key': '0dea8ad591msh1733f68c7d8b50bp14555ajsn3f017697801b',
        'X-RapidAPI-Host': 'spotify-downloader1.p.rapidapi.com'
      }
    })
    const data = await response.json()

    setTimeout(() => {
      setSong({
          title: data.metadata.title,
          artist: data.metadata.artists,
          album: data.metadata.album,
          cover: data.metadata.cover,
          link: data.link
        })

      setButtonStyle("btn btn-primary rounded-lg max-w-md mt-6 mx-auto w-full")
    }, 8000)

    setsquareState('mt-10')
  }

  return (
    <main className="container flex flex-col justify-center mx-auto h-full px-4">
      <h1 className='text-5xl font-bold text-center pb-6 pt-14 md:text-7xl'>Spotify Downloader<i className="pl-3 pt-3 fa-brands fa-spotify"></i></h1>

      <div className="flex justify-center"> 
        <form className="flex flex-col gap-4 w-full max-w-lg mt-10">
          <label htmlFor="song-field" className="text-2xl font-bold pt-2">Insert your song link:</label>
          <input type="text" id='song-field' name="song-field" required className="w-full h-11 rounded-lg p-3 mt-3" onChange={changeSong}/>
          <button type="button" className="btn btn-primary rounded-lg max-w-md mt-6 mx-auto w-full" onClick={() => searchHandler()}>Search Song</button>
        </form>
      </div>
      
      <div className={squareState}>
        <div className="flex flex-col justify-center items-center">
          <img src={song.cover} alt={song.title} className="w-40 h-40 rounded-md"/>
          <h2 className="text-2xl font-bold pt-2">{song.title || <SkeletonLoader />}</h2>
          <h3 className="text-xl font-bold pt-2">{song.album || <SkeletonLoader />}</h3>
          <h4 className="text-xl font-bold pt-2">{song.artist || <SkeletonLoader />}</h4> 
          <a href={song.link} target="_blank" rel="noreferrer" className={buttonStyle}>Download</a>
        </div>
      </div>

      <footer className='p-10'>
        <p className="text-center text-gray-500 text-sm mt-10">Made with <i className="fas fa-heart text-red-500"></i> by <a href="" className="text-blue-500">Diego Garcia y Santiago Diaz</a></p>
      </footer>
    </main>
  )


}

export default App
