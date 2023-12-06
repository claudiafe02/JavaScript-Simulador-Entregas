// Extrae el año, mes y día de la fecha actual y lo transforma en string
const ANIOHOY =new Date().getFullYear().toString();
// Suma 1 al mes para tener el número de mes de 1 a 12
const MESHOY = new Date().getMonth()+1;
const MESSHOY = MESHOY.toString();
const DIAHOY = new Date().getDate().toString();

// Fecha actual para cálculo
const FECHAHOY1 = new Date(ANIOHOY+"-"+MESSHOY+"-"+DIAHOY).getTime();

// Valor de la tasa diaria para cada tipo de plazo fijo
const TASADIARIABCRA = 133/365;
const TASADIARIATC$ = 126/365;
const TASADIARIATCU$$ = 0.10/365;
// Función fecha de Vencimiento
// Para mostrar en pantalla
const fechaVencimiento = (d,m,a) => d +"/"+ m +"/"+ a ;
// Para cálculo
const fechaVencimiento1 = (d,m,a) => new Date(a +"-"+ m +"-"+ d).getTime();

// Función que calcula los días de plazo desde la Fecha actual Hasta la Fecha de Vencimiento ingresda por el usuario 

const diasPlazo = (fV,fH) => parseInt((fV - fH)/(1000*60*60*24));
 
//Función que calcula los intereses con los días de plazo y la tasa
const intereses = (dias,tasa) => dias * tasa;

let descripcionTipoPf,interesPorTipoPF,continuar,opcionCorrecta;

do {
    
    // Ingreso de datos necesarios para el cálculo de plazo fijo.
    // Selección del tipo de plazo fijo:
    let plazoFijoTipo = parseInt(prompt("Ingrese el N° de opción correspondiente al tipo de plazo fijo que quiere realizar: 1- $ PF Regulado BCRA (133%) 2- $ PF Tradicional Clientes (126%) 3- U$$ PF Tradicional Clientes (0.10%) "));

    // Ingreso de Importe
    let importePlazoFijo = parseFloat(prompt("Ingrese el Importe: "));

    // Ingreso de fecha de vencimiento.
    let diaV = prompt("Ingrese dos dígitos para indicar el día de la Fecha de vencimiento: ");
    let mesV = prompt("Ingrese dos dígitos para indicar el mes de la Fecha de vencimiento: ");
    let anioV = prompt("Ingrese cuatro dígitos para indicar el año de la Fecha de vencimiento: ");
    
    if (!isNaN(plazoFijoTipo) && !isNaN(importePlazoFijo) && !isNaN(parseInt(diaV)) && !isNaN(parseInt(mesV)) && !isNaN(parseInt(anioV))) {
        opcionCorrecta = true;
        switch (plazoFijoTipo) {
            case 1:
                interesPorTipoPF = ((intereses(diasPlazo(fechaVencimiento1(diaV,mesV,anioV),FECHAHOY1),TASADIARIABCRA) * importePlazoFijo)/100).toFixed(2);
                descripcionTipoPf = " 1- $ PF Regulado BCRA (133%)";
                break;
            case 2:
                interesPorTipoPF = ((intereses(diasPlazo(fechaVencimiento1(diaV,mesV,anioV),FECHAHOY1),TASADIARIATC$) * importePlazoFijo)/100).toFixed(2);
                descripcionTipoPf = " 2- $ PF Tradicional Clientes (126%)";
                break;
            case 3:    
                interesPorTipoPF = ((intereses(diasPlazo(fechaVencimiento1(diaV,mesV,anioV),FECHAHOY1),TASADIARIATCU$$) * importePlazoFijo)/100).toFixed(2);
                descripcionTipoPf = " 3- U$$ PF Tradicional Clientes (0.10%)";
                break
            default:
                alert("La opción de plazo fijo ingresado NO EXISTE");
                opcionCorrecta = false;
                break;
        }

    } else {
        alert("Alguna/s de las opciones que ingresó NO SE AJUSTA A LO SOLICITADO.");
        opcionCorrecta = false;
    };
    // Informa los datos ingresados y los días de plazo e intereses calculados
    if (opcionCorrecta == true) {
        alert("La FECHA DE VENCIMIENTO ingresada es: "+fechaVencimiento(diaV,mesV,anioV));
        alert("La cantidad de DÍAS hasta la Fecha de vencimiento es: "+diasPlazo(fechaVencimiento1(diaV,mesV,anioV),FECHAHOY1));
        alert("La opcion de PF elegida es: "+descripcionTipoPf+", el monto ingresado es: "+importePlazoFijo+",  los intereses a la Fecha de vencimiento son $ "+
        interesPorTipoPF);
        opcionCorrecta = false;
    };
    let continuar = prompt("Para volver a simular otro Plazo fijo ingrese: s  de lo contrario presione cualquier tecla.").toUpperCase();

    if (continuar == "S") {
        opcionCorrecta = true;
    }

} while (opcionCorrecta == true);

