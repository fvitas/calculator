import { h, Component } from 'preact'
import style from './calculator.styl'
import { Delete } from '../../components/icons/IconDelete'
import math from 'mathjs'

const PLUS = '+', MINUS = '−', TIMES = '×', DIVIDE = '÷'
const OPERATIONS = [PLUS, MINUS, TIMES, DIVIDE]
const ACTIONS = ['C', '=', 'delete']

export class Calculator extends Component {

    state = {
        calculationExpression: '',
        calculationResult: '',
        history: []
    }

    onButtonClick = (event) => {
        let { calculationExpression } = this.state
        let value = event.target.textContent

        if (ACTIONS.includes(value)) {
            this.executeAction(calculationExpression, value)
            return
        }

        this.appendValue(calculationExpression, value)
    }

    appendValue (calculation, value) {

        let newCalculation = calculation + value

        this.setState({
            calculationExpression: newCalculation,
            calculationResult: this.evaluateCalculation(newCalculation)
        })
    }

    executeAction (calculation, action) {
        if (action === 'C') {
            this.setState({ calculationExpression: '', calculationResult: '' })
            return
        }

        if (action === '=') {
            let { calculationResult, history } = this.state

            this.setState({
                calculationExpression: calculationResult,
                calculationResult: '',
                history: [ ...history, calculationResult ]
            })
            return
        }

        if (action === 'delete') {
            let newCalculation = calculation.slice(0, -1)

            this.setState({
                calculationExpression: newCalculation,
                calculationResult: this.evaluateCalculation(newCalculation)
            })
        }
    }

    /**.
     * @param {string} calculation
     * @return {string}
     */
    evaluateCalculation (calculation) {

        // todo: reverse engineer google calc
        // add reverse polish notation
        // remove mathjs

        if (!calculation)
            return ''

        try {
            calculation = calculation.replace(new RegExp('\\' + PLUS, 'g'), '+')
                                     .replace(new RegExp(MINUS, 'g'), '-')
                                     .replace(new RegExp(TIMES, 'g'), '*')
                                     .replace(new RegExp(DIVIDE, 'g'), '/')

            return math.round(math.eval(calculation), 12).toString()

        } catch (_) {
            return this.state.calculationResult
        }
    }

    /**.
     * @param {string} calculation
     * @return {string}
     */
    formatCalculation (calculation) {

        if (!calculation)
            return ''

        let newCalculation = calculation.replace(new RegExp('\\' + PLUS, 'g'), ` ${PLUS} `)
                                        .replace(new RegExp(MINUS, 'g'), ` ${MINUS} `)
                                        .replace(new RegExp(TIMES, 'g'), ` ${TIMES} `)
                                        .replace(new RegExp(DIVIDE, 'g'), ` ${DIVIDE} `)

        return newCalculation.split(' ')
                             .filter(item => !!item)
                             .map(item => {
                                 if (OPERATIONS.includes(item)) {
                                     return item
                                 } else {
                                     if (item.startsWith('.') || item.endsWith('.'))
                                         return item

                                     let number = parseFloat(item)

                                     if (!Number.isNaN(number))
                                         return number.toLocaleString('en-US', { maximumFractionDigits: 10 })
                                     else
                                         return item
                                 }
                             })
                             .join(' ')
    }

    render (props, state) {
        return (
            <div className={style.calculator}>
                <div className={style.buttons} onClick={this.onButtonClick}>
                    <div className={style.button}>C</div>
                    <div className={style.button}>{DIVIDE}</div>
                    <div className={style.button}>{TIMES}</div>
                    <div className={style.button}>
                        <Delete/>
                    </div>

                    <div className={style.button}>7</div>
                    <div className={style.button}>8</div>
                    <div className={style.button}>9</div>
                    <div className={style.button}>{MINUS}</div>

                    <div className={style.button}>4</div>
                    <div className={style.button}>5</div>
                    <div className={style.button}>6</div>
                    <div className={style.button}>{PLUS}</div>

                    <div className={style.button}>1</div>
                    <div className={style.button}>2</div>
                    <div className={style.button}>3</div>

                    <div className={`${style.button} ${style.button_equals}`}>=</div>

                    <div className={style.button}>%</div>
                    <div className={style.button}>0</div>
                    <div className={style.button}>.</div>
                </div>

                <div className={style.result}>{this.formatCalculation(state.calculationResult)}</div>

                <div className={style.live}>{this.formatCalculation(state.calculationExpression)}</div>
            </div>
        )
    }
}
