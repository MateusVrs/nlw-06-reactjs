import { useContext } from 'react'
import { DarkContext } from '../../contexts/DarkContext'
import './styles.scss'

export function ToggleDark() {
    const { isDark, setIsDark } = useContext(DarkContext)

    function handleToggleDark() {
        setIsDark(!isDark)

        document.querySelector('body')?.classList.toggle('dark')
    }

    return (
        <label className="switch">
            <input type="checkbox" onChange={handleToggleDark} checked={isDark} />
            <span className="slider round"></span>
            <div>
                <span>🌙</span>
                <span>☀️</span>
            </div>
        </label>
    )
}