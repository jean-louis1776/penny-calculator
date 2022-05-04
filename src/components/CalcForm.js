import React, { useState } from "react"
import {
    FormGroup,
    FormLabel,
    Form,
    Button,
    FormControl,
} from "react-bootstrap"
import CurrencyInput from "react-currency-input"
import CalcResult from "./CalcResult"

const CalcForm = (props) => {
    const [inputPrice, setInputPrice] = useState("")
    const [inputPercent, setInputPercent] = useState("")
    const [inputStartDate, setInputStartDate] = useState("")
    const [inputEndDate, setInputEndDate] = useState("")
    const [printResult, setPrintResult] = useState(false)
    const [priceError, setPriceError] = useState("")
    const [startDateError, setStartDateError] = useState("")
    const [endDateError, setEndDateError] = useState("")

    const url = `https://apps.kv34.ru/cbr/main-info?day=${inputEndDate}`

    fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            let key = JSON.parse(data.keyRate)
            setInputPercent(key)
        })

    const handlePriceChange = (maskedvalue) => {
        setInputPrice(maskedvalue)
    }
    const handlePercentChange = (maskedvalue) => {
        setInputPercent(maskedvalue)
    }
    const handlePrintResult = () => {
        setPrintResult(true)
    }
    const handleDeleteResult = () => {
        setPrintResult(false)
        setInputPrice("")
        setInputPercent("")
        setInputStartDate("")
        setInputEndDate("")
    }
    const handleValid = () => {
        if (!inputPrice) {
            setPriceError("Это поле является обязательным")
        } else if (!inputStartDate) {
            setStartDateError("Это поле является обязательным")
        } else if (!inputEndDate) {
            setEndDateError("Это поле является обязательным")
        } else if (
            inputPrice &&
            inputPercent &&
            inputStartDate &&
            inputEndDate
        ) {
            setPriceError("")
            setStartDateError("")
            setEndDateError("")
            handlePrintResult()
        }
    }

    const date1 = new Date(inputStartDate)
    const date2 = new Date(inputEndDate)

    const diffTime = Math.abs(date2 - date1)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return (
        <div>
            <Form className="form-wrap">
                <FormGroup>
                    <FormLabel className="form-label">
                        Цена неисполненных обязательств
                    </FormLabel>
                    <CurrencyInput
                        className="form-control"
                        onChange={handlePriceChange}
                        value={inputPrice}
                        precision="2"
                        thousandSeparator=""
                        name="price"
                    />
                    {priceError && <p className="error">{priceError}</p>}
                </FormGroup>
                <FormGroup>
                    <FormLabel className="form-label">
                        Срок окончания поставки товара, выполнения работ,
                        оказания услуг
                    </FormLabel>
                    <FormControl
                        type="date"
                        onChange={(e) => {
                            setInputStartDate(e.target.value)
                        }}
                        value={inputStartDate}
                        name="startDate"
                    />
                    {startDateError && (
                        <p className="error">{startDateError}</p>
                    )}
                </FormGroup>
                <FormGroup>
                    <FormLabel className="form-label">
                        Окончание периода просрочки
                    </FormLabel>
                    <FormControl
                        type="date"
                        onChange={(e) => {
                            setInputEndDate(e.target.value)
                        }}
                        value={inputEndDate}
                        name="endDate"
                    />
                    {endDateError && <p className="error">{endDateError}</p>}
                </FormGroup>
                <FormGroup>
                    <FormLabel className="form-label">
                        Ставка рефинансирования (ключевая ставка %)
                    </FormLabel>
                    <CurrencyInput
                        className="form-control"
                        onChange={handlePercentChange}
                        value={inputPercent}
                        precision="1"
                        name="percent"
                    />
                </FormGroup>

                <Button
                    type="submit"
                    variant="success"
                    className="calc-penny penny-button"
                    onClick={(e) => {
                        e.preventDefault()
                        handleValid()
                    }}
                >
                    Рассчитать
                </Button>
            </Form>
            {printResult ? (
                <>
                    <CalcResult
                        price={inputPrice}
                        perdays={diffDays}
                        percent={inputPercent}
                    />
                    <Button
                        className="penny-button"
                        variant="success"
                        onClick={handleDeleteResult}
                    >
                        Новый расчёт
                    </Button>
                </>
            ) : null}
        </div>
    )
}

export default CalcForm
