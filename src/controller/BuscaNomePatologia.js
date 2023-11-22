import API_URL from "../model/config";

export default async function BuscaNomePatologia(nomeBuscado){
    try {
        const resultado = await fetch(`${API_URL}/listaPatologias?nomePatologia=${nomeBuscado}`);
        console.log("resultado " ,resultado)
        data = await resultado.json();
        console.log("data ", data)
        return data;
    }  catch (error){
        console.log(error);
        return {};
    }
}