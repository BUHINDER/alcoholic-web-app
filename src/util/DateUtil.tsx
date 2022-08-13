export function epochToDate(epoch: number): string {
    return new Date(epoch).toLocaleString(navigator.language, {hour12: false})
}
