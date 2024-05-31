import './versus.css'

export default function Versus({names}) {
  return <div className='Versus'>
    <div className="name1">{names[0]}</div>
    <div className="name2">{names[1]}</div>
  </div>
}