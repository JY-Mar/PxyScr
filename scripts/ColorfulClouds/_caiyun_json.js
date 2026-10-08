/***********************************************
> 应用名称：墨鱼自用彩云天气去广告脚本
> 脚本作者：@ddgksf2013
> 微信账号：墨鱼手记
> 更新时间：2024-09-01
> 通知频道：https://t.me/ddgksf2021
> 贡献投稿：https://t.me/ddgksf2013_bot
> 问题反馈：ddgksf2013@163.com
> 特别提醒：如需转载请注明出处，谢谢合作！
***********************************************/

const version = 'V1.0.8'

const url = $request.url
let obj = {}
try {
  obj = JSON.parse($response.body)
} catch {
  obj = {}
}

if (url.includes('/v2/user')) {
  obj.result.is_vip = 1
  obj.result.svip_expired_at = 1892260800
  obj.result.wt.vip.expired_at = 1892260800
  obj.result.svip_take_effect = 1
  obj.result.vip_type = 's'
} else if (url.includes('user_detail')) {
  ;['svip', 'vip'].forEach((e) => {
    if (obj.vip_info[e]) {
      obj.vip_info[e] = { expires_time: '1892260800', is_auto_renewal: !0 }
    }
  })
} else if (url.includes('activity')) {
  if (url.includes('type_id=A03')) {
    obj = { status: 'ok', activities: [{ type: 'tabbar', name: 'aichat', feature: !1 }] }
  } else {
    obj = { status: 'ok', activities: [{ items: [{}] }] }
  }
} else if (url.includes('operation/homefeatures')) {
  obj = { data: [] }
} else if (url.includes('operation/feeds')) {
  obj.data = obj.data.filter((e) => -1 != e.category_times_text.indexOf('人查看'))
} else if (url.includes('operation/banners')) {
  obj = {
    data: [
      {
        avatar: 'https://cdn-w.caiyunapp.com/p/app/operation/prod/banner/668502d5c3a2362582a2a5da/d9f198473e7f387d13ea892719959ddb.jpg',
        url: 'https://cdn-w.caiyunapp.com/p/app/operation/prod/article/66850143c3a2362582a2a5d9/index.html',
        title: '暴雨来袭，这些避险“秘籍”你学会了吗？',
        banner_type: 'article'
      }
    ]
  }
} else if (url.includes('operation/features')) {
  obj.data = obj.data.filter((e) => -1 != e.url.indexOf('cy://'))
} else if (url.includes('campaigns')) {
  obj = {
    campaigns: [{ name: 'driveweather', title: '驾驶天气新功能', url: 'cy://page_driving_weather', cover: 'https://cdn-w.caiyunapp.com/p/banner/test/668d442c4fe75aca7251c161.png' }]
  }
} else if (url.includes('notification/message_center')) {
  obj = { messages: [] }
} else if (url.includes('config/cypage')) {
  obj = { popups: [], actions: [] }
} else {
  $done({})
}

$done({ body: JSON.stringify(obj) })
