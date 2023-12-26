
export function formatCurrency(number, currency = "EUR"){
    return new Intl.NumberFormat("fr-FR", {style: "currency", currency}).format(parseInt(number))
}