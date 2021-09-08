const zombieSources = [
    {
        position: 'top right',
        flip: true,
        startX: 1500,
        startY: 50,
        velocity: -50,
    },
    {
        positon: 'bottom right',
        flip: true,
        startX: 1500,
        startY: 450,
        velocity: -50

    },
    {
        position: 'bottom left',
        flip: false,
        startX: 20,
        startY: 450,
        velocity: 50
    },
    {
        position: 'top left',
        flip: false,
        startX: 0,
        startY: 0,
        velocity: 50
    },
    {
        position: 'top middle',
        startX: 550,
        startY: 0,
        flip: false,
        velocity: 50
    },
    {
        position: 'top middle right',
        startX: 800,
        startY: 0,
        flip: true,
        velocity: -50
    },
    {
        position: 'right middle',
        flip: true,
        startX: 1500,
        startY: 200,
        velocity: -50
    }
]

export default zombieSources;