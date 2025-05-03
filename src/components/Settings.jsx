import { useState } from 'react'
import styles from '../styles/Settings.module.css'

function Settings({ isOpen, onClose, settings, onSettingsChange }) {
  const [localSettings, setLocalSettings] = useState(settings)

  const handleChange = (key, value) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    onSettingsChange(localSettings)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Settings</h2>
        
        <div className={styles.setting}>
          <label>
            <input
              type="checkbox"
              checked={localSettings.soundEnabled}
              onChange={(e) => handleChange('soundEnabled', e.target.checked)}
            />
            Enable Sound Effects
          </label>
        </div>

        <div className={styles.setting}>
          <label>
            <input
              type="checkbox"
              checked={localSettings.historyEnabled}
              onChange={(e) => handleChange('historyEnabled', e.target.checked)}
            />
            Show Calculation History
          </label>
        </div>

        <div className={styles.setting}>
          <label>
            <input
              type="checkbox"
              checked={localSettings.particlesEnabled}
              onChange={(e) => handleChange('particlesEnabled', e.target.checked)}
            />
            Show Particle Background
          </label>
        </div>

        <div className={styles.setting}>
          <label>
            <input
              type="checkbox"
              checked={localSettings.keyboardEnabled}
              onChange={(e) => handleChange('keyboardEnabled', e.target.checked)}
            />
            Enable Keyboard Input
          </label>
        </div>

        <div className={styles.setting}>
          <label>
            <input
              type="checkbox"
              checked={localSettings.scientificByDefault}
              onChange={(e) => handleChange('scientificByDefault', e.target.checked)}
            />
            Start in Scientific Mode
          </label>
        </div>

        <div className={styles.setting}>
          <label>
            <input
              type="checkbox"
              checked={localSettings.darkMode}
              onChange={(e) => handleChange('darkMode', e.target.checked)}
            />
            Dark Mode
          </label>
        </div>

        <div className={styles.buttons}>
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default Settings 