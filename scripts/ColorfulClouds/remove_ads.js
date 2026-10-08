/*
 * NAME            : remove_ads
 * AUTHOR          : JY-Mar
 * REPO            : https://github.com/JY-Mar/PxyRes
 * UPDATER         : JY-Mar
 * UPDATED         : 2026-10-08 12:24:12 +0800
 * DESC            : 移除首页推广、弹窗、悬浮窗、底栏天气助手、和工具箱入口，移除我的页面广告横幅
 */

const url = $request.url
let obj = {}
try {
  obj = JSON.parse($response.body)
} catch {
  obj = {}
}

if (/\/v2\/user/.test(url)) {
  obj.result.is_vip = 1
  obj.result.svip_expired_at = 1892260800
  obj.result.wt.vip.expired_at = 1892260800
  obj.result.svip_take_effect = 1
  obj.result.vip_type = 's'
} else if (/\/v\d\/user_detail/.test(url)) {
  ;['svip', 'vip'].forEach((e) => {
    if (obj.vip_info[e]) {
      obj.vip_info[e] = { expires_time: '1892260800', is_auto_renewal: !0 }
    }
  })
}
if (/\/v\d\/activity/.test(url)) {
  if (/\&type_id=A03\&/.test(url)) {
    // 底栏控制项目 主页图标 天气助手 彩云ai
    obj = { status: 'ok', activities: [{ type: 'tabbar', name: 'aichat', feature: !1 }] }
  } else {
    // 其他请求
    obj = { status: 'ok', activities: [{ items: [{}] }] }
  }
} else if (/\/starplucker\.cyapi\.cn\/v\d\/operation\/homefeatures/.test(url)) {
  // 工具箱
  obj = { data: [] }
} else if (/\/starplucker\.cyapi\.cn\/v\d\/notification\/message_center/.test(url)) {
  // APP内部消息
  obj = { messages: [] }
} else if (/\/starplucker\.cyapi\.cn\/v\d\/config\/cypage/.test(url)) {
  // 页面配置
  obj = { popups: [], actions: [] }
} else if (/\/starplucker\.cyapi\.cn\/v\d\/operation\/feeds/.test(url)) {
  // 工具箱
  obj.data = obj.data.filter((e) => e.category_times_text.indexOf('人查看') > -1)
} else if (/\/starplucker\.cyapi\.cn\/v\d\/operation\/banners/.test(url)) {
  // Banner
  obj.data = []
} else if (/\/starplucker\.cyapi\.cn\/v\d\/operation\/features/.test(url)) {
  // 工具箱
  obj.data = obj.data.filter((e) => e.url.indexOf('cy://') > -1)
} else if (/\/starplucker\.cyapi\.cn\/v\d\/campaigns/.test(url)) {
  // 推广信息
  obj = { campaigns: [] }
} else {
  $done({})
}

$done({ body: JSON.stringify(obj) })
