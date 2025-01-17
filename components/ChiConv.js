import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
const OpenCC = require('opencc-js')

const ChiConv = props => {
  const { length = 1 } = props
  const hostname =
    typeof window !== 'undefined' && window.location.hostname
      ? window.location.hostname
      : ''
  const defaultLanguage = hostname === 'cn.andys.pro' ? 'zh-CN' : 'zh-TW'
  const [lang, setLang] = useState(defaultLanguage)
  const converter = OpenCC.Converter({ from: 'twp', to: 'cn' })
  const rootNode = document.documentElement
  const HTMLConvertHandler = OpenCC.HTMLConverter(
    converter,
    rootNode,
    'zh-TW',
    'zh-CN'
  )
  const tts = () => {
    localStorage.setItem('lang', 'zh-CN')
    setLang('zh-CN')
    HTMLConvertHandler.convert()
  }
  const stt = () => {
    localStorage.setItem('lang', 'zh-TW')
    setLang('zh-TW')
    HTMLConvertHandler.restore()
  }
  // Run when page change
  const router = useRouter()
  console.log(router)
  const { onLoading } = useGlobal()
  useEffect(() => {
    const existLang = localStorage.getItem('lang') || defaultLanguage
    if (existLang === 'zh-CN') {
      HTMLConvertHandler.restore()
      HTMLConvertHandler.convert()
      setLang('zh-CN')
    }
  }, [onLoading, router])
  const onClick = lang === 'zh-TW' ? tts : stt
  const langString = (lang === 'zh-TW' ? '简体中文' : '繁體中文').substring(
    0,
    length
  )
  // console.log(locale)
  return <button onClick={onClick}>{langString}</button>
}

export default ChiConv
