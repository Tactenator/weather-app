const MusicPlayer = () => {
    return ( 
        <div>
            <iframe className="music-player" title="Tactenator Playlist" style={{ borderRadius: "12px" }} src="https://open.spotify.com/embed/playlist/6PAef4CyeKKZMch6d9xfwP?utm_source=generator" 
            width="20%" height="380" frameBorder="0" allowfullscreen="" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
        </div>
     );
}
 
export default MusicPlayer;