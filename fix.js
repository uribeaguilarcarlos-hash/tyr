const fs = require('fs');

function fixDesktop() {
  let content = fs.readFileSync('src/components/LandingDesktop.tsx', 'utf8');
  content = content.replace(/<option value="es">.*?<\/option>[\s\S]*?<option value="pt">.*?<\/option>/m, 
    '<option value="es">ES Español</option>\n' +
    '              <option value="en">US English</option>\n' +
    '              <option value="zh-CN">CN 中文</option>\n' +
    '              <option value="de">DE Deutsch</option>\n' +
    '              <option value="fr">FR Français</option>\n' +
    '              <option value="it">IT Italiano</option>\n' +
    '              <option value="pt">PT Português</option>'
  );
  fs.writeFileSync('src/components/LandingDesktop.tsx', content, 'utf8');
}

function fixMobile() {
  let content = fs.readFileSync('src/components/LandingMobile.tsx', 'utf8');
  
  // 1. Globe interactive=false
  content = content.replace('<GlobeAnimation />', '<GlobeAnimation interactive={false} />');

  // 2. Add menuOpen state
  content = content.replace(/const \[currentLang, setCurrentLang\] = React\.useState\('es'\);/, 
    "const [currentLang, setCurrentLang] = React.useState('es');\n  const [menuOpen, setMenuOpen] = React.useState(false);"
  );

  // 3. Hamburger menu
  const navRegex = /<nav className=\{styles\.nav\}>[\s\S]*?<\/nav>/m;
  const newNav = <button 
            className={styles.hamburgerBtn}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          {menuOpen && (
            <div className={styles.mobileMenu}>
              <button className={styles.closeMenuBtn} onClick={() => setMenuOpen(false)}>&times;</button>
              <a href="#servicios" className={styles.navLink} onClick={() => setMenuOpen(false)}>Servicios</a>
              <a href="#nosotros" className={styles.navLink} onClick={() => setMenuOpen(false)}>Nosotros</a>
              <a href="#contacto" className={styles.navLink} onClick={() => setMenuOpen(false)}>Contacto</a>
              
              <div className={styles.langSelector}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                <select 
                  ref={selectRef}
                  className={styles.langSelect} 
                  defaultValue="es"
                  onChange={(e) => {
                    const lang = e.target.value;
                    if (lang === 'es') {
                      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + window.location.hostname;
                    } else {
                      document.cookie = "googtrans=/es/" + lang + "; path=/;";
                      document.cookie = "googtrans=/es/" + lang + "; path=/; domain=" + window.location.hostname;
                    }
                    window.location.reload();
                  }}
                >
                  <option value="es">ES Español</option>
                  <option value="en">US English</option>
                  <option value="zh-CN">CN 中文</option>
                  <option value="de">DE Deutsch</option>
                  <option value="fr">FR Français</option>
                  <option value="it">IT Italiano</option>
                  <option value="pt">PT Português</option>
                </select>
              </div>
            </div>
          )};
  
  content = content.replace(navRegex, newNav);
  fs.writeFileSync('src/components/LandingMobile.tsx', content, 'utf8');
}

fixDesktop();
fixMobile();
