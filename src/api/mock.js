import Mock, { mock } from 'mockjs'
import homeApi from './mock1/home'
import user from './mock1/user'
import peimission from './mock1/permission'

Mock.mock('/api/home/getData',homeApi.getStatisticalData)


// 用户列表
Mock.mock('/api/user/add','post',user.createUser)
Mock.mock('/api/user/edit','post',user.updateUser)
Mock.mock('/api/user/del','post',user.deleteUser)
Mock.mock(/api\/user\/getUser/,user.getUserList)

Mock.mock(/api\/permission\/getMenu/,'post',peimission.getMenu)


