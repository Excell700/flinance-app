import React, { useState } from 'react';
import { 
  Play, 
  ArrowRight, 
  Target, 
  Lightbulb, 
  TrendingUp, 
  Youtube, 
  Copy, 
  CheckCircle, 
  BookOpen,
  ExternalLink,
  ShoppingCart,
  Moon,
  Sun
} from 'lucide-react';

const App = () => {
  const [copied, setCopied] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const referralCode = "2023851404";
  const youtubeLink = "https://www.youtube.com/@Kartelito777";
  const brokerLink = "https://www.boursedirect.fr/"; 

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Base de données des livres
  const books = [
    {
      category: "💰 Investissement",
      title: "L’Investisseur Intelligent",
      author: "Benjamin Graham",
      desc: "Un classique incontournable de l’investissement. Ce livre t’apprend à investir avec discipline, à éviter les erreurs émotionnelles et à penser sur le long terme.",
      link: "https://amzn.to/4t1nG8f"
    },
    {
      category: "💰 Investissement",
      title: "Le petit livre pour investir avec bon sens",
      author: "John C. Bogle",
      desc: "Une approche simple et efficace basée sur l’investissement passif. Idéal pour comprendre pourquoi les ETF sont puissants.",
      link: "https://amzn.to/4lKqLaf"
    },
    {
      category: "📊 Économie",
      title: "Économie basique",
      author: "Thomas Sowell",
      desc: "Un livre ultra clair pour comprendre comment fonctionne réellement l’économie, sans jargon compliqué.",
      link: "https://amzn.to/4syGQlK"
    },
    {
      category: "🚀 Débutant",
      title: "La Bourse pour les Nuls",
      author: "Gérard Horny",
      desc: "Parfait pour débuter en bourse. Ce livre explique les bases simplement et t’aide à faire tes premiers investissements.",
      link: "https://amzn.to/4bo1O0T"
    },
    {
      category: "🧠 Psychologie",
      title: "La psychologie de l’argent",
      author: "Morgan Housel",
      desc: "Comprendre pourquoi nos émotions influencent nos décisions financières. Un must-read pour éviter les erreurs classiques.",
      link: "https://amzn.to/4lH9RcB"
    },
    {
      category: "🪙 Crypto",
      title: "Bitcoin et cryptomonnaies pour les Nuls",
      author: "Daniel Drescher",
      desc: "Un guide simple pour comprendre le fonctionnement du Bitcoin et des cryptomonnaies en partant de zéro.",
      link: "https://amzn.to/4rN9xKG"
    }
  ];

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-50 selection:bg-indigo-100 selection:text-indigo-900 dark:selection:bg-indigo-900 dark:selection:text-indigo-100 transition-colors duration-300">
        
        {/* NAVIGATION */}
        <nav className="fixed w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50 border-b border-slate-200/50 dark:border-slate-800/50 transition-colors duration-300">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded flex items-center justify-center font-bold text-lg transition-colors">
                  F
                </div>
                <span className="font-bold text-xl tracking-tight">flinance</span>
              </div>
              <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
                <a href="#youtube" className="hover:text-slate-900 dark:hover:text-white transition-colors">Vidéos</a>
                <a href="#method" className="hover:text-slate-900 dark:hover:text-white transition-colors">Méthode</a>
                <a href="#library" className="hover:text-slate-900 dark:hover:text-white transition-colors">Livres</a>
                <a href="#broker" className="hover:text-slate-900 dark:hover:text-white transition-colors">Investir</a>
                <div className="flex items-center gap-4 border-l border-slate-200 dark:border-slate-700 pl-4">
                  <button 
                    onClick={() => setIsDarkMode(!isDarkMode)} 
                    className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                    aria-label="Activer le mode nuit"
                  >
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                  <a href="#youtube" className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-sm">
                    S'abonner
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* HERO SECTION */}
        <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-4 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-indigo-50/50 dark:bg-indigo-900/20 blur-3xl -z-10 rounded-full transition-colors"></div>
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fadeIn">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight transition-colors">
              Bienvenue sur <br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Flinance</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed transition-colors">
              J’aide les particuliers à investir intelligemment et à construire leur liberté financière.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a href="#youtube" className="w-full sm:w-auto px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-medium hover:bg-slate-800 dark:hover:bg-slate-100 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                <Play size={20} /> Voir mes vidéos
              </a>
              <a href="#broker" className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl font-medium hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2 shadow-sm">
                Commencer à investir <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </section>

        {/* VALUE / METHOD SECTION */}
        <section id="method" className="py-24 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800 transition-colors">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white transition-colors">Une approche claire et éprouvée</h2>
              <p className="mt-4 text-slate-500 dark:text-slate-400 text-lg transition-colors">Fini le jargon complexe. Place à l'action.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  icon: <Target className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
                  title: "Investissement long terme",
                  desc: "Pas de trading risqué ni de promesses magiques. On construit un patrimoine solide, mois après mois, pour la retraite ou l'indépendance."
                },
                {
                  icon: <Lightbulb className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
                  title: "Analyse simple et efficace",
                  desc: "Apprends à lire les marchés, comprendre les ETF et sélectionner les meilleurs actifs sans y passer 3 heures par jour."
                },
                {
                  icon: <TrendingUp className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
                  title: "Éducation accessible",
                  desc: "Des vidéos pédagogiques et directes. Je traduis les concepts financiers complexes en stratégies applicables par tous."
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-white dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600 flex items-center justify-center mb-6 shadow-sm transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 transition-colors">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed transition-colors">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* YOUTUBE SECTION (Toujours en Dark pour le contraste) */}
        <section id="youtube" className="py-24 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-900/30 to-transparent"></div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="flex-1 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-300 text-sm font-medium border border-white/10">
                  <Youtube size={16} /> @Kartelito777
                </div>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  Apprends à investir <br/>
                </h2>
                <p className="text-slate-400 text-lg max-w-xl mx-auto lg:mx-0">
                  Rejoins la communauté sur YouTube. Je partage une vidéo par semaine.
                </p>
                <a 
                  href={youtubeLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-600/20"
                >
                  <Youtube size={24} /> S'abonner à la chaîne
                </a>
              </div>

              {/* Mockup YouTube Card */}
              <div className="flex-1 w-full max-w-md">
                <a href={youtubeLink} target="_blank" rel="noopener noreferrer" className="block group relative rounded-2xl overflow-hidden border border-white/10 bg-slate-800 p-2 shadow-2xl transition-transform hover:-translate-y-2">
                  <div className="aspect-video bg-slate-700 rounded-xl relative overflow-hidden flex items-center justify-center">
                    <img 
                      src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1000" 
                      alt="Trading screen placeholder" 
                      className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center z-10 shadow-lg group-hover:scale-110 transition-transform">
                      <Play size={32} className="text-white ml-1" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg line-clamp-2">Stratégie ETF 2024 : Comment investir son premier salaire ?</h3>
                    <p className="text-slate-400 text-sm mt-2">Dernière vidéo • Kartelito</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* BROKERAGE REFERRAL SECTION */}
        <section id="broker" className="py-24 bg-white dark:bg-slate-900 transition-colors">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 transition-colors">Ouvrir un compte et commencer à investir</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto transition-colors">
              Passe à l'action dès aujourd'hui. Utilise mon code de parrainage pour soutenir le projet et ouvrir ton PEA ou Compte Titres facilement.
            </p>

            <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 md:p-12 shadow-sm max-w-2xl mx-auto relative overflow-hidden transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100 dark:bg-indigo-900/30 rounded-bl-full -z-0 opacity-50"></div>
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 relative z-10 transition-colors">Recommandé : Bourse Direct</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-8 relative z-10 transition-colors">L'un des courtiers les moins chers en France.</p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 relative z-10">
                <div className="flex items-center gap-4 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 px-6 py-4 rounded-xl shadow-sm w-full sm:w-auto transition-colors">
                  <span className="text-slate-500 dark:text-slate-400 text-sm uppercase font-bold transition-colors">Code Parrain :</span>
                  <span className="text-2xl font-mono font-bold tracking-wider text-indigo-600 dark:text-indigo-400 transition-colors">{referralCode}</span>
                </div>
                <button 
                  onClick={copyToClipboard}
                  className="p-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  {copied ? <CheckCircle size={20} className="text-green-400" /> : <Copy size={20} />}
                  {copied ? "Copié !" : "Copier"}
                </button>
              </div>

              <a 
                href={brokerLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md w-full sm:w-auto justify-center relative z-10"
              >
                Ouvrir un compte sur Bourse Direct <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* LIBRARY SECTION */}
        <section id="library" className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center p-3 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-2xl mb-6 shadow-sm transition-colors">
                <BookOpen size={32} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 transition-colors">📚 Ma Bibliothèque</h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed transition-colors">
                Une sélection des meilleurs livres pour comprendre la finance, investir intelligemment et développer le bon mindset.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {books.map((book, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all flex flex-col h-full group">
                  <div className="mb-4">
                    <span className="inline-flex items-center px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-full uppercase tracking-wider transition-colors">
                      {book.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {book.title}
                  </h3>
                  
                  {book.author && (
                    <p className="text-indigo-600/80 dark:text-indigo-400/80 font-medium text-sm mb-4 transition-colors">
                      Par {book.author}
                    </p>
                  )}
                  
                  <p className="text-slate-600 dark:text-slate-300 mb-8 flex-1 leading-relaxed text-sm md:text-base transition-colors">
                    {book.desc}
                  </p>
                  
                  <a 
                    href={book.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-medium hover:bg-indigo-600 dark:hover:bg-indigo-50 transition-colors mt-auto shadow-sm"
                  >
                    <ShoppingCart size={18} />
                    Acheter sur Amazon
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER & DISCLAIMER */}
        <footer className="bg-slate-900 py-12 border-t border-slate-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-8 text-white">
              <div className="w-8 h-8 bg-white text-slate-900 rounded flex items-center justify-center font-bold text-lg">
                F
              </div>
              <span className="font-bold text-xl tracking-tight">flinance</span>
            </div>
            
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 max-w-3xl mb-8">
              <p className="text-slate-400 text-sm leading-relaxed">
                <strong>Avertissement Légal :</strong> Ce contenu est purement éducatif et ne constitue en aucun cas un conseil financier, fiscal ou juridique personnalisé. L'investissement en bourse comporte des risques de perte en capital. Faites toujours vos propres recherches avant d'investir. Certains liens présents sur cette page sont des liens affiliés.
              </p>
            </div>

            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Flinance. Tous droits réservés.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
