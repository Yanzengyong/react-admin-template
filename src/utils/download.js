import qs from 'qs'
import APILIST from '../api/apiList'
const TOKEN = window.localStorage.getItem('TOKEN') || APILIST.TOKEN

// 说明：
/**
 * import Download from '@/utils/download';
 *
 * Download('http://www.baidu.com')
 *
 * 结果：http://www.baidu.com?token=50aaf7d4c5814aa7ad26f81f24873575
 *
 * Download('http://www.baidu.com', { id: 222, name: 'yzy' })
 *
 * 结果：http://www.baidu.com?token=50aaf7d4c5814aa7ad26f81f24873575&id=222&name=yzy
 *
 *  */

export default (addr, query) => {
	window.open(`${addr}${query ? `?token=${TOKEN}&${qs.stringify(query)}` : `?token=${TOKEN}`}`)
}
