import React, { useState, useEffect } from "react"
import { Table, Navbar, Alert, Container, Button } from "react-bootstrap"

const CalcResult = (props) => {
    const [copied, setCopied] = useState(false)

    const percent = props.percent
    let penny = (props.price * props.perdays * (percent / 100)) / 300

    const printFormule = `Размер пени П = ${props.price} руб. * ${
        percent + "%"
    } * 1 / 300 * ${props.perdays} = ${penny.toFixed(2)} руб.`

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (copied) {
                setCopied(false)
            }
        }, 2000)

        return () => {
            navigator.clipboard.writeText(printFormule)
            clearTimeout(timeout)
        }
    }, [copied])

    return (
        <Container className="result-wrap">
            <Navbar className="result-header">
                <Navbar.Text>Рассчёт суммы требования</Navbar.Text>
            </Navbar>
            <Table>
                <thead>
                    <tr className="calc-row">
                        <th>Цена неисполненных обязательств</th>
                        <th>Дни просрочки</th>
                        <th>Ставка рефинансирования (ключевая ставка)</th>
                        <th>Сумма пеней (П)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="calc-row">
                        <td>{props.price}</td>
                        <td>{props.perdays}</td>
                        <td>{percent + "%"}</td>
                        <td>{penny.toFixed(2)}</td>
                    </tr>
                </tbody>
            </Table>

            <Alert variant="success" className="result-formule">
                <Alert.Heading>Формула</Alert.Heading>
                <p className="formule-text">{printFormule}</p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button
                        variant="success"
                        className="copy-button penny-button"
                        onClick={() => setCopied(true)}
                    >
                        {copied ? "Скопировано!" : "Скопировать результат"}
                    </Button>
                </div>
            </Alert>
        </Container>
    )
}

export default CalcResult
