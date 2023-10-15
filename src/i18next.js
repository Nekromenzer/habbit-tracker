import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      'sign in': 'Sign In',
      'sign up': 'Sign Up',
      logout: 'Logout',
      welcome: 'welcome',
      habits: 'Habits',
      tracking: 'Tracking',
      profile: 'Profile',
      faq: 'FAQ',
      'pre habits': 'Pre Habits',
      users: 'Users',
      'user contacts': 'User Contacts',
      'account delete': 'Account Delete Req',
      name: 'Name',
      description: 'Description',
      'target value': 'Target Value',
      edit: 'Edit',
      delete: 'Delete',
      add: 'Add'
    }
  },
  sin: {
    translation: {
      'sign in': 'පුරනය',
      'sign up': 'ලියාපදිංචි වන්න',
      logout: 'පිටවීම',
      welcome: 'ආයුබෝවන්',
      habits: 'පුරුදු',
      tracking: 'ලුහුබැඳීම',
      profile: 'පැතිකඩ',
      faq: 'නිති අසන පැණ',
      'pre habits': 'පෙර පුරුදු',
      users: 'පරිශීලකයන්',
      'user contacts': 'පරිශීලක සම්බන්ධතා',
      'account delete': 'ගිණුම් මකන්න ඉල්ලීම්',
      name: 'නම',
      description: 'විස්තර',
      'target value': 'ඉලක්ක අගය',
      edit: 'සංස්කරණය',
      delete: 'මකා දමන්න',
      add: 'එකතු කරන්න'
    }
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false
  }
})

export default i18n
