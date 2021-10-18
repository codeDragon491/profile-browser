import React, {useState, useEffect, useCallback} from 'react'
import './Index.css'
import Profile from './Profile'

function Profiles() {
  const [error, setError] = useState<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [profiles, setProfiles] = useState<any[]>([])
  const [swiped, setSwiped] = useState(0)

    useEffect(() => {
      getProfiles()
    }, [swiped])

    const callback = useCallback(() => {
      setSwiped(swiped => swiped+1)
    }, [])

    const getProfiles = () => {
      fetch("https://randomuser.me/api/")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setProfiles(result.results)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
    }
    if (error) {
        return <h1 className="heading-1">Error: {error.message}</h1>
    } else if (!isLoaded) {
        return <h1 className="heading-1">Loading...</h1>
    } else {
        return (
            <div id="board">
            <h1 className="heading-1">Profiles</h1>
            {profiles.map(profile => ( 
                <Profile key={profile.id.value} profile={profile} parentCallback={callback}/>
            ))}
          </div>
        )
    }
}

export default Profiles
