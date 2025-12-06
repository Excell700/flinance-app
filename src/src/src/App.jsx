import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, 
  Receipt, 
  CreditCard, 
  MessageSquare, 
  Settings, 
  UploadCloud, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp, 
  TrendingDown, 
  Search,
  Menu,
  X,
  Bot,
  FileText,
  LogOut,
  ChevronRight,
  Loader2,
  DollarSign,
  PieChart as PieIcon
} from 'lucide-react';

/**
 * MOCK DATA & UTILS
 * Simulation des données backend et des services IA
 */

const MOCK_USER = {
  name: "Alexandre Dumas",
  company: "TechFlow Solutions",
  plan: "Starter",
  avatar: "AD"
};

const MOCK_TRANSACTIONS = [
  { id: 1, date: '2023-10-25', label: 'Abonnement AWS', amount: -124.50, type: 'expense', category: 'Infrastructure', status: 'matched' },
  { id: 2, date: '2023-10-24', label: 'Virement Client - Studio 8', amount: 2450.00, type: 'income', category: 'Vente', status: 'pending' },
  { id: 3, date: '2023-10-23', label: 'Uber Ride', amount: -24.90, type: 'expense', category: 'Transport', status: 'matched' },
  { id: 4, date: '2023-10-22', label: 'Apple Store', amount: -1499.00, type: 'expense', category: 'Matériel', status: 'pending' },
  { id: 5, date: '2023-10-20', label: 'Stripe Payout', amount: 890.00, type: 'income', category: 'Vente', status: 'matched' },
];

// Composant Graphique Simple (SVG)
const RevenueChart = () => (
  <div className="w-full h-48 flex items-end justify-between space-x-2 px-2">
    {[35, 45, 30, 60, 55, 75, 80, 65, 50, 70, 90, 85].map((h, i) => (
      <div key={i} className="group relative flex-1 bg-indigo-50 hover:bg-indigo-100 rounded-t-lg transition-all duration-300">
        <div 
          style={{ height: `${h}%` }} 
          className="absolute bottom-0 w-full bg-indigo-500 rounded-t-lg group-hover:bg-indigo-600 transition-all"
        ></div>
        {/* Tooltip simple */}
        <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded">
          {h * 100}€
        </div>
      </div>
    ))}
  </div>
);

/**
 * COMPOSANTS UI ATOMIQUES
 */

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl border border-slate-100 shadow-sm ${className}`}>
    {children}
  </div>
);

const Button = ({ children, variant = "primary", onClick, className = "", disabled = false }) => {
  const baseStyle = "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg disabled:bg-indigo-300",
    secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50",
    ghost: "text-slate-500 hover:bg-slate-100 hover:text-slate-800",
    danger: "bg-red-50 text-red-600 hover:bg-red-100"
  };
  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const Badge = ({ status }) => {
  const styles = {
    matched: "bg-green-100 text-green-700 border-green-200",
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    processing: "bg-blue-100 text-blue-700 border-blue-200",
    rejected: "bg-red-100 text-red-700 border-red-200"
  };
  
  const labels = {
    matched: "Rapproché",
    pending: "En attente",
    processing: "Analyse IA",
    rejected: "Rejeté"
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles.pending}`}>
      {labels[status] || status}
    </span>
  );
};

/**
 * MODULES FONCTIONNELS
 */

