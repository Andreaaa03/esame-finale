# DiscoDance

## Netifly
- https://discodance.netlify.app/

## Introduzione
Questo progetto si basa sulla creazione di un sito per una discoteca dove puoi vedere gli eventi in programma, oltre a quelli passati. Per fare ciò è stata impostata una data che permette un interfaccia utente più immersiva. Ogni evento ha una pagina a se dedicata con le rispettive informazioni e si può effettuare una prenotazione con una scelta di ingresso tra 6 orari proposti, eccetto gli eventi scaduti dove non è possibile prenotare.
Per effettuare la prenotazione bisogna autenticarsi e perciò è stato oportuno creare una pagina dedicata al LogIn e SignIn. 
Quindi se ogni utente doveva registrarsi era necessaria una pagina profilo. Qui sono riportati le info inserite dall'utente con le rispettive sue prenotazioni, se effettuate.

## UX/UI e Scelte implementative
### Perchè questi colori?
  - Siccome tutti gli eventi inseriti sono datati in un periodo estivo ho scelto dei colori tranquilli che facessero sentire l'utente in vacanza usando contrasti bianchi nei bottoni per far capire meglio il percorso del sito. Ho usato anche colori come il rosso per far percepire la pericolosità dell'azione a cui è asscoiato il bottone.

### Perchè questa interfaccia?
  - Il punto cardine di questo sito sono sicuramente gli eventi, quindi ho deciso di mettere nella <u>HOME</u> come navbar le 3 sezioni: "Eventi passati", "Prossimo evento", "Eventi futuri".
  La prima voce propone banalmente eventi già conclusi che rappresenta il registro degli eventi
  La voce "Prossimo evento" rappresenta il prossimo evento in programma che dovrà svolgersi, questo per far dedicare più attenzione all'utente e per far sì che più persone possibili possano partecipare.
  Infine l'ultima voce propone semplicemente tutti gli eventi futuri in programma.

  - Ogni evento ha una pagine dedicata con molte più informazioni utili all'utente come il "price", "dresscode" e tra le tante altre cose c'è la possibilità di prenotare l'orario di ingresso scaglionato di 15 min. La prenotazione la si effettua grazie ad una modale che aprendosi offre già i dati relativi dell'utente non modificabili (perchè ho scelto che la prenotazione di un evento è possibile farlo solo col proprio account).

  - La <u>PAGINA del PROFILO</u> è accesibile solo tramite un pulsante in basso a sinistra dello schermo. Entrando, come già detto prima, vediamo le informazioni dell'utente non modificabili con le opzioni di LogOut e elimina profilo(cancellando tutte le prenotazione correlate) e le prenotazioni da lui effettuate. Per gestire con più sicurezza le azioni di LogOut e elimina profilo ho scelto di inserire un checkbox che l'utente deve spuntare per poi confermare l'operazione.
  Le prenotazione vanno a riprendere le card proposte nella HOME aggiungendo l'orario di prenotazione e con la possibilità di eliminare la prenotazione stessa.

  - L'autenticazione si divide in due punti:    
    - Sicuramente se entri per la prima volta all'interno del sito dovrai registrarti quindi l'utente dovrà inserire Nome, Cognome, Età, E-mail e password.
    - Una volta fatta la registrazione bisogna accedere e sarà solo necessario inserire e-mail e password.   
    Se l'utente si dovesse dimenticare la password può richiedere una e-mail di reset della password
    
### Firebase
  - Database.   
    Ho deciso di aggiungere gli stessi campi di Users nelle prenotazioni Booking che se dovesse essere necessario fare ulteriori controlli di sicurezza è gia tutto pronto.
    - Booking
      - id
        - age
        - event
        - mail
        - name
        - surname
        - time_selected
    - Users
      - id
        - age 
        - mail 
        - name 
        - surname   
  
  - Firebase Authentication   
    Per ogni utente salvo l' e-mail e la password codificata in hash. Gestito direttamente da firebase.

 ### Created By Andrea Cavalca

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


