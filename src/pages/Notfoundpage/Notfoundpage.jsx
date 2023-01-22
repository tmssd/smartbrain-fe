import { Link } from 'react-router-dom'

const Notfoundpage = () => {
  return (
    <div className="f1 fw6 ph0 mh0">
      This page doesn't exist. Go <Link to="/" style={{ color: 'black' }}>home</Link>.
    </div>
  )
}

export { Notfoundpage };
