import './square.css'

export default function Square({ value, squareClicked }) {
    return (
        <div
            className='square'
            style={{
                pointerEvents: value ? 'none' : 'all'
            }}
            onClick={($event) => {
                $event.stopPropagation();
                $event.preventDefault();
                squareClicked($event)
            }}>
            {value}
        </div>)
}