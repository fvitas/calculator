import { h, Component } from 'preact'
import style from './calculator.styl'
import { Delete } from '../../components/icons/IconDelete'

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

        if (OPERATIONS.includes(value)) {
            this.executeOperation(calculationExpression, value)
            return
        }
        if (ACTIONS.includes(value)) {
            this.executeAction(calculationExpression, value)
            return
        }

        this.executeNumber(calculationExpression, value)
    }

    executeNumber (calculation, value) {
        this.setState({
            calculationExpression: calculation + value,
            calculationResult: this.evaluateCalculation(calculation + value)
        })
    }

    isInvalidCalculationStart (calculation, value) {
        return (!calculation && [PLUS, TIMES, DIVIDE].includes(value)) || (calculation === MINUS && OPERATIONS.includes(value))
    }

    executeOperation (calculation, value) {

        if (this.isInvalidCalculationStart(calculation, value)) {
            return
        }

        let lastItem = calculation[calculation.length - 1]

        let newCalculation = OPERATIONS.includes(lastItem)
            ? calculation.slice(0, -1)
            : calculation

        this.setState({ calculationExpression: newCalculation + value })
    }

    executeAction (calculation, action) {
        if (action === 'C') {
            this.setState({ calculationExpression: '', calculationResult: '' })
        }

        if (action === '=') {
            let { calculationResult, history } = this.state

            this.setState({
                calculationExpression: calculationResult,
                calculationResult: '',
                history: [ ...history, calculationResult ]
            })
        }

        if (action === 'delete') {
            let newCalculation = calculation.slice(0, -1)

            this.setState({
                calculationExpression: newCalculation,
                calculationResult: this.evaluateCalculation(newCalculation)
            })
        }
    }

    evaluateCalculation (calculation) {
        if (!calculation) {
            return ''
        }

        let adaptedCalculation = calculation.replace(new RegExp(MINUS, 'g'), '-')
                                            .replace(new RegExp(TIMES, 'g'), '*')
                                            .replace(new RegExp(DIVIDE, 'g'), '/')
        try {
            adaptedCalculation = adaptedCalculation.split(' ')
                                                   .reduce((evaluation, item, index) => {
                                                       if (item.includes('%')) {
                                                           if (index === 0) {
                                                               return +item.slice(0, -1) / 100
                                                           } else {
                                                               let tempEval = evaluation.trim().slice(0, -1).trim()
                                                               return evaluation + eval(tempEval) / 100 * +item.slice(0, -1)
                                                           }
                                                       } else {
                                                           return evaluation + item
                                                       }
                                                   }, '')

            return eval(adaptedCalculation) + ''

        } catch (o_O) {

            adaptedCalculation = eval(adaptedCalculation.slice(0, -1))

            if (!adaptedCalculation)
                return ''
            else
                return adaptedCalculation
        }
    }

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
                                     let number = parseFloat(item).toLocaleString('en-US')

                                     return item.endsWith('.') ? number + '.' : number
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

                <div className={style.result}>{state.calculationResult}</div>

                <div className={style.live}>{this.formatCalculation(state.calculationExpression)}</div>
            </div>
        )
    }
}
