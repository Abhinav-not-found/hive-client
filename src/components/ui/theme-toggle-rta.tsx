import { useThemeAnimation } from '@space-man/react-theme-animation'
import { Moon, Sun } from 'lucide-react'

function ThemeToggle() {
  const { theme, toggleTheme, ref } = useThemeAnimation()

  return (
    <button ref={ref} onClick={toggleTheme} className="theme-toggle-btn">
      {theme === 'light' ? <Moon className='size-4 cursor-pointer'/> : <Sun className='size-4 cursor-pointer'/>}
    </button>
  )
}
export default ThemeToggle
