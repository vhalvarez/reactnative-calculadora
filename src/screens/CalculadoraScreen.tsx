import React, { useRef, useState } from "react";
import { Text, View } from "react-native";
import BotonCalc from "../components/BotonCalc";
import { styles } from "../theme/appTheme";

enum Operadores {
    sumar,
    restar,
    multiplicar,
    dividir,
}

export const CalculadoraScreen = () => {
    const [numero, setNumero] = useState("0");
    const [numeroAnterior, setNumeroAnterior] = useState("0");

    const ultimaOperacion = useRef<Operadores>();

    const limpiar = () => {
        setNumero("0");
        setNumeroAnterior("0");
    };

    const armarNumero = (numeroTexto: string) => {
        // no aceptar doble punto
        if (numero.includes(".") && numeroTexto === ".") return;

        if (numero.startsWith("0") || numero.startsWith("-0")) {
            // Punto decimal
            if (numeroTexto === ".") {
                setNumero(numero + numeroTexto);

                //  evaluar si es otro cero, y hay un punto
            } else if (numeroTexto === "0" && numero.includes(".")) {
                setNumero(numero + numeroTexto);

                // evaluar si es diferente de cero y no tiene un punto
            } else if (numeroTexto !== "0" && !numero.includes(".")) {
                setNumero(numeroTexto);

                // evitar 000.000
            } else if (numeroTexto === "0" && !numero.includes(".")) {
                setNumero(numero);
            } else {
                setNumero(numero + numeroTexto);
            }
        } else {
            setNumero(numero + numeroTexto);
        }
    };

    const btnDelete = () => {
        let negativo = "";
        let numeroTemp = numero;

        if (numero.includes("-")) {
            negativo = "-";
            numeroTemp = numero.substring(1);
        }

        if (numeroTemp.length > 1) {
            setNumero(negativo + numeroTemp.slice(0, -1));
        } else {
            setNumero("0");
        }
    };

    const cambiarNumPorAnterior = () => {
        if (numero.endsWith(".")) {
            setNumeroAnterior(numero.slice(0, -1));
        } else {
            setNumeroAnterior(numero);
        }

        setNumero("0");
    };

    const positivoNegativo = () => {
        if (numero.includes("-")) {
            setNumero(numero.replace("-", ""));
        } else {
            setNumero("-" + numero);
        }
    };

    const btnDividir = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.dividir;
    };

    const btnMultiplicar = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.multiplicar;
    };

    const btnRestar = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.restar;
    };

    const btnSumar = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.sumar;
    };

    const calcular = () => {
        const num1 = Number(numero);
        const num2 = Number(numeroAnterior);

        switch (ultimaOperacion.current) {
            case Operadores.sumar:
                setNumero(`${num1 + num2}`);
                break;

            case Operadores.restar:
                setNumero(`${num2 - num1}`);
                break;
            case Operadores.dividir:
                setNumero(`${num2 / num1}`);
                break;
            case Operadores.multiplicar:
                setNumero(`${num1 * num2}`);
                break;
            default:
                break;
        }

        setNumeroAnterior("0");
    };

    return (
        <View style={styles.calculadoraContainer}>
            {numeroAnterior !== "0" && (
                <Text style={styles.resultadoPequeno}> {numeroAnterior} </Text>
            )}

            <Text
                style={styles.resultado}
                numberOfLines={1}
                adjustsFontSizeToFit
            >
                {numero}
            </Text>

            {/* fila de botones */}
            <View style={styles.fila}>
                <BotonCalc texto="C" color="#9B9B9B" action={limpiar} />
                <BotonCalc
                    texto="+/-"
                    color="#9B9B9B"
                    action={positivoNegativo}
                />
                <BotonCalc texto="del" color="#9B9B9B" action={btnDelete} />
                <BotonCalc texto="/" color="#FF9427" action={btnDividir} />
            </View>

            <View style={styles.fila}>
                <BotonCalc texto="7" action={armarNumero} />
                <BotonCalc texto="8" action={armarNumero} />
                <BotonCalc texto="9" action={armarNumero} />
                <BotonCalc texto="X" color="#FF9427" action={btnMultiplicar} />
            </View>

            <View style={styles.fila}>
                <BotonCalc texto="4" action={armarNumero} />
                <BotonCalc texto="5" action={armarNumero} />
                <BotonCalc texto="6" action={armarNumero} />
                <BotonCalc texto="-" color="#FF9427" action={btnRestar} />
            </View>

            <View style={styles.fila}>
                <BotonCalc texto="1" action={armarNumero} />
                <BotonCalc texto="2" action={armarNumero} />
                <BotonCalc texto="3" action={armarNumero} />
                <BotonCalc texto="+" color="#FF9427" action={btnSumar} />
            </View>

            <View style={styles.fila}>
                <BotonCalc texto="0" ancho action={armarNumero} />
                <BotonCalc texto="." action={armarNumero} />
                <BotonCalc texto="=" action={calcular} />
            </View>
        </View>
    );
};
