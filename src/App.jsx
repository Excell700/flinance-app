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
  X as XIcon, // Renommé pour éviter conflit avec le X du pricing
  Bot,
  FileText,
  LogOut,
  ChevronRight,
  Loader2,
  DollarSign,
  PieChart as PieIcon,
  Download,
  Filter,
  Check, 
  X, 
  Star, 
  Zap, 
  Shield 
} from 'lucide-react';

// --- CONFIGURATION STRIPE ---
const STRIPE_LINKS = {
  starter: "https://buy.stripe.com/test_7sYbJ19b79JOd1Mba8bo400",
  pro: "#", 
  enterprise: "#"
};

// --- COMPOSANT PRICING (Nouvelle Version) ---
const PricingPage = () => {
  const plans = [
    {
      name: "Starter",
      price: "29€",
      period: "/mois",
      description: "Parfait pour commencer vos projets personnels.",
      features: [
        { name: "5 Projets", included: true },
        { name: "Support par email", included: true },
        { name: "Analyses de base", included: true },
        { name: "Domaine personnalisé", included: false },
        { name: "Support 24/7", included: false },
      ],
      link: STRIPE_LINKS.starter,
      buttonText: "Commencer",
      popular: false,
      icon: <Star className="w-6 h-6 text-blue-500" />
    },
    {
      name: "Pro",
      price: "99€",
      period: "/mois",
      description: "Pour les équipes et les entreprises en croissance.",
      features: [
        { name: "Projets illimités", included: true },
        { name: "Support prioritaire", included: true },
        { name: "Analyses avancées", included: true },
        { name: "Domaine personnalisé", included: true },
        { name: "Support 24/7", included: false },
      ],
      link: STRIPE_LINKS.pro,
      buttonText: "Passer au Pro",
      popular: true,
      icon: <Zap className="w-6 h-6 text-yellow-500" />
    },
    {
      name: "Entreprise",
      price: "Sur Devis",
      period: "",
      description: "Solutions sur mesure pour les grandes structures.",
      features: [
        { name: "Tout illimité", included: true },
        { name: "Support dédié", included: true },
        { name: "Analyses personnalisées", included: true },
        { name: "SLA garanti", included: true },
        { name: "Déploiement sur site", included: true },
      ],
      link: STRIPE_LINKS.enterprise,
      buttonText: "Contactez-nous",
      popular: false,
      icon: <Shield className="w-6 h-6 text-green-500" />
    }
  ];

  return (
    <div className="bg-gray-50 py-6 sm:px-6 lg:px-8 font-sans animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">Tarification</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Des plans adaptés à vos besoins
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Choisissez l'offre qui correspond le mieux à votre stade de développement.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 lg:gap-8 items-start">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`relative bg-white rounded-2xl shadow-xl flex flex-col justify-between transition-transform duration-300 hover:-translate-y-2 ${plan.popular ? 'border-2 border-blue-500 ring-4 ring-blue-500/10 z-10 scale-105 lg:scale-110' : 'border border-gray-200'}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide shadow-md">
                  Plus Populaire
                </div>
              )}

              <div className="p-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                  <div className="p-2 bg-gray-50 rounded-lg">
                    {plan.icon}
                  </div>
                </div>
                
                <p className="mt-4 text-sm text-gray-500 h-10">
                  {plan.description}
                </p>

                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-extrabold text-gray-900 tracking-tight">
                    {plan.price}
                  </span>
                  <span className="ml-1 text-xl font-medium text-gray-500">
                    {plan.period}
                  </span>
                </div>

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0">
                        {feature.included ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : (
                          <X className="h-5 w-5 text-gray-300" />
                        )}
                      </div>
                      <p className={`ml-3 text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                        {feature.name}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 bg-gray-50 rounded-b-2xl border-t border-gray-100">
                <a
                  href={plan.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full text-center px-6 py-3 rounded-xl shadow-sm text-base font-medium transition-colors duration-200 
                    ${plan.popular 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'
                    }`}
                >
                  {plan.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {/* Section FAQ ou confiance */}
        <div className="mt-16 border-t border-gray-200 pt-10 pb-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
             {['Paiement Sécurisé', 'Annulation Facile', 'Garantie 30 jours', 'Support Expert'].map((item) => (
               <div key={item} className="text-sm font-medium text-gray-500 flex items-center justify-center gap-2">
                 <Check className="w-4 h-4 text-green-500" /> {item}
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MOCK DATA & UTILS ---
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
  { id: 6, date: '2023-10-18', label: 'Restaurant Le Petit Coin', amount: -45.00, type: 'expense', category: 'Repas', status: 'processing' },
  { id: 7, date: '2023-10-15', label: 'Adobe Creative Cloud', amount: -65.00, type: 'expense', category: 'Logiciel', status: 'matched' },
];

const RevenueChart = () => (
  <div className="w-full h-48 flex items-end justify-between space-x-2 px-2">
    {[35, 45, 30, 60, 55, 75, 80, 65, 50, 70, 90, 85].map((h, i) => (
      <div key={i} className="group relative flex-1 bg-indigo-50 hover:bg-indigo-100 rounded-t-lg transition-all duration-300">
        <div 
          style={{ height: `${h}%` }} 
          className="absolute bottom-0 w-full bg-indigo-500 rounded-t-lg group-hover:bg-indigo-600 transition-all"
        ></div>
        <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded">
          {h * 100}€
        </div>
      </div>
    ))}
  </div>
);

// --- COMPOSANTS UI ATOMIQUES ---

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

// --- MODULES FONCTIONNELS ---

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
               <Receipt size={48} classNa
