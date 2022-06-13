export const dateCompleteFormat = (d: Date) => {
    const today = new Date()

    if(
        today.getDate() === d.getDate() && 
        today.getMonth() === d.getMonth() && 
        today.getFullYear() === d.getFullYear()
    ) {
        let hours = d.getHours();
        let minutes = d.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const retDate = `${hours}:${minutes}${ampm}`
        return retDate
    }

    else {
        let hours = d.getHours();
        let minutes = d.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const retTime = `${hours}:${minutes}${ampm}`

        const retDate = `${retTime} ${d.getDate()} ${d.getMonth()} ${d.getFullYear()}`
        return retDate
    }
}