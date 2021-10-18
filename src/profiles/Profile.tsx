import React, {useState, useRef, useEffect   }  from 'react'
import './Index.css'

function Profile(props: any) {
  const [name] = useState(`${props.profile.name.title} ${props.profile.name.first} ${props.profile.name.last}`)
  const backgroundImage = {
    backgroundImage: `url(${props.profile.picture.large})`
  }
  const cardRef = useRef<HTMLDivElement>(null)

  let startX:any = null

  function unify (e:any) { return e.changedTouches ? e.changedTouches[0] : e }

  function lock (e:any) { startX = unify(e).clientX }

  function move (e: any) {
    if(startX) {
      let differenceX = unify(e).clientX - startX, sign = Math.sign(differenceX)
      if(sign < 0 || sign > 0) {
        props.parentCallback()
        startX = null
      }
    }
	}
  useEffect(() => {
    if (cardRef.current) {
    cardRef.current.addEventListener('mousedown', lock, false)
    cardRef.current.addEventListener('touchstart', lock, false)
    
    cardRef.current.addEventListener('mouseup', move, false)
    cardRef.current.addEventListener('touchend', move, false)
    }
  })
  return (
    <div>
      <div ref={cardRef} className="card" style={backgroundImage}>
      <div className="title">{name}</div>
      <div className="subtitle">{props.profile.dob.age}</div>
      </div>
    </div>
  )
}

export default Profile
