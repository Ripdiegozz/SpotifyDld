import PropTypes from 'prop-types'

const SongSquare = ({ song }) => {

  const { link } = song.link
  const { title, artists, album, cover } = song.metadata

  return (
    <div className='mt-10'>
        <div className="flex flex-col justify-center items-center">
            <img src={cover} alt={title} className="w-40 h-40 rounded-md"/>
            <h2 className="text-2xl font-bold pt-2">{title}</h2>
            <h3 className="text-xl font-bold pt-2">{album}</h3>
            <h4 className="text-xl font-bold pt-2">{artists}</h4> 
            <a href={link} target="_blank" rel="noreferrer" className="btn btn-primary rounded-lg max-w-md mt-6 mx-auto w-full">Download</a>
        </div>
    </div>
  )
}

SongSquare.propTypes = {
    song: PropTypes.object.isRequired,
}

export default SongSquare
