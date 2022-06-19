const formatFloat = (mynumber) => {
    return parseFloat(mynumber.toFixed(3)).toLocaleString();
};

const formatInt = (mynumber) => {
    return Math.round(mynumber).toLocaleString();
};

const formatVariation = (mynumber) => {
    const formatted = Math.round(mynumber).toLocaleString();
    return (mynumber < 0) ? formatted : "+" + formatted;
};

export { formatInt, formatFloat, formatVariation};