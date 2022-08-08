export const epochToDate = (epoch: number) => {
    return new Date(epoch).toLocaleString(navigator.language, {hour12: false})
}