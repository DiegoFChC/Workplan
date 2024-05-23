import './avatar.css'
import Image from 'next/image'
import img from '../../../public/avatar.jpg'

export default function Avatar({name, price}) {
  return <div className="avatar">
    <Image className='icon' src={img} alt='avatar'/>
    <h4>{name}</h4>
    <p>$ {price}</p>
  </div>
}