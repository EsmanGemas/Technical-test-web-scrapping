export function transformToNumber(price: string) {
    return Number(price.substring(5).replace(/,/g, ""));
}

export function getPercentageOfNumber(value: number, percentage: number) {
    return (value * percentage) / 100
}
