

import Section_1 from '@/Components/Pages/Category/Section_1'

export const metadata = {
  title: 'Linear Hub | Online Shopping BD | Categories',
}

const page = ({params}) => {

  return (
    <div>
      <Section_1 name={params.name}/>
    </div>
  )
}

export default page