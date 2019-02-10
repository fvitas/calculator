import { h, Component } from 'preact'
import style from './converter.styl'

import { Switch } from './../../components/icons/IconSwitch'

export class CurrencyConverter extends Component {

    state = {}

    async componentDidMount () {
        let currencies = `EUR_RSD`
        let response = await fetch(`https://free.currencyconverterapi.com/api/v5/convert?q=${currencies}&compact=y`)
        let rate = await response.json()

        response = await fetch('https://gist.githubusercontent.com/madnik/49937c83061d1bc0d064/raw/f14d9aa9392b332c9756e06b8d289b9379525e29/currencies.json')
        console.log(await response.json())

        this.rate = rate[currencies].val
        console.log(this.rate)
    }

    render(props, state) {
        return (
            <div className={style.converter}>
                <h1>Currency Converter</h1>
                <div className={style.convert}>
                    <div className={style.currency}>
                        <div className={style.country}>
                            <img className="" size="40" src="https://www.xe.com/themes/xe/images/flags/svg/usd.svg" alt=""/>
                            <span className='currency-label'>USD</span>
                        </div>
                        <div>1.00</div>
                    </div>
                    <div className={style.separator}><Switch/></div>
                    <div className={style.currency}>
                        <div className={style.country}>
                            <img className="" size="40" src="https://www.xe.com/themes/xe/images/flags/svg/rsd.svg" alt=""/>
                            <span className='currency-label'>RSD</span>
                        </div>
                        <div>103.20</div>
                    </div>
                </div>
                <div className={style.convert}>
                    <div className={style.currency}>
                        <div className={style.country}>
                            <img className="" size="40" src="https://www.xe.com/themes/xe/images/flags/svg/eur.svg" alt=""/>
                            <span className='currency-label'>EUR</span>
                        </div>
                        <div>1.00</div>
                    </div>
                    <div className={style.separator}><Switch/></div>
                    <div className={style.currency}>
                        <div className={style.country}>
                            <img className="" size="40" src="https://www.xe.com/themes/xe/images/flags/svg/rsd.svg" alt=""/>
                            <span className='currency-label'>RSD</span>
                        </div>
                        <div>118.30</div>
                    </div>
                </div>
                <div className={style.convert}>
                    <div className={style.currency}>
                        <div className={style.country}>
                            <img className="" size="40" src="https://www.xe.com/themes/xe/images/flags/svg/usd.svg" alt=""/>
                            <span className='currency-label'>USD</span>
                        </div>
                        <div>1.00</div>
                    </div>
                    <div className={style.separator}><Switch/></div>
                    <div className={style.currency}>
                        <div className={style.country}>
                            <img className="" size="40" src="https://www.xe.com/themes/xe/images/flags/svg/eur.svg" alt=""/>
                            <span className='currency-label'>EUR</span>
                        </div>
                        <div>0.87</div>
                    </div>
                </div>

            </div>
        )
    }
}
