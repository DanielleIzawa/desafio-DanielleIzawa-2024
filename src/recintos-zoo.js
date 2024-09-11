class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
        ];

        this.animais = {
            'LEAO': { tamanho: 3, biomas: ['savana'] },
            'LEOPARDO': { tamanho: 2, biomas: ['savana'] },
            'CROCODILO': { tamanho: 3, biomas: ['rio'] },
            'MACACO': { tamanho: 1, biomas: ['savana', 'floresta'] },
            'GAZELA': { tamanho: 2, biomas: ['savana'] },
            'HIPOPOTAMO': { tamanho: 4, biomas: ['savana', 'rio'] }
        };
    }
    analisaRecintos(animal, quantidade) {
        if (!this.animais.hasOwnProperty(animal)) {
            return { erro: 'Animal inválido' };
        }

        if (!Number.isInteger(quantidade) || quantidade <= 0) {
            return { erro: 'Quantidade inválida' };
        }
    
        const {tamanho, biomas} = this.animais[animal];

    const recintosViaveis = this.recintos.filter(recinto => {
    const espacoOcupado = recinto.animais.reduce((total, a) => total + a.quantidade * this.animais[a.especie].tamanho, 0);
    const espacoLivre = recinto.tamanhoTotal - espacoOcupado;

    if (!biomas.includes(recinto.bioma) || espacoLivre < tamanho * quantidade) {
        return false;
    }

    if (animal === 'HIPOPOTAMO' && recinto.bioma !== 'savana e rio' && recinto.animais.length > 0) {
        return false;
    }

    if (recinto.animais.some(a => this.animais[a.especie].biomas.includes('savana') && a.especie !== animal)) {
        return false;
    }

    if (animal === 'MACACO' && recinto.animais.length === 0 && quantidade === 1) {
        return false;
    }
    return true;
}).map(recinto => `Recinto ${recinto.numero} (espaço livre: ${recinto.tamanhoTotal - (recinto.animais.reduce((total, a) => total + a.quantidade * this.animais[a.especie].tamanho, 0) + tamanho * quantidade)} total: ${recinto.tamanhoTotal})`);

if (recintosViaveis.length === 0) {
    return { erro: "Não há recinto viável" };
}

return { recintosViaveis };
}
}

export { RecintosZoo as RecintosZoo };
