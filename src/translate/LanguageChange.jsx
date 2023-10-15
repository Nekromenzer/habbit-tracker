import { useEffect, useState } from 'react'
import { Switch } from 'antd'
import i18n from '../i18next'

// change language
const changeLanguage = lng => {
  i18n.changeLanguage(lng)
}

const LanguageChange = () => {
  const [nativeLan, setNativeLan] = useState(false)

  const handleLanguageChange = () => {
    setNativeLan(!nativeLan)
  }

  useEffect(() => {
    if (nativeLan) {
      changeLanguage('sin')
    } else {
      changeLanguage('en')
    }
  }, [nativeLan])

  return (
    <div>
      <Switch
        checkedChildren='English'
        unCheckedChildren='Sinhala'
        checked={nativeLan}
        onChange={handleLanguageChange}
        className='bg-green-500 hover:!bg-blue-400 active:bg-red-400'
      />
      <button onClick={() => changeLanguage('en')} className='bg-red-300'>
        en
      </button>
      <button onClick={() => changeLanguage('fr')} className='bg-blue-300'>
        fr
      </button>
    </div>
  )
}

export default LanguageChange
