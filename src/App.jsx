import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "./components/button";
import "./App.css"

export default function App() {
    const [display, setDisplay] = useState("0");
    const [operator, setOperator] = useState(null);
    const [prevValue, setPrevValue] = useState(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);

    const handleClick = (value) => {
        if (!isNaN(value)) {
            // Si es número
            if (display === "0" || waitingForOperand) {
                setDisplay(String(value));
                setWaitingForOperand(false);
            } else {
                setDisplay(display + value);
            }
        } else if (value === "AC") {
            setDisplay("0");
            setOperator(null);
            setPrevValue(null);
            setWaitingForOperand(false);
        } else if (["+", "-", "*", "/", "(^)"].includes(value)) {
            setOperator(value);
            setPrevValue(parseFloat(display));
            setWaitingForOperand(true);
        } else if (value === "=") {
            if (operator && prevValue !== null) {
                let result = 0;
                const current = parseFloat(display);
                switch (operator) {
                    case "+": result = prevValue + current; break;
                    case "-": result = prevValue - current; break;
                    case "*": result = prevValue * current; break;
                    case "/": result = current !== 0 ? prevValue / current : "Error"; break;
                    case "(^)": result = Math.pow(prevValue, current); break;
                    default: break;
                }
                setDisplay(String(result));
                setOperator(null);
                setPrevValue(null);
                setWaitingForOperand(true);
            }
        } else if (value === "Sqrt()") {
            const current = parseFloat(display);
            setDisplay(String(Math.sqrt(current)));
            setOperator(null);
            setPrevValue(null);
            setWaitingForOperand(true);
        }
    };

    return (
        <main>
            <header>
                <h1 className="h1 m-3 p-3">Calculadora de operaciones básicas</h1>
            </header>
            <section className="container">
                <article className="card">
                    <div className="card-header p-3 rounded-2 fs-1 text-end">{display}</div>
                    <div className="card-body">
                        <div className="row mb-2">
                            <div className="col-3">
                                <Button text={7} className={"btn-secondary w-100"} onClick={() => handleClick(7)} />
                            </div>
                            <div className="col-3">
                                <Button text={8} className={"btn-secondary w-100"} onClick={() => handleClick(8)} />
                            </div>
                            <div className="col-3">
                                <Button text={9} className={"btn-secondary w-100"} onClick={() => handleClick(9)} />
                            </div>
                            <div className="col-3">
                                <Button text={"AC"} className={"btn-danger w-100"} onClick={() => handleClick("AC")} />
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-3">
                                <Button text={4} className={"btn-secondary w-100"} onClick={() => handleClick(4)} />
                            </div>
                            <div className="col-3">
                                <Button text={5} className={"btn-secondary w-100"} onClick={() => handleClick(5)} />
                            </div>
                            <div className="col-3">
                                <Button text={6} className={"btn-secondary w-100"} onClick={() => handleClick(6)} />
                            </div>
                            <div className="col-3">
                                <Button text={"-"} className={"btn-primary w-100"} onClick={() => handleClick("-")} />
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-3">
                                <Button text={1} className={"btn-secondary w-100"} onClick={() => handleClick(1)} />
                            </div>
                            <div className="col-3">
                                <Button text={2} className={"btn-secondary w-100"} onClick={() => handleClick(2)} />
                            </div>
                            <div className="col-3">
                                <Button text={3} className={"btn-secondary w-100"} onClick={() => handleClick(3)} />
                            </div>
                            <div className="col-3">
                                <Button text={"+"} className={"btn-primary w-100"} onClick={() => handleClick("+")} />
                            </div>
                        </div>
                        <div className="row mb-2 d-flex justify-content-between">
                            <div className="col-3">
                                <Button text={0} className={"btn-secondary w-100"} onClick={() => handleClick(0)} />
                            </div>
                            <div className="col-3">
                                <Button text={"*"} className={"btn-primary w-100"} onClick={() => handleClick("*")} />
                            </div>
                        </div>
                        <div className="row mb-2 d-flex justify-content-end">
                            <div className="col-3">
                                <Button text={"Sqrt()"} className={"btn-primary w-100"} onClick={() => handleClick("Sqrt()")} />
                            </div>
                            <div className="col-3">
                                <Button text={"(^)"} className={"btn-primary w-100"} onClick={() => handleClick("(^)")} />
                            </div>
                            <div className="col-3">
                                <Button text={"/"} className={"btn-primary w-100"} onClick={() => handleClick("/")} />
                            </div>
                            <div className="col-3">
                                <Button text={"="} className={"btn-dark w-100"} onClick={() => handleClick("=")} />
                            </div>
                        </div>
                    </div>
                </article>
            </section>
            <footer className="mt-3">
                <p className="text-muted">Desarrollado por Sergio Alejandro Arévalo Palacios y Kevin Eduardo Arévalo Palacios</p>
            </footer>
        </main>
    )
}