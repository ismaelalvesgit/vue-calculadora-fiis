import * as uuid from 'uuid'

class MainService {

    getListCalculations(){
        return [
            {
                id: uuid.v4(),
                name: "Qualitativa",
                icon: "fa fa-book",
                list: [
                    {
                        id: uuid.v4(),
                        name: "Avaliação Qualitativa",
                        description: "Check list de avaliação qualitativa",
                        value: {
                            type:"qualitativa1",
                            variables:{
                                localization: {
                                    value: 0,
                                    weight: 1
                                },
                                manager: {
                                    value: 0,
                                    weight: 2
                                },
                                propertyConditions: {
                                    value: 0,
                                    weight: 1
                                },
                                vacancy: {
                                    value: 0,
                                    weight: 2
                                },
                                tenants: {
                                    value: 0,
                                    weight: 1
                                },
                                diversification: {
                                    value: 0,
                                    weight: 2
                                },
                                dividends: {
                                    value: 0,
                                    weight: 1
                                },
                                perpetuity: {
                                    value: 0,
                                    weight: 1.5
                                },
                                unrepentable: {
                                    value: 0,
                                    weight: 0.5
                                },
                                versatile: {
                                    value: 0,
                                    weight: 0.5
                                }
                            }
                        }
                    },
                ]
            },
            {
                id: uuid.v4(),
                name: "Porcentagem",
                icon: "fa fa-percent",
                list: [
                    {
                        id: uuid.v4(),
                        name: "Porcentagem 01",
                        description: "Quero saber quanto é X de: R$ Y",
                        value: {
                            type:"porcentage1",
                            variables:{
                                porcentage: 0,
                                value: 0,
                            }
                        }
                    },
                    {
                        id: uuid.v4(),
                        name: "Porcentagem 02",
                        description: `Possuo um valor de X e quero saber qual é sua 
                        porcentagem em cima do valor de Y ?`,
                        value: {
                            type:"porcentage2",
                            variables:{
                                value1: 0,
                                value2: 0,
                            }
                        }
                    },
                    {
                        id: uuid.v4(),
                        name: "Porcentagem 03",
                        description: `Possuo um valor de X e AUMENTOU para o valor de Y 
                        Quero saber qual foi o aumento percentual.`,
                        value: {
                            type:"porcentage3",
                            variables:{
                                value1: 0,
                                value2: 0,
                            }
                        }
                    },
                    {
                        id: uuid.v4(),
                        name: "Porcentagem 04",
                        description: `Possuo um valor de X e DIMINUIU para o valor de Y. Quero 
                        saber qual foi a diminuição percentual.`,
                        value: {
                            type:"porcentage4",
                            variables:{
                                value1: 0,
                                value2: 0,
                            }
                        }
                    },
                    {
                        id: uuid.v4(),
                        name: "Porcentagem 05",
                        description: `Quero saber quanto o valor de X em cima do valor de Y 
                        representa em porcentagem.`,
                        value: {
                            type:"porcentage5",
                            variables:{
                                value1: 0,
                                value2: 0,
                            }
                        }
                    },
                    {
                        id: uuid.v4(),
                        name: "Porcentagem 06",
                        description: `Possuo um valor de X e preciso AUMENTAR em Y %. 
                        Quanto fica com o aumento percentual?`,
                        value: {
                            type:"porcentage6",
                            variables:{
                                value1: 0,
                                value2: 0,
                            }
                        }
                    },
                    {
                        id: uuid.v4(),
                        name: "Porcentagem 07",
                        description: `Possuo um valor de X e preciso DIMINUIR em Y %. 
                        Quanto fica com o desconto percentual?`,
                        value: {
                            type:"porcentage7",
                            variables:{
                                value1: 0,
                                value2: 0,
                            }
                        }
                    }
                ]
            }
        ]
    }
    
    getCalculations(){
        return JSON.parse(window.localStorage.getItem('calculations'))
    }
    
    setCalculations(calculations){
        window.localStorage.setItem('calculations', JSON.stringify(calculations))
    }
    
    currencyFormat(value){
        if(value){
            const val = (value/1).toFixed(2).replace('.', ',').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            if(val === "NaN" || val === "Infinity"){
                return false
            }
            return val
        }
        return 0
    }
}

export default new MainService()