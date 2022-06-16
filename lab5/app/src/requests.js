
const deleteSongFromPlaylist = (songId, playlistId, token, setError, setResultMessage) => {
    const requestLink =`http://127.0.0.1:5000//playlist/song/${songId}`;
    fetch(requestLink, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: playlistId,
        }),
    })
      .then(res => {
            if (res.status !== 200) {
                setError(true);
            }
            return res.json();
    })
      .then(
        (result) => {
            if ('message' in result || 'msg' in result){
                setResultMessage({'message': 'Sorry, you can not change this playlist'});
            }
        },
        (error) => {
            setError(true);
            setResultMessage({'message': 'Sorry, you can not change this playlist'});
        }
        )
}

export default deleteSongFromPlaylist;