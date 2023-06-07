import { useState } from 'react'

function App() {
  const [songLink, setSongLink] = useState('')
  const [song, setSong] = useState({
    title: 'Sample Song',
    artist: 'Sample Artist',
    album: 'Sample Album',
    cover: 'https://cdn.dribbble.com/users/12084/screenshots/1867046/vinyl_mockup_soundsortium_1x.jpg',
    link: 'https://open.spotify.com/track/2TpxZ7JUBn3uw46aR7qd6V?si=2e8c7b0e0b5c4b9b'})

  const changeSong = (e) => {
    setSongLink(e.target.value)
  }

  const searchHandler = async () => {
    const url = songLink.split('/')[4]
    console.log(url)
    const response = await fetch(`https://spotify-downloader1.p.rapidapi.com/download/${url}`, {
      "method": "GET",
      headers: {
        'X-RapidAPI-Key': '12f8f839b8msh1f4c59a623beb1ap1abc1bjsn03fc37079636',
        'X-RapidAPI-Host': 'spotify-downloader1.p.rapidapi.com'
      }
    })
    const data = await response.json()

    setSong({
      title: data.metadata.title,
      artist: data.metadata.artists,
      album: data.metadata.album,
      cover: data.metadata.cover,
      link: data.link
    })
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
          <img src={song.cover} alt={song.title} className="w-40 h-40 rounded-md"/>
          <h2 className="text-2xl font-bold pt-2">{song.title}</h2>
          <h3 className="text-xl font-bold pt-2">{song.album}</h3>
          <h4 className="text-xl font-bold pt-2">{song.artist}</h4> 
          <a href={song.link} target="_blank" rel="noreferrer" className="btn btn-primary rounded-lg max-w-md mt-6 mx-auto w-full">Download</a>
        </div>
      </div>

      <footer className='p-10'>
        <p className="text-center text-gray-500 text-sm mt-10">Made with <i className="fas fa-heart text-red-500"></i> by <a href="" className="text-blue-500">Diego Garcia</a></p>
      </footer>
    </main>
  )


}

export default App