// 1. DASHBOARD
const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tableau de bord</h1>
          <p className="text-slate-500">Aperçu de la santé financière de {MOCK_USER.company}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary"><UploadCloud size={16} /> Importer relevé</Button>
          <Button><DollarSign size={16} /> Nouvelle facture</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Chiffre d'affaires", val: "12,450.00 €", trend: "+12%", color: "text-indigo-600", icon: TrendingUp },
          { label: "Dépenses", val: "4,230.50 €", trend: "+5%", color: "text-red-600", icon: TrendingDown },
          { label: "Bénéfice Net", val: "8,219.50 €", trend: "+15%", color: "text-green-600", icon: PieIcon },
          { label: "Trésorerie", val: "18,400.00 €", trend: "Stable", color: "text-blue-600", icon: CreditCard },
        ].map((kpi, idx) => (
          <Card key={idx} className="p-5 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 text-xs uppercase font-semibold tracking-wider">{kpi.label}</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">{kpi.val}</h3>
              </div>
              <div className={`p-2 rounded-lg bg-slate-50 ${kpi.color}`}>
                <kpi.icon size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-medium">
              <span className={kpi.color === "text-red-600" ? "text-red-600" : "text-green-600"}>
                {kpi.trend}
              </span>
              <span className="text-slate-400">vs mois dernier</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">Flux de trésorerie</h3>
            <select className="bg-slate-50 border border-slate-200 text-sm rounded-md px-2 py-1 outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Cette année</option>
              <option>Ce mois</option>
            </select>
          </div>
          <RevenueChart />
          <div className="flex justify-center gap-6 mt-4 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-indigo-500"></div> Recettes
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-indigo-100"></div> Prévisionnel
            </div>
          </div>
        </Card>

        {/* Recent Transactions */}
        <Card className="p-0 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-800 text-sm">Dernières opérations</h3>
            <button className="text-indigo-600 text-xs font-medium hover:underline">Voir tout</button>
          </div>
          <div className="divide-y divide-slate-100">
            {MOCK_TRANSACTIONS.slice(0, 4).map((tx) => (
              <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${tx.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-600'}`}>
                    {tx.type === 'income' ? <TrendingUp size={14} /> : <Receipt size={14} />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{tx.label}</p>
                    <p className="text-xs text-slate-400">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${tx.type === 'income' ? 'text-green-600' : 'text-slate-800'}`}>
                    {tx.type === 'income' ? '+' : ''}{tx.amount} €
                  </p>
                  <Badge status={tx.status} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

// 2. DOCUMENT SCANNER (OCR MOCK)
const SmartScan = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scannedData, setScannedData] = useState(null);

  const handleSimulateScan = () => {
    setIsProcessing(true);
    // Simulation délai IA
    setTimeout(() => {
      setIsProcessing(false);
      setScannedData({
        merchant: "Apple Store France",
        date: "2023-11-02",
        amount: "1,499.00",
        tax: "249.83",
        category: "Matériel Informatique",
        confidence: 0.98
      });
    }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Smart Scan IA</h2>
        <p className="text-slate-500">Déposez vos factures, notre IA extrait les données automatiquement.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Drop Zone */}
        <div 
          className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center transition-all cursor-pointer h-80
            ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50'}`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleSimulateScan(); }}
          onClick={handleSimulateScan}
        >
          {isProcessing ? (
            <div className="flex flex-col items-center animate-pulse">
              <Loader2 size={48} className="text-indigo-600 animate-spin mb-4" />
              <h3 className="font-bold text-slate-800">Analyse en cours...</h3>
              <p className="text-sm text-slate-500">Extraction du fournisseur et des montants</p>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
                <UploadCloud size={32} />
              </div>
              <h3 className="font-bold text-lg text-slate-800">Glisser-déposer une facture</h3>
              <p className="text-sm text-slate-500 mt-2 mb-4">PDF, JPG ou PNG (max 5MB)</p>
              <Button variant="secondary">Parcourir les fichiers</Button>
            </>
          )}
        </div>

        {/* Results */}
        <Card className="h-80 p-6 relative overflow-hidden flex flex-col">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <FileText size={18} className="text-indigo-600" /> Résultat de l'extraction
          </h3>
          
          {scannedData ? (
            <div className="space-y-4 flex-1 overflow-y-auto">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2 text-sm text-green-700 mb-4">
                <CheckCircle size={16} /> Extraction réussie (Confiance: {(scannedData.confidence * 100).toFixed(0)}%)
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-xs text-slate-400 uppercase font-semibold">Fournisseur</span>
                  <div className="font-medium text-slate-900">{scannedData.merchant}</div>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-slate-400 uppercase font-semibold">Date</span>
                  <div className="font-medium text-slate-900">{scannedData.date}</div>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-slate-400 uppercase font-semibold">Montant TTC</span>
                  <div className="font-bold text-indigo-600 text-lg">{scannedData.amount} €</div>
                </div>
                 <div className="space-y-1">
                  <span className="text-xs text-slate-400 uppercase font-semibold">TVA (Est.)</span>
                  <div className="font-medium text-slate-900">{scannedData.tax} €</div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="space-y-1 mb-4">
                   <span className="text-xs text-slate-400 uppercase font-semibold">Catégorie suggérée</span>
                   <div className="flex items-center gap-2">
                     <span className="bg-slate-100 px-2 py-1 rounded text-sm text-slate-700">{scannedData.category}</span>
                   </div>
                </div>
                <div className="flex gap-2">
                  <Button className="w-full">Valider et Enregistrer</Button>
                </div>
              </div>
            </div>
          ) : (
             <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
               <Receipt size={48} className="mb-4 opacity-20" />
               <p>Aucune donnée à afficher</p>
               <p className="text-sm">Scannez un document pour voir la magie opérer.</p>
             </div>
          )}
        </Card>
      </div>
    </div>
  );
};

// 3. AI ASSISTANT (CHAT)
const AIAssistant = () => {
  const [messages, setMessages] = useState([
    { id: 1, role: 'system', text: 'Bonjour ! Je suis FlinanceBot. Je peux analyser vos finances ou répondre à des questions comptables. Comment puis-je vous aider ?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = { id: Date.now(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulation réponse IA
    setTimeout(() => {
      let responseText = "Je ne suis pas sûr de comprendre. Pouvez-vous reformuler ?";
      
      const lowerInput = userMsg.text.toLowerCase();
      if (lowerInput.includes('bénéfice') || lowerInput.includes('combien')) {
        responseText = "Sur la base de vos transactions d'octobre, votre bénéfice net est de **8,219.50 €**. C'est une augmentation de 15% par rapport à septembre. Excellent travail ! 🚀";
      } else if (lowerInput.includes('impôt') || lowerInput.includes('tva')) {
        responseText = "Pour le régime micro-entrepreneur, vous devez déclarer votre CA à l'URSSAF avant le 30 du mois. Votre TVA collectée ce mois-ci est estimée à **1,450 €**. Voulez-vous que je prépare le formulaire ?";
      } else if (lowerInput.includes('dépense') || lowerInput.includes('apple')) {
        responseText = "J'ai trouvé une dépense importante chez 'Apple Store' de 1,499.00 € le 22/10. S'agit-il d'un achat de matériel amortissable sur plusieurs années ?";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'system', text: responseText }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col animate-fadeIn">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Bot className="text-indigo-600" /> Flinance Assistant
        </h2>
        <p className="text-slate-500">Votre assistant virtuel disponible 24/7.</p>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden shadow-lg border-indigo-100">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-br-none' 
                  : 'bg-white text-slate-700 border border-slate-200 rounded-bl-none shadow-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 p-3 rounded-xl rounded-bl-none shadow-sm flex items-center gap-1">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100">
          <div className="flex gap-2">
            <input 
              type="text" 
              className="flex-1 border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              placeholder="Posez une question sur vos finances..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button onClick={handleSend} disabled={!input.trim()}>
              <MessageSquare size={18} />
            </Button>
          </div>
          <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
            {["Quel est mon bénéfice ?", "Dépenses Apple", "Déclaration TVA"].map(suggestion => (
              <button 
                key={suggestion}
                onClick={() => { setInput(suggestion); }}
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1 rounded-full whitespace-nowrap transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

// 4. PRICING & SETTINGS
const Pricing = () => {
  const plans = [
    { name: 'Starter', price: '19', target: 'Micro-entrepreneurs', features: ['Gestion factures illimitée', 'Rapprochement bancaire (1 banque)', 'Dashboard simple', 'Support Email'], active: false },
    { name: 'Pro', price: '49', target: 'PME en croissance', features: ['Tout du Starter', 'Assistant IA Illimité', 'Rapprochement multi-banques', 'Déclaration TVA auto', 'Support Chat'], active: true, recommended: true },
    { name: 'Business', price: '149', target: 'PME structurées', features: ['Tout du Pro', 'Accès multi-utilisateurs', 'Analytique avancée', 'Export comptable API', 'Manager dédié'], active: false },
  ];

  return (
    <div className="animate-fadeIn max-w-5xl mx-auto py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Choisissez votre plan</h2>
        <p className="text-slate-500">Des tarifs transparents qui évoluent avec votre entreprise.</p>
        <div className="mt-6 inline-flex bg-slate-100 p-1 rounded-lg">
          <button className="px-4 py-1.5 bg-white text-slate-900 shadow-sm rounded-md text-sm font-medium">Mensuel</button>
          <button className="px-4 py-1.5 text-slate-500 hover:text-slate-900 text-sm font-medium">Annuel (-20%)</button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 px-4">
        {plans.map((plan) => (
          <div key={plan.name} className={`relative bg-white rounded-2xl shadow-sm border ${plan.recommended ? 'border-indigo-500 ring-1 ring-indigo-500' : 'border-slate-200'} p-8 flex flex-col`}>
            {plan.recommended && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full">
                Populaire
              </div>
            )}
            <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
            <p className="text-sm text-slate-500 mt-1 mb-6">{plan.target}</p>
            <div className="flex items-baseline mb-6">
              <span className="text-4xl font-extrabold text-slate-900">{plan.price}€</span>
              <span className="text-slate-500 ml-1">/mois</span>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              {plan.features.map((feat, i) => (
                <li key={i} className="flex items-start text-sm text-slate-700">
                  <CheckCircle size={16} className="text-green-500 mr-2 shrink-0 mt-0.5" />
                  {feat}
                </li>
              ))}
            </ul>

            <Button 
              variant={plan.recommended ? "primary" : "secondary"} 
              className="w-full"
            >
              {plan.active ? "Plan Actuel" : "Choisir " + plan.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * MAIN LAYOUT & NAVIGATION
 */

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
      ${active 
        ? 'bg-indigo-50 text-indigo-700' 
        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
      }`}
  >
    <Icon size={20} />
    <span>{label}</span>
    {active && <ChevronRight size={16} className="ml-auto opacity-50" />}
  </button>
);

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Vue Router Simple
  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'scan': return <SmartScan />;
      case 'assistant': return <AIAssistant />;
      case 'transactions': return (
        <div className="text-center py-20">
          <Receipt size={64} className="mx-auto text-slate-200 mb-4" />
          <h2 className="text-xl font-bold text-slate-700">Module Transactions</h2>
          <p className="text-slate-500">Liste complète avec filtres (Placeholder)</p>
        </div>
      );
      case 'settings': return <Pricing />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      {/* Sidebar Mobile Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out flex flex-col
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">F</div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">FLINANCE</span>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <SidebarItem icon={LayoutDashboard} label="Tableau de bord" active={activeTab === 'dashboard'} onClick={() => {setActiveTab('dashboard'); setMobileMenuOpen(false);}} />
          <SidebarItem icon={UploadCloud} label="Smart Scan" active={activeTab === 'scan'} onClick={() => {setActiveTab('scan'); setMobileMenuOpen(false);}} />
          <SidebarItem icon={Receipt} label="Transactions" active={activeTab === 'transactions'} onClick={() => {setActiveTab('transactions'); setMobileMenuOpen(false);}} />
          <SidebarItem icon={Bot} label="Assistant IA" active={activeTab === 'assistant'} onClick={() => {setActiveTab('assistant'); setMobileMenuOpen(false);}} />
          <div className="pt-4 mt-4 border-t border-slate-100">
             <div className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Compte</div>
             <SidebarItem icon={Settings} label="Abonnement" active={activeTab === 'settings'} onClick={() => {setActiveTab('settings'); setMobileMenuOpen(false);}} />
             <SidebarItem icon={LogOut} label="Déconnexion" active={false} onClick={() => alert('Déconnexion...')} />
          </div>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-sm">
              {MOCK_USER.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">{MOCK_USER.name}</p>
              <p className="text-xs text-slate-500 truncate">{MOCK_USER.company}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header Mobile */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-4 justify-between lg:hidden shrink-0">
          <button onClick={() => setMobileMenuOpen(true)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
            <Menu size={24} />
          </button>
          <span className="font-bold text-lg">FLINANCE</span>
          <div className="w-8"></div> {/* Spacer */}
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
           <div className="max-w-7xl mx-auto">
             {renderContent()}
           </div>
        </div>
      </main>
    </div>
  );
};

export default App;
