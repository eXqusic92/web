
const deletePlaylist = (playlistId, token, setError, setResultMessage, navigate) => {
    const requestLink =`http://127.0.0.1:5000/playlist/${playlistId}`;
    fetch(requestLink, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
      .then(res => {
            if (res.status !== 200) {
                setError(true);
            } else{
                navigate('/');
            }
            return res.json();
    })
      .then(
        (result) => {
            if ('message' in result || 'msg' in result){
                setResultMessage(result);
            }
        },
        (error) => {
            setError(true);
            setResultMessage(error);
        }
        )
}

export default deletePlaylist;
