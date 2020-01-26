const clientId = '902456f02fa341808a315fc14d75a5d9';
const redirectUri = 'http://localhost:3000';
const spotifyUrl= `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`


let accessToken;

const Spotify ={

    getAccessToken(){
        if(accessToken){
            return accessToken;
       }
        const hasAccessToken = window.location.href.match(/access_token=([^&]*)/);
        const hasExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
        if (hasAccessToken && hasExpiresIn) {
            accessToken = hasAccessToken[1];
            const expiresIn = Number(hasExpiresIn[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        }else{
            window.location = spotifyUrl;
        }
    },
    
    async search (term){
        if(accessToken===undefined){
            this.getAccessToken();
        }

        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term.replace(' ', '%20')}`,
            {
                headers:{
                    Authorization: `Bearer ${accessToken}`,
                }
            }).then(response=>response.json())
            .then(jsonResponse=>{
                if(!jsonResponse.tracks){
                    return [];
                }
                return jsonResponse.tracks.items.map(track=>{
                    return(
                        {
                            id: track.id,
                            name: track.name,
                            artist: track.artists[0].name,
                            album: track.album.name,
                            uri: track.uri,
                        }
                    )
                })
            })
    },

    async savePlaylist (playlistName, uriArray){
        if(!(playlistName && uriArray)){
            return;
        }

        if(accessToken=== undefined){
            await this.getAccessToken();
        }
        
        let userId;

        if(userId=== undefined){
        await fetch('https://api.spotify.com/v1/me',
        {
            headers:{
                Authorization: `Bearer ${accessToken}`,
            }
        })
        .then(response=> response.json())
        .then(me=> userId=me.id)
        }

        await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
        {
            headers:{
                Authorization: `Bearer ${accessToken}`,
            },
            method: 'POST',
            body: JSON.stringify({name: playlistName}),  
        }).then(response=> response.json())
        .then(jsonResponse=> {
            console.log('jsonResponse: ', jsonResponse);
            let playlistId= jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
            {
                headers:{
                    Authorization: `Bearer ${accessToken}`,
                },
                method: 'POST',
                body: JSON.stringify({uris: uriArray}),
            }).then(response=>response.json())
            .then(responseJson=> console.log(responseJson))
        })

        
    }

}


export default Spotify;


