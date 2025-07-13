import { Button } from 'antd'
import {Link} from 'react-router-dom'
import './home.css'
// https://tailwindcss.com/docs/installation/tailwind-cli
export default function Home() {
    return <div className="split-page">
  <Link to="/xlsx" className="split-link personal">
    <div className="link-content">
      <h2>按要求导出excel文件</h2>
      <p>其中包含筛选、重新排序等功能</p>
    </div>
  </Link>
  <Link to="/analysis" className="split-link enterprise">
    <div className="link-content">
      <h2>数据分析</h2>
      <p>有这个计划，但目前不做</p>
    </div>
  </Link>
  </div>
}
