export const mascaraCNPJ = (value: any) => {
    return value
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .slice(0, 18);
}

export const mascaraTelefone = (value: any) => {
    value = value.replace(/\D/g, ''); 

    if (value.length <= 10) {
        return value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
        return value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
}