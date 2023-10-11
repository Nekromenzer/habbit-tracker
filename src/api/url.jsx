const urlDoc = {
  user: {
    login: { url: '/api/user/login', type: 'post' },
    register: { url: '/api/user/signup', type: 'post' },
    // log habit
    logHabit: { url: '/api/habit/log-habit', type: 'post' },
    // edit user
    editUser: { url: '/api/user/profile', type: 'patch' },
    // delete profile
    setAccountDelete: { url: '/api/user/profile/delete-request', type: 'post' },
    // admin
    deleteAccount: { url: '/api/user/profile', type: 'delete' },
    getAccountDelete: { url: 'api/user/profile/delete-request', type: 'get' }
  },
  habit: {
    createPreHabits: { url: 'api/habit/predefined-habit/', type: 'post' },
    deletePreHabits: { url: 'api/habit/predefined-habit/', type: 'delete' },
    editPreHabits: { url: 'api/habit/predefined-habit/', type: 'patch' },
    createHabit: { url: 'api/habit/', type: 'post' },
    // getUserHabitById we can use same endpoint for both
    getUserHabit: { url: 'api/habit/', type: 'get' },
    editHabit: { url: 'api/habit/', type: 'delete' },
    logHabitProgress: { url: 'api/habit/log-progress', type: 'post' },
    getHabitProgress: { url: 'api/habit/progress', type: 'get' }
  }
}

export default urlDoc
