import { Button } from 'antd'
import {Link} from 'react-router-dom'
// https://tailwindcss.com/docs/installation/tailwind-cli
export default function Home() {
    return <div class="flex flex-wrap justify-self-center ">
        <div class="">
            <Link to="/xlsx" >筛选列表值并按要求导出文件</Link>
            <Button
                type="primary"
                size="large"
                onClick={() => {  }}>筛选列表值并按要求导出文件</Button>
        </div>
        <div class="justify-self-center">
            <Button type="primary" size="large">数据分析（暂时不做）</Button>
        </div>
    </div>
}
