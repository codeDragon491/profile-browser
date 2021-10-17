import React, {useState, useEffect} from 'react';
import './Index.css';
import Profile from './Profile'

function Profiles() {
  const [error, setError] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [profiles, setProfiles] = useState<any[]>([]);

    useEffect(() => {
        fetch("https://randomuser.me/api/")
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setProfiles(result.results);
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
    }, [])
    if (error) {
        return <h1 className="heading-1">Error: {error.message}</h1>;
    } else if (!isLoaded) {
        return <h1 className="heading-1">Loading...</h1>;
    } else {
        return (
            <div id="board">
            {profiles.map(profile => ( 
                <Profile key={profile.id.value} profile={profile}/>
            ))}
          </div>
        );
    }
}

export default Profiles;
