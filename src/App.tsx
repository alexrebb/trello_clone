import Router from './router/Router'
import { RecoilRoot } from 'recoil'

const App = () => {
    return (
        <RecoilRoot>
            <Router />
        </RecoilRoot>
    )
}

export default App
