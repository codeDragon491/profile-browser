import React, {useState}  from 'react';
import './Index.css';

function Profile(props: any) {
  const [name] = useState(`${props.profile.name.title} ${props.profile.name.first} ${props.profile.name.last}`);
  const backgroundImage = {
    backgroundImage: `url(${props.profile.picture.large})`
  };
  return (
    <div>
      <h1 className="heading-1">{name}</h1>
      <div className="card" style={backgroundImage}>
      </div>
    </div>
  );
}

export default Profile;
