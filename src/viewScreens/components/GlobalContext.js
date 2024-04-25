import { createContext, useState } from "react";

export const GlobalContext = createContext({});

export function InfoProvider( {children} ) {
    const [tamanhoTitulo, setTamanhoTitulo] = useState(20);
    const [tamanhoParagrafo, setTamanhoParagrafo] = useState(16);
    const [mostraImagemSensivel, setMostraImagemSensivel] = useState(false);
    return (
        <GlobalContext.Provider value = {{
            tamanhoParagrafo,
            setTamanhoParagrafo,
            tamanhoTitulo,
            setTamanhoTitulo,
            mostraImagemSensivel,
            setMostraImagemSensivel
        }}>
            {children}
        </GlobalContext.Provider>
    )
}