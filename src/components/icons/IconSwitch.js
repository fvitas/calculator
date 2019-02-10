import { h } from 'preact'

export function Switch () {
    return (
        <svg className="feather feather-arrow-switch" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" overflow="visible">
            <g transform="translate(-10 -5)">
                <line x1="19" y1="12" x2="5" y2="12"/>
                <polyline points="12 19 5 12 12 5"/>
            </g>
            <g transform="translate(10 5)">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
            </g>
        </svg>
    )
}