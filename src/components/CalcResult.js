import React from "react"
import { Table, Navbar, Alert, Container } from "react-bootstrap"

const CalcResult = (props) => {
    const percent = props.percent

    let penny = (props.price * props.perdays * percent) / 300

    return (
        <Container className="result-wrap">
            <Navbar className="result-header">
                <Navbar.Text>Рассчёт суммы требования</Navbar.Text>
            </Navbar>
            <Table>
                <thead>
                    <tr>
                        <th>Цена неисполненных обязательств</th>
                        <th>Дни просрочки</th>
                        <th>Ставка рефинансирования (ключевая ставка)</th>
                        <th>Сумма пеней (П)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{props.price}</td>
                        <td>{props.perdays}</td>
                        <td>{percent + "%"}</td>
                        <td>{penny.toFixed(2)}</td>
                    </tr>
                </tbody>
            </Table>
            <Alert variant="success" className="result-formule">
                Размер пени П = {props.price} руб. * {percent + "%"} * 1 / 300 *{" "}
                {props.perdays} = {penny.toFixed(2)} руб.
            </Alert>
        </Container>
    )
}

export default CalcResult
