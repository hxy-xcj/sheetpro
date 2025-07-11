import { HashRouter, Route, Switch } from 'react-router-dom'
import { useEffect } from 'react';
import Home from '../views/home/home';
import XLSX from '../views/xlsx/xlsx';
import Analysis from '../views/analysis/analysis';

export default function IndexRouter() {
    useEffect(() => { }, [])
    return (
        <HashRouter>
            <Switch>
                <Route path="/xlsx" component={XLSX}></Route>
                <Route path="/analysis" component={Analysis}></Route>
                <Route path="/" component={Home} ></Route>

            </Switch>
        </HashRouter>
    )
}