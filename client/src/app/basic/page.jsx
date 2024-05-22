import './basic.css'
import Table from '@/components/table/Table'
import ejemploData from '../../dataModels/basic/data2.json'

export default function Basic() {
  return (
    <div className="Basic">
      <Table title={'Participación en escenas'} data={ejemploData}/>
    </div>
  )
}