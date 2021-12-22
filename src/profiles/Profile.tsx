import React, {useState, useRef, useEffect   }  from 'react'
import './Index.css'

function Profile(props: any) {
  const [name] = useState(`${props.profile.name.title} ${props.profile.name.first} ${props.profile.name.last}`)
  const cardRef = useRef<HTMLDivElement>(null)

  let startX:any = null
  let startY:any = null
  let endX:any = null
  let endY:any = null
  let pos1:any = null
  let pos2:any = null

  const backgroundImage = {
    backgroundImage: `url(${props.profile.picture.large})`
  }
  /* const transitionOnSwipe = {
    left: endX
  } */
  function unify (e:any) { return e.changedTouches ? e.changedTouches[0] : e }

  function lock (e:any) {
    console.log('lock')
    e.preventDefault();
    startX = unify(e).clientX
    startY = unify(e).clientY
    e.onmouseup = close(e)
    if (cardRef.current) {
      cardRef.current.addEventListener('mousemove', drag, false)
      cardRef.current.addEventListener('touchmove', drag, false)
    }
  }

  function close (e: any) {
    if (cardRef.current) {
      cardRef.current.removeEventListener('mousemove', drag, false)
      cardRef.current.removeEventListener('touchmove', drag, false)
    }
  }

  function move (e: any) {
    e.preventDefault();
    console.log('move')
    if(startX || startY) {
      endX = unify(e).clientX
      endY = unify(e).clientY
      let differenceX = endX - startX, sign = Math.sign(differenceX)
      let differenceY = endY - startY, signY = Math.sign(differenceY)
      if(sign || signY < 0 || sign || signY > 0) {
        drag(e)
        props.parentCallback()
        startX = null
        startY = null
      }
    }
	}
  function drag (e: any) {
    console.log('drag')
    e.preventDefault();
    pos1 = startX - unify(e).clientX
    pos2 = startY - unify(e).clientY
    console.log(pos1)
    console.log(pos2)
    // startX = unify(e).clientX
    // startY = unify(e).clientY
    if (cardRef.current) {
      cardRef.current.style.top = cardRef.current.offsetTop - pos2 + "px";
      cardRef.current.style.left = cardRef.current.offsetLeft - pos1 + "px";
      // cardRef.current.style.transform = "translate3d(" + pos1 + "px, " + pos2 + "px, 0)";
    }
    console.log(e)
	}
  useEffect(() => {
    if (cardRef.current) {
    cardRef.current.addEventListener('mousedown', lock, false)
    cardRef.current.addEventListener('touchstart', lock, false)
    
    document.addEventListener('mouseup', move, false)
    document.addEventListener('touchend', move, false)
    }
  })
  return (
    <div>
      <div className="card">
      <div ref={cardRef} className="profile" style={backgroundImage}></div>
      <div className="title">{name}</div>
      <div className="subtitle">{props.profile.dob.age}</div>
      </div>
    </div>
  )
}

export default Profile
