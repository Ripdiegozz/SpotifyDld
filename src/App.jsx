import { useState } from 'react'

function App() {
  const [song, setSong] = useState('')
  const [showSong, setShowSong] = useState(false)

  const changeSong = (e) => {
    setSong(e.target.value)
  }

  const SampleSong = {
    title: 'Sample Song',
    artist: 'Sample Artist',
    album: 'Sample Album',
    cover: 'https://i.scdn.co/image/ab67616d0000b273e4b5b3b2b2b2b2b2b2b2b2b2',
    link: 'https://open.spotify.com/track/2TpxZ7JUBn3uw46aR7qd6V?si=2e8c7b0e0b5c4b9b'
  }

  const searchHandler = async () => {
    setShowSong(true)
    const url = song.split('/')[4]
    console.log(url)
    const response = await fetch(`https://spotify-downloader1.p.rapidapi.com/download/${url}`, {
      "method": "GET",
      headers: {
        'X-RapidAPI-Key': '0dea8ad591msh1733f68c7d8b50bp14555ajsn3f017697801b',
        'X-RapidAPI-Host': 'spotify-downloader1.p.rapidapi.com'
      }
    })
    const data = await response.json()
    setSong(data ?? SampleSong)
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
      
      <div className='mt-10'>
        <div className="flex flex-col justify-center items-center">
          <img src={song.metadata.cover ?? '#'} alt={song.metadata.title ?? '#'} className="w-40 h-40 rounded-md"/>
          <h2 className="text-2xl font-bold pt-2">{song.metadata.title ?? '#'}</h2>
          <h3 className="text-xl font-bold pt-2">{song.metadata.album ?? '#'}</h3>
          <h4 className="text-xl font-bold pt-2">{song.metadata.artists ?? '#'}</h4> 
          <a href={song.metadata.link ?? '#'} target="_blank" rel="noreferrer" className="btn btn-primary rounded-lg max-w-md mt-6 mx-auto w-full">Download</a>
        </div>
      </div>
      
    </main>
  )
}

export default App
