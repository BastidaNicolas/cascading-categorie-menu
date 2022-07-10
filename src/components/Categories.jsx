import { useState } from 'react'

const Categories = ({ categories }) => {

  //containes the selected categories, used to check what should be opened
  const [selected, setSelected] = useState([])

  console.log(selected)

  // checks if category has subcategories if it does then it creates a new submenu. It basicaly calls itself untill the category doesnt have children
  const hasChildren = (category, parent) => {
    if (category.children) {
      return (
        <div className='flex overflow-x-hidden'>
          <ul
            className={
              `${selected.some((item) => item.label === category.label) ? 'flex' : 'hidden'} border-r-2 flex-col overflow-y-auto overflow-x-hidden max-w-[13.9375Rem]`
            }>
            {category?.children.map((subcat, index) => (
              <>
                <li 
                  key={index + subcat.label} 
                  className={
                    `flex items-center py-1.5 px-3 justify-between text-sm hover:bg-slate-100 hover:text-blue-500 hover:fill-blue-500
                    ${selected.some((item) => item.label === subcat.label) ? 'text-blue-500 fill-blue-500 bg-slate-100' : 'fill-gray-700 text-gray-700'}`
                  }
                >
                  <span onClick={() => handleSelected(parent, subcat)} className='overflow-hidden whitespace-nowrap text-ellipsis w-full text-left hover:cursor-pointer'>{subcat.label}</span>
                  <svg className={`${subcat.children ? 'block':'hidden'} ml-1 w-5 h-5 `} width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <g>
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
                    </g>
                  </svg>
                </li>
              </>
            ))}
          </ul>
          {category?.children.map((subcat) => (
            hasChildren(subcat, subcat.label)
          ))}
        </div>
      )
    }
    return (
      <></>
    )
  }

  // checks if category with the same parent exists and if it does then the object is removed and the new object is added
  const handleSelected = (parent, subcat) => {
    if (selected.some((item) => item.parent === parent)) {
      let passedItem = [...selected].filter((item) => item.parent === parent)
      let arr = [...selected].filter(cat => cat.parent !== parent)
      if(selected.some((item) => item.parent === passedItem[0].label)){
        arr = [...arr].filter(cat => cat.parent === subcat.label || cat.label === subcat.label || cat.parent === 'main')
      }
      return setSelected([...arr, { parent: parent, label: subcat.label, value: subcat.value }])
    }
    return setSelected([...selected, { parent: parent, label: subcat.label, value: subcat.value }])
  }

  return (
    <div className='border-2 rounded flex flex-col w-full'>
      <div className='h-64 flex overflow-x-hidden'>
        <ul className='flex flex-col border-r-2 overflow-y-auto overflow-x-hidden max-w-[13.9375Rem] w-full'>
          {/* here goes main categories and all the subcat will be rendered using hasChildren() */}
          {categories?.map((category, index) => (
            <li 
              className={`flex items-center py-1.5 px-3 justify-between text-sm hover:bg-slate-100 hover:text-blue-500 hover:fill-blue-500
              ${selected.some((item) => item.label === category.label) ? 'text-blue-500 fill-blue-500 bg-slate-100' : 'fill-gray-700 text-gray-700'}`
            } 
              key={index}
            >
              <span className='w-full text-left overflow-hidden whitespace-nowrap text-ellipsis hover:cursor-pointer' onClick={() => setSelected([{ parent: 'main', label: category.label, value: category.value }])}>{category.label}</span>
              <svg className={`${category.children ? 'block':'hidden'} ml-1 w-5 h-5`} width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
                </g>
              </svg>
            </li>
          ))}
        </ul>
        {categories?.map((category) => (
          hasChildren(category, category.label)
        ))}
      </div>
    </div>
  )
}

export default Categories