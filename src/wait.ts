const wait = (time: number) =>
    new Promise(resolve => setTimeout(resolve, time));

export { wait }