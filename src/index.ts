import { Inject, Provide, Controller, Get, Param } from '@midwayjs/decorator';
import { Context } from '@midwayjs/faas';

@Provide()
@Controller('/')
export class APIService {

  @Inject()
  ctx: Context;

  @Get('/ad/:type')
  async ad(@Param() type: string) {
    let result = []
    if (type == 'top') {
      result = [
        {
          "_id": "1",
          "img": "https://6265-beibuwan-portal-6g3a6e5s1bc0d6e9-1258153869.tcb.qcloud.la/assets/images/ad1.jpeg",
          "url": "/pages/ad/index"
        },
        {
          "_id": "2",
          "img": "https://6265-beibuwan-portal-6g3a6e5s1bc0d6e9-1258153869.tcb.qcloud.la/assets/images/ad2.png",
          "url": "/pages/ad/index"
        }
      ]
    } else if (type == 'middle') {
      result = [
        {
          "_id": "3",
          "img": "https://6265-beibuwan-portal-6g3a6e5s1bc0d6e9-1258153869.tcb.qcloud.la/assets/images/ad3.jpeg",
          "url": "/pages/ad/index"
        }
      ]
    }
    return { result }
  }

  @Get('/service/:type')
  async service(@Param() type: string) {
    let result = [
      {
        "_id": "1",
        "provider": "中国版权保护中心官方店",
        "category": "知识产权服务",
        "img": "https://6265-beibuwan-portal-6g3a6e5s1bc0d6e9-1258153869.tcb.qcloud.la/assets/images/good.png",
        "title": "软件著作权申请专利代理商标注册全网最低价最快14天下证",
        "tag": ["保证完成", "官方", "不下证退全款", "资质认证服务商"],
        "price": 499,
        "unit": "件",
        "sold": 78,
        "star": 4.5,
        "comment": "商家服务态度很好,这一次下证很顺利!可以一次拼5个软著价格会更优惠,值得推荐!"
      },
      {
        "_id": "1",
        "provider": "中国版权保护中心旗舰店",
        "category": "知识产权服务",
        "img": "https://6265-beibuwan-portal-6g3a6e5s1bc0d6e9-1258153869.tcb.qcloud.la/assets/images/good.png",
        "title": "专利代理商标注册全网最低价最快14天下证软件著作权申请",
        "tag": ["不下证退全款", "资质认证服务商"],
        "price": 399,
        "unit": "件",
        "sold": 999,
        "star": 3.5,
        "comment": "商家服务态度很好,这一次下证很顺利!"
      },
      {
        "_id": "3",
        "provider": "赛宝实验室",
        "category": "检验检测认证服务",
        "img": "https://6265-beibuwan-portal-6g3a6e5s1bc0d6e9-1258153869.tcb.qcloud.la/assets/images/good.png",
        "title": "专利代理商标注册全网最低价最快14天下证软件著作权申请",
        "tag": ["不下证退全款", "资质认证服务商"],
        "price": 999,
        "unit": "件",
        "sold": 28,
        "star": 5.0,
        "comment": "商家服务态度很好,这一次下证很顺利!"
      }
    ]
    return { result }
  }

  @Get('/standard')
  async get() {
    const result = [
      {
        image: 'https://6265-beibuwan-portal-6g3a6e5s1bc0d6e9-1258153869.tcb.qcloud.la/assets/menu/standard/%E7%94%B5%E5%AD%90%E4%BF%A1%E6%81%AF.png',
        value: '电子信息'
      },
      {
        image: 'https://6265-beibuwan-portal-6g3a6e5s1bc0d6e9-1258153869.tcb.qcloud.la/assets/menu/standard/%E9%AB%98%E7%AB%AF%E5%88%B6%E9%80%A0.png',
        value: '高端制造'
      },
      {
        image: 'https://6265-beibuwan-portal-6g3a6e5s1bc0d6e9-1258153869.tcb.qcloud.la/assets/menu/standard/%E5%86%B6%E9%87%91%E7%9F%B3%E5%8C%96.png',
        value: '冶金石化'
      },
      {
        image: 'https://6265-beibuwan-portal-6g3a6e5s1bc0d6e9-1258153869.tcb.qcloud.la/assets/menu/standard/%E9%93%B6%E8%A1%8C%E9%87%91%E8%9E%8D.png',
        value: '银行金融'
      },
      {
        image: 'https://6265-beibuwan-portal-6g3a6e5s1bc0d6e9-1258153869.tcb.qcloud.la/assets/menu/standard/%E4%BA%92%E8%81%94%E7%BD%91.png',
        value: '网络通信'
      },
      {
        image: 'https://6265-beibuwan-portal-6g3a6e5s1bc0d6e9-1258153869.tcb.qcloud.la/assets/menu/standard/%E5%9B%BD%E5%AE%B6%E6%A0%87%E8%AF%86.png',
        value: '国家标识'
      },
      {
        image: 'https://6265-beibuwan-portal-6g3a6e5s1bc0d6e9-1258153869.tcb.qcloud.la/assets/menu/standard/%E7%94%9F%E6%B4%BB%E6%97%A5%E7%94%A8.png',
        value: '生活日用'
      },
      {
        image: 'https://6265-beibuwan-portal-6g3a6e5s1bc0d6e9-1258153869.tcb.qcloud.la/assets/menu/standard/%E4%BA%A4%E9%80%9A%E4%B8%9A.png',
        value: '交通行业'
      },
      {
        image: 'https://6265-beibuwan-portal-6g3a6e5s1bc0d6e9-1258153869.tcb.qcloud.la/assets/menu/standard/%E5%8C%BB%E7%96%97%E5%81%A5%E5%BA%B7.png',
        value: '医疗健康'
      },
    ]
    return { result };
  }
}