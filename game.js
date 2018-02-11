const el = document.getElementById('game');
const ctx = el.getContext('2d');

const { width, height } = el;
const speed = 2; // block/second

const getDate = () => new Date();

const oneSecDiff = n => n >= 1000;
const timeDiff = date => getDate() - date; 
const isTick = R.compose(
    oneSecDiff,
    timeDiff,
    R.prop('prevDate'),
);
const log = v => (console.log(v), v);

const render = state => () => R.compose(
    R.ifElse(
        isTick,
        R.compose(
            update,
            R.over(R.lensProp('prevDate'), _ => getDate()),
            log,
        ),
        update,
    )
)(state);

const initialState = {
    prevDate: getDate(),
};
const update = R.compose(
    requestAnimationFrame,
    render,
);
update(initialState);