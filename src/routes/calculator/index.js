import { h, Component } from 'preact'
import style from './calculator.styl'
import { Delete } from '../../components/icons/IconDelete'

const OPERATIONS = ['+', '−', '×', '÷']
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

    executeOperation (calculation, value) {

        if (calculation.trim().length < 2 && ['+', '×', '÷'].includes(value) ) {
            return
        }

        calculation = calculation.trim()
        let lastItem = calculation[calculation.length - 1]

        let newCalculation = OPERATIONS.includes(lastItem)
            ? calculation.slice(0, -1)
            : calculation

        this.setState({ calculationExpression: `${newCalculation} ${value} ` })
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
            let newCalculation = calculation.trim().slice(0, -1).trim()

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

        let adaptedCalculation = calculation.replace(/−/g, '-')
                                            .replace(/×/g, '*')
                                            .replace(/÷/g, '/')
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

            adaptedCalculation = eval(adaptedCalculation.trim().slice(0, -1).trim())

            if (!adaptedCalculation)
                return ''
            else
                return adaptedCalculation
        }
    }

    render (props, state) {
        return (
            <div className={style.calculator}>
                <div className={style.buttons} onClick={this.onButtonClick}>
                    <div className={style.button}>C</div>
                    <div className={style.button}>÷</div>
                    <div className={style.button}>×</div>
                    <div className={style.button}>
                        <Delete/>
                    </div>

                    <div className={style.button}>7</div>
                    <div className={style.button}>8</div>
                    <div className={style.button}>9</div>
                    <div className={style.button}>−</div>

                    <div className={style.button}>4</div>
                    <div className={style.button}>5</div>
                    <div className={style.button}>6</div>
                    <div className={style.button}>+</div>

                    <div className={style.button}>1</div>
                    <div className={style.button}>2</div>
                    <div className={style.button}>3</div>

                    <div className={`${style.button} ${style.button_equals}`}>=</div>

                    <div className={style.button}>%</div>
                    <div className={style.button}>0</div>
                    <div className={style.button}>.</div>
                </div>

                <div className={style.result}>{state.calculationResult}</div>

                <div className={style.live}>{state.calculationExpression}</div>
            </div>
        )
    }
}
