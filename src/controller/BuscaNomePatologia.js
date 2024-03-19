import API_URL from "../model/config";
import { fetchLocalPatologia } from "../model/saveLocalPatologia";

export default async function BuscaNomePatologia(nomeBuscado){
    try {
        const resultado = await fetch(`${API_URL}/listaPatologias?nomePatologia=${nomeBuscado}`);
        if(JSON.stringify(resultado.status) == "200"){
            data = await resultado.json();
            return data;
        } 
        else {return []}

    }  catch (error){
        // Caso nao consiga puxar da api externa tenta puxar dos salvos locamente
        objNome = {"nomePatologia": nomeBuscado};
        const resultado = await fetchLocalPatologia(objNome);
        if (resultado != undefined){
            return [resultado];
        } else {return []}
    }
}