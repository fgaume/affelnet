const formatFloat = (mynumber) => {
    if (typeof mynumber !== 'number') return '?';
    if (mynumber > 0)
        return parseFloat(mynumber.toFixed(3)).toLocaleString();
        else return '?';
};

const formatInt = (mynumber) => {
    return Math.round(mynumber).toLocaleString();
};

const formatVariation = (mynumber) => {
    const formatted = Math.round(mynumber).toLocaleString();
    return (mynumber < 0) ? formatted : "+" + formatted;
};

export { formatInt, formatFloat, formatVariation};