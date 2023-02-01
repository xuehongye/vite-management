// 判断参数是否大于9
const addZero = (num: number) => {
    return num > 9 ? num : '0' + num
}
// 格式化时间
export const formateDate = (time: string | undefined) => {
    if(!time) return ''
    const date = new Date(time)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return year + '-' + addZero(month) + '-' + addZero(day) + ' ' + addZero(hour) + ':' + addZero(minute) + ':' + addZero(second)
}