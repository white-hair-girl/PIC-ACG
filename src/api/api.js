import axios from "axios"

axios.defaults.baseURL = 'https://apic.netstart.cn/bcomic';

export const Banner = () => {
  return axios({
    method: 'get',
    url: `/Banner`,
  })
}

export const GetClassPageAllTabs = () => {
  return axios({
    method: 'get',
    url: `/GetClassPageAllTabs`,
  })
}

export const HomeFeed = () => {
  return axios({
    method: 'get',
    url: `/HomeFeed`,
  })
}

export const GetClassPageLayout = (id) => {
  return axios({
    method: 'get',
    url: `/GetClassPageLayout?tabId=${id}`,
  })
}

//获取男女生推荐
export const getSexRecommend = (id) => {
  return axios({
    method: 'get',
    url: `/GetHomeSecondaryComics?moduleId=${id}&pageNum=1&pageSize=10`,
  })
}

export const GetClassPageHomeBanner = (id) => {
  return axios({
    method: 'get',
    url: `/GetClassPageHomeBanner?id=${id}`,
  })
}

export const GetType3 = (id) => {
  return axios({
    method: 'get',
    url: `/GetClassPageSixComics?id=${id}&pageNum=1&pageSize=15&isAll=1`,
  })
}

export const GetType7 = (id) => {
  return axios({
    method: 'get',
    url: `/GetClassPageComicsRank?id=${id}`,
  })
}

export const GetType8 = (id) => {
  return axios({
    method: 'get',
    url: `/GetClassPageHighEnergyEp?id=${id}`,
  })
}

//漫画详情页
export const GetComicDetail = (id) => {
  return axios({
    method: 'get',
    url: `/ComicDetail?comicId=${id}`,
  })
}

export const GetComicMoreRecommend = (id) => {
  return axios({
    method: 'get',
    url: `/MoreRecommend?comicId=${id}`,
  })
}

//漫画观看页
export const GetImageIndex = (id) => {
  return axios({
    method: 'get',
    url: `/GetImageIndex?epId=${id}`,
  })
}

export const GetImageToken = (url) => {
  return axios({
    method: 'get',
    url: `/ImageToken?urls=["https://manga.hdslb.com${url}@660w.webp"]`,
  })
}

//分类页
export const GetAllLabel = () => {
  return axios({
    method: 'get',
    url: `/AllLabel`,
  })
}

export const GetLabelPage = (styleId = -1, areaId = -1, isFinish = -1) => {
  return axios({
    method: 'get',
    url: `/ClassPage?styleId=${styleId}&areaId=${areaId}&isFinish=${isFinish}&order=0&pageNum=1&pageSize=39&isFree=-1`,
  })
}


export const searchPage = (keyword) => {
  return axios({
    method: 'get',
    url: `/Search?styleId=-1&areaId=2&isFinish=-1&order=-1&pageNum=1&pageSize=20&isFree=-1&keyWord=${keyword}`,
  })
}

export const getListRank = () => {
  return axios({
    method: 'get',
    url: `/ListRank`,
  })
}

export const getRankInfo = (id) => {
  return axios({
    method: 'get',
    url: `/GetRankInfo?id=${id}&offset=0&subId=0`,
  })
}

//注册
export const registerUser = function(params) {
  return axios({
    method: 'post',
    url: 'http://localhost:8080/api/apiRegister',
    data: {
      username: params.phone,
      password: params.password,
      userNickName: params.nickName
    }
  })
}

//登录
export const loginUser = function(params) {
  return axios({
    method: 'post',
    url: 'http://localhost:8080/api/login',
    data: {
      username: params.phone,
      password: params.password,
      // userNickName: params.nickName
    }
  })
}

export const checkToken = function(token) {
  return axios({
    method: 'post',
    url: 'http://localhost:8080/api/apiCheckToken',
    data: {
      token
    }
  })
}

export const getUserInfo = function(token) {
  return axios({
    method: 'post',
    url: 'http://localhost:8080/api/apiGetUserInfo',
    data: {
      token
    }
  })
}








