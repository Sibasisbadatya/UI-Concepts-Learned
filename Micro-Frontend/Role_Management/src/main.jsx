import('./bootstrap.js')

// it is asynchronous import has some delay treated as Promise.resolve().then(() => loadBootstrap())

// Why this delay helps Module Federation

// Module Federation needs time to:
// 1. initialize share scope
// 2. resolve shared modules
// 3. connect remote containers


// If the app starts immediately:
// React starts
// shared modules not ready

// But with async import:
// runtime initializes first
// then React app starts