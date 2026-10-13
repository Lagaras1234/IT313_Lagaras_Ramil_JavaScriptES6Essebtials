export function computeAverage(prelim, midterm, final) {
    return (prelim + midterm + final) / 3;
}

export default function isPassing(average) {
    return average >= 75;
}