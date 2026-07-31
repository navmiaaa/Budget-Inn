import React, { useState, useEffect } from 'react';
import './App.css';

// ===== GLOBAL CURRENCIES & RATES (Relative to EUR as base) =====
const currencies = {
  EUR: { symbol: '€', rate: 1.0, name: 'Euro' },
  USD: { symbol: '$', rate: 1.09, name: 'US Dollar' },
  GBP: { symbol: '£', rate: 0.86, name: 'British Pound' },
  JPY: { symbol: '¥', rate: 164.0, name: 'Japanese Yen' },
  CAD: { symbol: 'CA$', rate: 1.48, name: 'Canadian Dollar' },
  AUD: { symbol: 'A$', rate: 1.66, name: 'Australian Dollar' },
  AED: { symbol: 'د.إ', rate: 4.00, name: 'UAE Dirham' }
};

// ===== TRANSLATIONS =====
const translations = {
  en: {
    dir: "ltr",
    title: "HavenHub",
    subtitle: "Empowering global communities with emergency shelter, short-term stays, and long-term vacations.",
    search: "Search by city, title, or host...",
    searchBtn: "Search",
    book: "Reserve Stay",
    signin: "Sign In",
    join: "Join Now",
    logout: "Log Out",
    footer: "© 2026 HavenHub Inc. — Global Shelters & Vacation Rentals. Built for worldwide community resilience.",
    emergencyToggle: "🚨 Emergency Mode (Free/Low-cost shelters only)",
    emergencyBadge: "Emergency Shelter",
    emergencyVerified: "Emergency Host Verified",
    crisisLinesTitle: "Crisis Support & Direct Helpline Channels",
    crisisLinesDesc: "If you are in immediate danger or need urgent government relief, please contact these emergency channels directly:",
    lineMedical: "📞 Medical & Rescue Response: Dial 112 / 911",
    lineShelter: "📞 Red Cross / Disaster Shelter Desk: Dial 211",
    lineAssistance: "📞 Humanitarian Relief Hotline: Dial 1-800-SHELTER",
    currencySelect: "Currency",
    langSelect: "Language",
    free: "FREE",
    nightly: "night",
    weekly: "week",
    monthly: "month",
    all: "📌 All Stays",
    capacity: "Capacity",
    guestsText: "guests",
    rating: "Rating",
    contact: "Contact Host",
    amenitiesLabel: "Amenities Available",
    longTermDiscountNote: "Weekly stays get 15% off; monthly stays get 30% off!",
    categories: {
      short: "🏠 Short Term",
      long: "🏡 Long-Term Rent",
      emergency: "🚨 Emergency Shelter",
      vacation: "🌴 Vacations"
    },
    host: {
      title: "Host Dashboard",
      addListing: "Publish a New Stay",
      name: "Property Title / Name",
      city: "City & Country",
      price: "Price (per night in EUR - 0 if Free Emergency shelter)",
      type: "Listing Category",
      photo: "Photo/Image URL",
      submit: "Publish Property Now",
      desc: "Describe special services (e.g. medical aid nearby, warm bedding, free food)",
      descriptionPlaceholder: "Provide a detailed description of the space...",
      isEmergency: "Offer as Free Emergency Shelter",
      maxGuests: "Max Guests Allowed",
      contactPhone: "Contact Phone / Emergency Line",
      amenities: "Select Included Amenities",
      close: "Close Dashboard"
    },
    auth: {
      welcome: "Welcome to HavenHub",
      name: "Your Full Name",
      email: "Email Address",
      password: "Password (min 6 chars)",
      signup: "Create Account",
      login: "Log In",
      or: "or",
      already: "Already have an account?",
      noAccount: "Need an account?"
    },
    booking: {
      details: "Booking Details & Pricing",
      duration: "Duration of Stay",
      dates: "Select Dates",
      checkIn: "Check-in Date",
      checkOut: "Check-out Date",
      guests: "Number of Guests",
      nightlyPrice: "Nightly Price",
      weeklyDiscount: "Weekly Discount (15%)",
      monthlyDiscount: "Monthly Discount (30%)",
      total: "Total Price",
      confirm: "Confirm & Book Stay",
      success: "✅ Booking confirmed for ",
      emailSent: "📧 Confirmation and directions have been sent to ",
      emergencyBookingInfo: "🚨 Emergency Booking: No payment cards required. The host is prepared and notified.",
      cancel: "Cancel",
      daysCount: "days total"
    },
    amenities: {
      wifi: "📶 High-Speed WiFi",
      pets: "🐾 Pets Allowed",
      medical: "🏥 First Aid & Medical",
      heating: "🔥 Heating / AC",
      food: "🍲 Free Meals Included",
      wheelchair: "♿ Wheelchair Access"
    }
  },
  fr: {
    dir: "ltr",
    title: "HavenHub",
    subtitle: "Soutenir les communautés mondiales avec des abris d'urgence, des séjours courts et des vacances à long terme.",
    search: "Rechercher par ville, titre ou hôte...",
    searchBtn: "Rechercher",
    book: "Réserver",
    signin: "Se connecter",
    join: "S'inscrire",
    logout: "Déconnexion",
    footer: "© 2026 HavenHub Inc. — Abris globaux & Locations de vacances. Conçu pour la résilience communautaire.",
    emergencyToggle: "🚨 Mode d'urgence (Abris gratuits/à bas prix uniquement)",
    emergencyBadge: "Abri d'urgence",
    emergencyVerified: "Hôte d'urgence vérifié",
    crisisLinesTitle: "Lignes d'assistance & de crise d'urgence",
    crisisLinesDesc: "Si vous êtes en danger immédiat ou avez besoin d'une aide publique urgente, contactez ces canaux :",
    lineMedical: "📞 Aide médicale & Secours : Composer le 112 / 911",
    lineShelter: "📞 Croix-Rouge / Aide aux sans-abri : Composer le 211",
    lineAssistance: "📞 Assistance humanitaire générale : Composer le 1-800-SHELTER",
    currencySelect: "Devise",
    langSelect: "Langue",
    free: "GRATUIT",
    nightly: "nuit",
    weekly: "semaine",
    monthly: "mois",
    all: "📌 Tous les séjours",
    capacity: "Capacité",
    guestsText: "voyageurs",
    rating: "Note",
    contact: "Contacter l'hôte",
    amenitiesLabel: "Équipements disponibles",
    longTermDiscountNote: "Profitez de -15% par semaine et -30% par mois !",
    categories: {
      short: "🏠 Court terme",
      long: "🏡 Longue durée",
      emergency: "🚨 Urgence Abri",
      vacation: "🌴 Vacances"
    },
    host: {
      title: "Tableau de bord de l'hôte",
      addListing: "Publier un nouveau séjour",
      name: "Titre de la propriété",
      city: "Ville & Pays",
      price: "Prix (par nuit en EUR - 0 si Abri d'urgence gratuit)",
      type: "Catégorie d'annonce",
      photo: "URL de la photo",
      submit: "Publier l'annonce",
      desc: "Décrivez les services d'urgence spéciaux (ex: Repas gratuits, aide médicale, draps chauds)",
      descriptionPlaceholder: "Donnez une description détaillée du logement...",
      isEmergency: "Offrir comme Abri d'urgence gratuit",
      maxGuests: "Capacité max de voyageurs",
      contactPhone: "Téléphone de contact / Ligne d'urgence",
      amenities: "Sélectionner les équipements inclus",
      close: "Fermer le tableau de bord"
    },
    auth: {
      welcome: "Bienvenue sur HavenHub",
      name: "Nom complet",
      email: "Adresse e-mail",
      password: "Mot de passe (6 car. min)",
      signup: "Créer un compte",
      login: "Se connecter",
      or: "ou",
      already: "Vous avez déjà un compte ?",
      noAccount: "Pas de compte ?"
    },
    booking: {
      details: "Détails de la réservation & Tarifs",
      duration: "Durée du séjour",
      dates: "Sélectionner les dates",
      checkIn: "Date d'arrivée",
      checkOut: "Date de départ",
      guests: "Nombre de voyageurs",
      nightlyPrice: "Prix par nuit",
      weeklyDiscount: "Remise hebdomadaire (15%)",
      monthlyDiscount: "Remise mensuelle (30%)",
      total: "Prix total",
      confirm: "Confirmer la réservation",
      success: "✅ Réservation confirmée pour ",
      emailSent: "📧 Une confirmation et l'itinéraire ont été envoyés à ",
      emergencyBookingInfo: "🚨 Réservation d'urgence : Aucune carte bancaire requise. L'hôte est prévenu de votre arrivée.",
      cancel: "Annuler",
      daysCount: "jours au total"
    },
    amenities: {
      wifi: "📶 WiFi haut débit",
      pets: "🐾 Animaux acceptés",
      medical: "🏥 Premiers secours & Médical",
      heating: "🔥 Chauffage / Clim",
      food: "🍲 Repas gratuits inclus",
      wheelchair: "♿ Accès PMR"
    }
  },
  es: {
    dir: "ltr",
    title: "HavenHub",
    subtitle: "Apoyando a las comunidades globales con refugios de emergencia, estadías cortas y vacaciones de largo plazo.",
    search: "Buscar por ciudad, título o anfitrión...",
    searchBtn: "Buscar",
    book: "Reservar estadía",
    signin: "Iniciar sesión",
    join: "Registrarse",
    logout: "Cerrar sesión",
    footer: "© 2026 HavenHub Inc. — Refugios globales y alquileres vacacionales. Diseñado para la resiliencia comunitaria.",
    emergencyToggle: "🚨 Modo de Emergencia (Solo refugios gratuitos/bajo costo)",
    emergencyBadge: "Refugio de Emergencia",
    emergencyVerified: "Anfitrión de Emergencia Verificado",
    crisisLinesTitle: "Líneas de crisis y apoyo de emergencia",
    crisisLinesDesc: "Si está en peligro inmediato o necesita asistencia del gobierno de urgencia, comuníquese directamente con estos canales:",
    lineMedical: "📞 Soporte médico y rescate: Marcar 112 / 911",
    lineShelter: "📞 Cruz Roja / Oficina de refugio: Marcar 211",
    lineAssistance: "📞 Línea de asistencia humanitaria: Marcar 1-800-SHELTER",
    currencySelect: "Moneda",
    langSelect: "Idioma",
    free: "GRATIS",
    nightly: "noche",
    weekly: "semana",
    monthly: "mes",
    all: "📌 Todos los alojamientos",
    capacity: "Capacidad",
    guestsText: "huéspedes",
    rating: "Calificación",
    contact: "Contactar anfitrión",
    amenitiesLabel: "Servicios disponibles",
    longTermDiscountNote: "¡Estadías semanales tienen 15% de descuento; mensuales 30%!",
    categories: {
      short: "🏠 Corto plazo",
      long: "🏡 Largo plazo",
      emergency: "🚨 Refugio de Emergencia",
      vacation: "🌴 Vacaciones"
    },
    host: {
      title: "Panel del Anfitrión",
      addListing: "Publicar un nuevo alojamiento",
      name: "Título de la propiedad",
      city: "Ciudad y País",
      price: "Precio (por noche en EUR - 0 si es Refugio gratis)",
      type: "Categoría de alojamiento",
      photo: "URL de la foto",
      submit: "Publicar propiedad",
      desc: "Describa servicios especiales (ej: asistencia médica, camas calientes, comida gratis)",
      descriptionPlaceholder: "Escriba una descripción detallada del espacio...",
      isEmergency: "Ofrecer como Refugio de Emergencia gratis",
      maxGuests: "Huéspedes máximos permitidos",
      contactPhone: "Teléfono de contacto / Línea de emergencia",
      amenities: "Seleccionar servicios incluidos",
      close: "Cerrar panel de control"
    },
    auth: {
      welcome: "Bienvenido a HavenHub",
      name: "Nombre completo",
      email: "Correo electrónico",
      password: "Contraseña (mínimo 6 caracteres)",
      signup: "Crear cuenta",
      login: "Iniciar sesión",
      or: "o",
      already: "¿Ya tienes una cuenta?",
      noAccount: "¿Necesitas una cuenta?"
    },
    booking: {
      details: "Detalles de la reserva y precios",
      duration: "Duración de la estadía",
      dates: "Seleccionar fechas",
      checkIn: "Fecha de llegada",
      checkOut: "Fecha de salida",
      guests: "Número de huéspedes",
      nightlyPrice: "Precio por noche",
      weeklyDiscount: "Descuento semanal (15%)",
      monthlyDiscount: "Descuento mensual (30%)",
      total: "Precio total",
      confirm: "Confirmar reserva",
      success: "✅ Reserva confirmada para ",
      emailSent: "📧 La confirmación y las instrucciones han sido enviadas a ",
      emergencyBookingInfo: "🚨 Reserva de Emergencia: No se requiere tarjeta de crédito. El anfitrión ha sido notificado.",
      cancel: "Cancelar",
      daysCount: "días en total"
    },
    amenities: {
      wifi: "📶 WiFi de alta velocidad",
      pets: "🐾 Mascotas permitidas",
      medical: "🏥 Primeros auxilios y asistencia médica",
      heating: "🔥 Calefacción / Aire acondicionado",
      food: "🍲 Comidas gratuitas incluidas",
      wheelchair: "♿ Acceso silla de ruedas"
    }
  },
  ja: {
    dir: "ltr",
    title: "HavenHub",
    subtitle: "緊急避難所、短期滞在、長期のバケーションレンタルで世界のコミュニティをサポートします。",
    search: "都市、物件名、またはホスト名で検索...",
    searchBtn: "検索",
    book: "滞在を予約",
    signin: "サインイン",
    join: "新規登録",
    logout: "ログアウト",
    footer: "© 2026 HavenHub Inc. — グローバル避難所＆バケーションレンタル。世界的な相互支援と防災のために。",
    emergencyToggle: "🚨 緊急モード (無料/低価格の避難所のみ表示)",
    emergencyBadge: "緊急避難所",
    emergencyVerified: "認定緊急ホスト",
    crisisLinesTitle: "緊急支援＆相談ホットライン窓口",
    crisisLinesDesc: "身に危険が迫っている場合や、政府の緊急災害支援が必要な場合は、直ちに以下の公式窓口へご連絡ください：",
    lineMedical: "📞 救急・救助サポート: 112 または 911 にダイヤル",
    lineShelter: "📞 赤十字・災害避難デスク: 211 にダイヤル",
    lineAssistance: "📞 人道支援・緊急シェルター相談: 1-800-SHELTER",
    currencySelect: "通貨",
    langSelect: "言語",
    free: "無料",
    nightly: "泊",
    weekly: "週間",
    monthly: "月間",
    all: "📌 すべての滞在",
    capacity: "定員",
    guestsText: "名",
    rating: "評価",
    contact: "ホストに連絡",
    amenitiesLabel: "利用可能なアメニティ",
    longTermDiscountNote: "週単位の滞在で15%オフ、月単位の滞在で30%オフの割引が自動適用されます！",
    categories: {
      short: "🏠 短期滞在",
      long: "🏡 長期滞在",
      emergency: "🚨 緊急避難所",
      vacation: "🌴 バケーション"
    },
    host: {
      title: "ホストダッシュボード",
      addListing: "新しい滞在先を掲載",
      name: "物件名 / タイトル",
      city: "都市・国名",
      price: "料金 (1泊あたり、EUR表記 - 無料避難所の場合は0を入力)",
      type: "カテゴリー",
      photo: "写真のURL",
      submit: "物件を公開する",
      desc: "特別な支援について記載（例：医療品完備、暖かい寝具あり、無料の食事提供など）",
      descriptionPlaceholder: "滞在先に関する詳細な情報を入力してください...",
      isEmergency: "無料の緊急避難所として提供する",
      maxGuests: "最大宿泊人数",
      contactPhone: "緊急連絡先（電話番号）",
      amenities: "含まれるアメニティを選択",
      close: "ダッシュボードを閉じる"
    },
    auth: {
      welcome: "HavenHubへようこそ",
      name: "氏名",
      email: "メールアドレス",
      password: "パスワード (6文字以上)",
      signup: "アカウント作成",
      login: "ログイン",
      or: "または",
      already: "すでにアカウントをお持ちですか？",
      noAccount: "アカウントが必要ですか？"
    },
    booking: {
      details: "予約の詳細と料金明細",
      duration: "滞在期間",
      dates: "日付を選択",
      checkIn: "チェックイン日",
      checkOut: "チェックアウト日",
      guests: "ゲスト人数",
      nightlyPrice: "一泊料金",
      weeklyDiscount: "週割引 (15%)",
      monthlyDiscount: "月割引 (30%)",
      total: "合計金額",
      confirm: "予約を確定する",
      success: "✅ 予約が確定しました：",
      emailSent: "📧 確認メールと道順が以下に送信されました：",
      emergencyBookingInfo: "🚨 緊急予約：クレジットカードによる決済は不要です。ホストに通知されました。",
      cancel: "キャンセル",
      daysCount: "合計宿泊日数"
    },
    amenities: {
      wifi: "📶 高速WiFi",
      pets: "🐾 ペット同伴可能",
      medical: "🏥 救急箱・医療支援対応",
      heating: "🔥 冷暖房設備",
      food: "🍲 無料の食事あり",
      wheelchair: "♿ バリアフリー対応"
    }
  },
  ar: {
    dir: "rtl",
    title: "HavenHub",
    subtitle: "تمكين المجتمعات العالمية من خلال ملاجئ الطوارئ، والإقامات قصيرة الأجل، وإجازات المدى الطويل.",
    search: "ابحث بالمدينة، العنوان، أو المضيف...",
    searchBtn: "بحث",
    book: "احجز الآن",
    signin: "تسجيل الدخول",
    join: "انضم الآن",
    logout: "تسجيل الخروج",
    footer: "© 2026 HavenHub Inc. — الملاجئ العالمية وإيجارات العطلات. صُمم لدعم صمود المجتمعات في جميع أنحاء العالم.",
    emergencyToggle: "🚨 وضع الطوارئ (ملاجئ مجانية/منخفضة التكلفة فقط)",
    emergencyBadge: "ملجأ طوارئ",
    emergencyVerified: "مضيف طوارئ معتمد",
    crisisLinesTitle: "دعم الأزمات وقنوات الاتصال بالطوارئ",
    crisisLinesDesc: "إذا كنت في خطر مباشر أو بحاجة إلى مساعدة حكومية عاجلة، يرجى الاتصال بالقنوات التالية مباشرة:",
    lineMedical: "📞 الدعم الطبي والإنقاذ: اتصل بالرقم 112 / 911",
    lineShelter: "📞 الهلال الأحمر / مكاتب الإيواء في الكوارث: اتصل بالرقم 211",
    lineAssistance: "📞 الخط الساخن للمساعدات الإنسانية والإيواء: اتصل بالرقم SHELTER-1-800",
    currencySelect: "العملة",
    langSelect: "اللغة",
    free: "مجاني",
    nightly: "ليلة",
    weekly: "أسبوع",
    monthly: "شهر",
    all: "📌 جميع الإقامات",
    capacity: "السعة",
    guestsText: "ضيوف",
    rating: "التقييم",
    contact: "الاتصال بالمضيف",
    amenitiesLabel: "الخدمات والمرافق المتوفرة",
    longTermDiscountNote: "تخفيضات 15% على الإقامات الأسبوعية و 30% على الإقامات الشهرية!",
    categories: {
      short: "🏠 إقامة قصيرة",
      long: "🏡 إقامة طويلة",
      emergency: "🚨 ملجأ طوارئ",
      vacation: "🌴 عطلات"
    },
    host: {
      title: "لوحة تحكم المضيف",
      addListing: "نشر إقامة جديدة",
      name: "اسم أو عنوان العقار",
      city: "المدينة والدولة",
      price: "السعر (لكل ليلة باليورو - 0 إذا كان ملجأ طوارئ مجاني)",
      type: "فئة الإقامة",
      photo: "رابط الصورة",
      submit: "نشر العقار الآن",
      desc: "صف أي خدمات طوارئ خاصة (مثل: رعاية طبية، وجبات مجانية، فراش دافئ)",
      descriptionPlaceholder: "اكتب وصفاً تفصيلياً للمكان...",
      isEmergency: "تقديم كملجأ طوارئ مجاني",
      maxGuests: "أقصى عدد ضيوف مسموح به",
      contactPhone: "هاتف الاتصال / خط الطوارئ",
      amenities: "اختر الخدمات المشمولة",
      close: "إغلاق لوحة التحكم"
    },
    auth: {
      welcome: "مرحباً بك في HavenHub",
      name: "الاسم الكامل",
      email: "البريد الإلكتروني",
      password: "كلمة المرور (6 أحرف على الأقل)",
      signup: "إنشاء حساب",
      login: "تسجيل الدخول",
      or: "أو",
      already: "هل لديك حساب بالفعل؟",
      noAccount: "ليس لديك حساب؟"
    },
    booking: {
      details: "تفاصيل الحجز والأسعار",
      duration: "مدة الإقامة",
      dates: "اختر التواريخ",
      checkIn: "تاريخ الوصول",
      checkOut: "تاريخ المغادرة",
      guests: "عدد الضيوف",
      nightlyPrice: "سعر الليلة",
      weeklyDiscount: "خصم أسبوعي (15%)",
      monthlyDiscount: "خصم شهري (30%)",
      total: "السعر الإجمالي",
      confirm: "تأكيد الحجز",
      success: "✅ تم تأكيد الحجز لـ ",
      emailSent: "📧 تم إرسال التأكيد والتوجيهات إلى ",
      emergencyBookingInfo: "🚨 حجز طوارئ: لا تطلب بطاقات ائتمان. تم إخطار المضيف بقدومك.",
      cancel: "إلغاء",
      daysCount: "إجمالي الأيام"
    },
    amenities: {
      wifi: "📶 واي فاي سريع",
      pets: "🐾 مسموح بالحيوانات الأليفة",
      medical: "🏥 إسعافات أولية ورعاية طبية",
      heating: "🔥 تدفئة وتكييف",
      food: "🍲 وجبات طعام مجانية مشمولة",
      wheelchair: "♿ مناسب للكراسي المتحركة"
    }
  }
};

// ===== INITIAL RICH LISTINGS =====
const initialListings = [
  {
    id: 1,
    title: "Cozy Paris Retreat near Seine",
    city: "Paris, France",
    price: 65,
    type: "short",
    icon: "🏠",
    host: "Sophie L.",
    rating: 4.9,
    reviews: 42,
    description: "Charming studio close to historic monuments and beautiful public parks. Fully equipped, warm, and perfect for short stays.",
    amenities: ["wifi", "heating"],
    maxGuests: 2,
    contact: "+33 6 1234 5678",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "Spacious Lyon Family Apartment",
    city: "Lyon, France",
    price: 110,
    type: "long",
    icon: "🏡",
    host: "Jean M.",
    rating: 4.7,
    reviews: 18,
    description: "Large 2-bedroom apartment suitable for long vacation rentals or extended business trips. Includes dedicated workspace and high-speed fiber internet.",
    amenities: ["wifi", "heating", "wheelchair"],
    maxGuests: 5,
    contact: "+33 6 8765 4321",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "Urgent Shelter Marseille - Secure Room",
    city: "Marseille, France",
    price: 0,
    type: "emergency",
    icon: "🚨",
    host: "Marie C. (Verified NGO Host)",
    rating: 5.0,
    reviews: 12,
    description: "Safe, warm room dedicated entirely to families or individuals seeking emergency relocation or disaster shelter. First-aid support, hot meals, and social guidance are readily available.",
    amenities: ["wifi", "heating", "medical", "food", "pets"],
    maxGuests: 4,
    contact: "+33 4 9122 3344",
    image: "https://images.unsplash.com/photo-1549693578-d683be217e58?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "Sunny Beachside Villa",
    city: "Nice, France",
    price: 180,
    type: "vacation",
    icon: "🌴",
    host: "Pierre D.",
    rating: 4.95,
    reviews: 56,
    description: "Stunning beach views, wide private balcony, and immediate access to the Promenade des Anglais. Your perfect vacation escape.",
    amenities: ["wifi", "heating", "pets"],
    maxGuests: 6,
    contact: "+33 6 9988 7766",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    title: "Warm Safe-Haven Emergency Shelter",
    city: "Brussels, Belgium",
    price: 0,
    type: "emergency",
    icon: "🚨",
    host: "Brussels Relief Foundation",
    rating: 4.8,
    reviews: 9,
    description: "Providing shelter, security, and warm bedding for displaced persons, crisis evacuees, or families in distress. Fully accessible and supportive of pets.",
    amenities: ["heating", "medical", "food", "wheelchair", "pets"],
    maxGuests: 8,
    contact: "+32 2 555 0199",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    title: "Tokyo Shinjuku Long-stay Loft",
    city: "Tokyo, Japan",
    price: 95,
    type: "long",
    icon: "🏡",
    host: "Kenji S.",
    rating: 4.88,
    reviews: 34,
    description: "Modern, minimalistic loft in the heart of Tokyo. Perfect for remote workers and travelers seeking an immersive, long-term vacation.",
    amenities: ["wifi", "heating"],
    maxGuests: 2,
    contact: "+81 90 1234 5678",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80"
  }
];

function App() {
  const [lang, setLang] = useState('en');
  const [currency, setCurrency] = useState('EUR');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [listings, setListings] = useState(initialListings);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [showHost, setShowHost] = useState(false);

  // Booking states
  const [selectedListingForBooking, setSelectedListingForBooking] = useState(null);
  const [bookingCheckIn, setBookingCheckIn] = useState('');
  const [bookingCheckOut, setBookingCheckOut] = useState('');
  const [bookingGuests, setBookingGuests] = useState(1);

  // Host new listing form state
  const [newListing, setNewListing] = useState({
    title: '',
    city: '',
    price: '',
    type: 'short',
    image: '',
    description: '',
    contact: '',
    maxGuests: 2,
    amenities: {
      wifi: false,
      pets: false,
      medical: false,
      heating: false,
      food: false,
      wheelchair: false
    }
  });

  // Auth form state
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });

  const text = translations[lang];
  const currInfo = currencies[currency] || currencies.EUR;

  // Set document direction for RTL support (Arabic)
  useEffect(() => {
    document.documentElement.dir = text.dir;
  }, [lang, text.dir]);

  // Try to load additional listings from backend if active
  useEffect(() => {
    fetch('/api/listings')
      .then(res => {
        if (!res.ok) throw new Error("API Offline");
        return res.json();
      })
      .then(data => {
        if (data && data.length > 0) {
          const mapped = data.map(item => ({
            id: item.id,
            title: item.title,
            city: item.city || "Global Location",
            price: parseFloat(item.price),
            type: item.type || "short",
            icon: item.icon || "🏠",
            host: "Verified Supabase Host",
            rating: 4.8,
            reviews: 5,
            description: "No extra description available.",
            amenities: ["wifi", "heating"],
            maxGuests: 4,
            contact: "+1 555-0199",
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80"
          }));
          // Merge avoiding duplicates
          setListings(prev => {
            const existingIds = new Set(prev.map(p => p.id));
            const uniqueMapped = mapped.filter(m => !existingIds.has(m.id));
            return [...uniqueMapped, ...prev];
          });
        }
      })
      .catch(() => {
        // Fallback silently to our offline mock database
      });
  }, []);

  // Format price helper
  const getFormattedPrice = (priceInEur) => {
    if (priceInEur === 0) return text.free;
    const converted = Math.round(priceInEur * currInfo.rate);
    return `${currInfo.symbol}${converted.toLocaleString()}`;
  };

  // Convert inputs back to EUR from selected currency for accurate db/state storage
  const convertToEur = (priceInSelectedCurrency) => {
    return Math.round(priceInSelectedCurrency / currInfo.rate);
  };

  // ===== AUTH HANDLERS =====
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!authForm.email || !authForm.password || (!isLogin && !authForm.name)) {
      alert("Please fill all fields");
      return;
    }
    if (authForm.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    const displayName = isLogin ? authForm.email.split('@')[0] : authForm.name;
    setUser({ name: displayName, email: authForm.email });
    setShowAuth(false);
    setAuthForm({ name: '', email: '', password: '' });
    alert(`✅ Welcome to HavenHub, ${displayName}!`);
  };

  const handleLogout = () => {
    setUser(null);
    setShowHost(false);
  };

  // ===== HOST HANDLERS =====
  const toggleAmenityInForm = (amenityKey) => {
    setNewListing(prev => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [amenityKey]: !prev.amenities[amenityKey]
      }
    }));
  };

  const handleAddListing = (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please Sign In first to publish a property!");
      setShowAuth(true);
      return;
    }
    if (!newListing.title || !newListing.city || newListing.price === '') {
      alert("Please enter title, city, and pricing details");
      return;
    }

    const priceInEur = convertToEur(parseFloat(newListing.price));
    const selectedAmenitiesList = Object.keys(newListing.amenities).filter(
      key => newListing.amenities[key]
    );

    const isEmergencyShelter = newListing.type === 'emergency' || priceInEur === 0;

    const publishedListing = {
      id: Date.now(),
      title: newListing.title,
      city: newListing.city,
      price: isEmergencyShelter ? 0 : priceInEur,
      type: newListing.type,
      icon: isEmergencyShelter ? "🚨" : newListing.type === 'long' ? "🏡" : newListing.type === 'vacation' ? "🌴" : "🏠",
      host: `${user.name} (Host)`,
      rating: 5.0,
      reviews: 1,
      description: newListing.description || "A clean, peaceful stay hosted by the community.",
      amenities: selectedAmenitiesList,
      maxGuests: parseInt(newListing.maxGuests) || 2,
      contact: newListing.contact || "Provided upon reservation",
      image: newListing.image || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80"
    };

    // Attempt to post to server API
    fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        listing_id: publishedListing.id,
        guest_id: user.email,
        check_in: new Date(),
        total_price: priceInEur
      })
    }).catch(() => {/* Ignore backend posting if offline */});

    setListings([publishedListing, ...listings]);
    alert("✅ Staying Published successfully!");
    setNewListing({
      title: '',
      city: '',
      price: '',
      type: 'short',
      image: '',
      description: '',
      contact: '',
      maxGuests: 2,
      amenities: {
        wifi: false,
        pets: false,
        medical: false,
        heating: false,
        food: false,
        wheelchair: false
      }
    });
    setShowHost(false);
  };

  // ===== BOOKING PROCESS =====
  const initiateBooking = (listing) => {
    setSelectedListingForBooking(listing);
    setBookingCheckIn('');
    setBookingCheckOut('');
    setBookingGuests(1);
  };

  const calculateDays = () => {
    if (!bookingCheckIn || !bookingCheckOut) return 0;
    const start = new Date(bookingCheckIn);
    const end = new Date(bookingCheckOut);
    const diff = end - start;
    return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0;
  };

  const getBookingCalculation = () => {
    if (!selectedListingForBooking) return { subtotal: 0, discount: 0, total: 0, days: 0 };
    const days = calculateDays();
    const isEmergency = selectedListingForBooking.price === 0 || selectedListingForBooking.type === 'emergency';
    if (isEmergency) return { subtotal: 0, discount: 0, total: 0, days };

    const priceInSelectedCurrency = Math.round(selectedListingForBooking.price * currInfo.rate);
    const subtotal = priceInSelectedCurrency * days;
    let discount = 0;

    if (days >= 30) {
      discount = Math.round(subtotal * 0.30); // 30% discount for monthly stays
    } else if (days >= 7) {
      discount = Math.round(subtotal * 0.15); // 15% discount for weekly stays
    }

    const total = subtotal - discount;
    return { subtotal, discount, total, days };
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please Sign In first to reserve!");
      setShowAuth(true);
      return;
    }
    if (!bookingCheckIn || !bookingCheckOut) {
      alert("Please select valid check-in and check-out dates");
      return;
    }
    const days = calculateDays();
    if (days <= 0) {
      alert("Check-out date must be after check-in date");
      return;
    }
    if (bookingGuests > selectedListingForBooking.maxGuests) {
      alert(`This stay accommodates a maximum of ${selectedListingForBooking.maxGuests} guests.`);
      return;
    }

    const calc = getBookingCalculation();
    const finalPrice = calc.total;

    // Contact backend
    fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        listing_id: selectedListingForBooking.id,
        guest_id: user.email,
        check_in: bookingCheckIn,
        total_price: finalPrice
      })
    }).catch(() => {/* offline fallback */});

    alert(`${text.booking.success} ${selectedListingForBooking.title}!\n${text.booking.emailSent} ${user.email}.\n\n📞 Host Contact: ${selectedListingForBooking.contact}`);
    setSelectedListingForBooking(null);
  };

  // ===== SEARCH & FILTERS =====
  const filteredListings = listings.filter(item => {
    // 1. Search text match
    const searchLower = search.toLowerCase();
    const matchSearch = item.city.toLowerCase().includes(searchLower) ||
      item.title.toLowerCase().includes(searchLower) ||
      item.host.toLowerCase().includes(searchLower) ||
      (item.description && item.description.toLowerCase().includes(searchLower));

    // 2. Emergency Mode filter: if active, show only FREE (price === 0) or 'emergency' type stays
    if (emergencyMode) {
      const isEmergencyStay = item.price === 0 || item.type === 'emergency';
      return isEmergencyStay && matchSearch;
    }

    // 3. Normal Category filter
    const matchCategory = selectedCategory === 'all' || item.type === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className={`app ${lang === 'ar' ? 'rtl-direction' : ''}`}>
      {/* GLOBAL CRISIS HEADER */}
      {emergencyMode && (
        <div className="emergency-banner">
          <div className="emergency-banner-content">
            <h3>🚨 {text.crisisLinesTitle}</h3>
            <p>{text.crisisLinesDesc}</p>
            <div className="crisis-channels">
              <span className="crisis-channel">{text.lineMedical}</span>
              <span className="crisis-channel">{text.lineShelter}</span>
              <span className="crisis-channel">{text.lineAssistance}</span>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="header">
        <div className="logo" onClick={() => { setSelectedCategory('all'); setEmergencyMode(false); }}>
          <h1>🌐 {text.title}</h1>
        </div>

        <div className="header-actions">
          {/* Emergency mode toggle */}
          <button
            className={`emergency-toggle-btn ${emergencyMode ? 'active' : ''}`}
            onClick={() => {
              setEmergencyMode(!emergencyMode);
              if (!emergencyMode) {
                setSelectedCategory('emergency');
              } else {
                setSelectedCategory('all');
              }
            }}
          >
            {text.emergencyToggle}
          </button>

          {/* Currency selector */}
          <div className="selector-group">
            <label htmlFor="currency-select">{text.currencySelect}:</label>
            <select
              id="currency-select"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="styled-select"
            >
              {Object.keys(currencies).map(code => (
                <option key={code} value={code}>
                  {code} ({currencies[code].symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Language selector */}
          <div className="selector-group">
            <label htmlFor="lang-select">{text.langSelect}:</label>
            <select
              id="lang-select"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="styled-select"
            >
              <option value="en">🇬🇧 English</option>
              <option value="fr">🇫🇷 Français</option>
              <option value="es">🇪🇸 Español</option>
              <option value="ja">🇯🇵 日本語</option>
              <option value="ar">🇸🇦 العربية</option>
            </select>
          </div>

          {/* User controls */}
          {!user ? (
            <div className="auth-buttons">
              <button className="btn-outline" onClick={() => { setShowAuth(true); setIsLogin(true); }}>{text.signin}</button>
              <button className="btn-primary" onClick={() => { setShowAuth(true); setIsLogin(false); }}>{text.join}</button>
            </div>
          ) : (
            <div className="user-profile">
              <span className="user-name">👤 {user.name}</span>
              <button className="btn-outline host-dash-trigger" onClick={() => setShowHost(!showHost)}>
                📋 {showHost ? text.host.close : text.host.title}
              </button>
              <button className="btn-outline" onClick={handleLogout}>{text.logout}</button>
            </div>
          )}
        </div>
      </header>

      {/* AUTH MODAL */}
      {showAuth && (
        <div className="modal" onClick={() => setShowAuth(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{isLogin ? text.auth.login : text.auth.welcome}</h2>
            <form onSubmit={handleAuthSubmit}>
              {!isLogin && (
                <input
                  type="text"
                  placeholder={text.auth.name}
                  value={authForm.name}
                  onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                  required
                />
              )}
              <input
                type="email"
                placeholder={text.auth.email}
                value={authForm.email}
                onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder={text.auth.password}
                value={authForm.password}
                onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                required
                minLength="6"
              />
              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '12px' }}>
                {isLogin ? text.auth.login : text.auth.signup}
              </button>
            </form>
            <p style={{ marginTop: '16px', fontSize: '14px', color: '#717171', textAlign: 'center' }}>
              {isLogin ? text.auth.noAccount : text.auth.already}
              <button
                className="switch-auth-btn"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? text.auth.signup : text.auth.login}
              </button>
            </p>
            <button className="btn-close-modal" onClick={() => setShowAuth(false)}>✕</button>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h2>{text.title}</h2>
          <p>{text.subtitle}</p>
          <div className="search-box">
            <input
              type="text"
              placeholder={text.search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="search-submit-btn">🔍 {text.searchBtn}</button>
          </div>
        </div>
      </section>

      {/* CATEGORY BAR */}
      {!emergencyMode && (
        <section className="categories">
          <button
            className={`cat-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            {text.all}
          </button>
          <button
            className={`cat-btn ${selectedCategory === 'short' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('short')}
          >
            {text.categories.short}
          </button>
          <button
            className={`cat-btn ${selectedCategory === 'long' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('long')}
          >
            {text.categories.long}
          </button>
          <button
            className={`cat-btn ${selectedCategory === 'emergency' ? 'active' : ''}`}
            onClick={() => {
              setSelectedCategory('emergency');
              setEmergencyMode(true);
            }}
          >
            {text.categories.emergency}
          </button>
          <button
            className={`cat-btn ${selectedCategory === 'vacation' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('vacation')}
          >
            {text.categories.vacation}
          </button>
        </section>
      )}

      {/* HOST DASHBOARD PORTAL */}
      {showHost && user && (
        <section className="host-dashboard">
          <div className="host-header">
            <h3>📋 {text.host.title}</h3>
            <button className="btn-close-dash" onClick={() => setShowHost(false)}>✕</button>
          </div>
          <form className="host-form" onSubmit={handleAddListing}>
            <div className="form-row">
              <div className="form-group">
                <label>{text.host.name}</label>
                <input
                  placeholder="e.g. Cozy Central Shelter"
                  value={newListing.title}
                  onChange={(e) => setNewListing({ ...newListing, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>{text.host.city}</label>
                <input
                  placeholder="e.g. Paris, France"
                  value={newListing.city}
                  onChange={(e) => setNewListing({ ...newListing, city: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>{text.host.type}</label>
                <select
                  value={newListing.type}
                  onChange={(e) => setNewListing({ ...newListing, type: e.target.value })}
                >
                  <option value="short">Short Term Accommodation</option>
                  <option value="long">Long-Term Rent Vacation</option>
                  <option value="emergency">Emergency Shelter</option>
                  <option value="vacation">Vacation Villa</option>
                </select>
              </div>
              <div className="form-group">
                <label>{text.host.price}</label>
                <input
                  type="number"
                  placeholder={`Price in ${currInfo.name}`}
                  value={newListing.price}
                  onChange={(e) => setNewListing({ ...newListing, price: e.target.value })}
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>{text.host.maxGuests}</label>
                <input
                  type="number"
                  value={newListing.maxGuests}
                  onChange={(e) => setNewListing({ ...newListing, maxGuests: parseInt(e.target.value) || 1 })}
                  min="1"
                  required
                />
              </div>
              <div className="form-group">
                <label>{text.host.contactPhone}</label>
                <input
                  placeholder="+1 (555) 0199"
                  value={newListing.contact}
                  onChange={(e) => setNewListing({ ...newListing, contact: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>{text.host.photo}</label>
              <input
                placeholder="https://images.unsplash.com/..."
                value={newListing.image}
                onChange={(e) => setNewListing({ ...newListing, image: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>{text.host.desc}</label>
              <textarea
                placeholder={text.host.descriptionPlaceholder}
                value={newListing.description}
                onChange={(e) => setNewListing({ ...newListing, description: e.target.value })}
                rows="3"
              />
            </div>

            <div className="amenities-checklist">
              <p><strong>{text.host.amenities}</strong></p>
              <div className="checkbox-grid">
                {Object.keys(newListing.amenities).map(key => (
                  <label key={key} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={newListing.amenities[key]}
                      onChange={() => toggleAmenityInForm(key)}
                    />
                    <span>{text.amenities[key]}</span>
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" className="btn-primary publish-btn">{text.host.submit}</button>
          </form>
        </section>
      )}

      {/* LISTINGS SECTION */}
      <section className="section">
        <div className="cards-grid">
          {filteredListings.map(item => {
            const isEmergencyStay = item.price === 0 || item.type === 'emergency';
            return (
              <div key={item.id} className={`card ${isEmergencyStay ? 'emergency-card' : ''}`}>
                <div className="card-image-wrapper">
                  <img src={item.image} alt={item.title} className="card-image" />
                  <span className="card-type-emoji">{item.icon}</span>
                  {isEmergencyStay && (
                    <span className="emergency-alert-badge">{text.emergencyBadge}</span>
                  )}
                </div>

                <div className="card-body">
                  <div className="card-rating-row">
                    <span className="rating-star">⭐ {item.rating}</span>
                    <span className="reviews-count">({item.reviews} reviews)</span>
                  </div>

                  <h4 className="card-title">{item.title}</h4>
                  <p className="city">📍 {item.city}</p>
                  <p className="card-desc">{item.description}</p>

                  <div className="card-amenities-mini">
                    {item.amenities && item.amenities.map(key => (
                      <span key={key} className="mini-amenity-tag" title={text.amenities[key]}>
                        {text.amenities[key]}
                      </span>
                    ))}
                  </div>

                  <div className="card-footer-row">
                    <div className="price-tag">
                      {isEmergencyStay ? (
                        <span className="free-price">{text.free}</span>
                      ) : (
                        <>
                          <span className="amount">{getFormattedPrice(item.price)}</span>
                          <span className="unit"> / {text.nightly}</span>
                        </>
                      )}
                    </div>
                    <div className="capacity-badge">
                      👥 {item.maxGuests} {text.guestsText}
                    </div>
                  </div>

                  <div className="host-info-row">
                    <span className="host-badge">👤 {item.host}</span>
                    {isEmergencyStay && (
                      <span className="host-verified-badge" title="Identity and safe environment checked by NGOs">
                        ✔ {text.emergencyVerified}
                      </span>
                    )}
                  </div>

                  <button className="book-btn" onClick={() => initiateBooking(item)}>
                    {isEmergencyStay ? `🚨 ${text.book}` : text.book}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredListings.length === 0 && (
          <div className="no-results">
            <h3>No stays match your filters. Please try another city or disable Emergency Mode.</h3>
          </div>
        )}
      </section>

      {/* BOOKING MODAL */}
      {selectedListingForBooking && (
        <div className="modal" onClick={() => setSelectedListingForBooking(null)}>
          <div className="modal-content booking-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="booking-modal-header">
              <h2>{text.booking.details}</h2>
              <button className="btn-close-modal" onClick={() => setSelectedListingForBooking(null)}>✕</button>
            </div>

            <div className="booking-summary-top">
              <img
                src={selectedListingForBooking.image}
                alt={selectedListingForBooking.title}
                className="booking-modal-img"
              />
              <div>
                <h3>{selectedListingForBooking.title}</h3>
                <p className="city">📍 {selectedListingForBooking.city}</p>
                <p className="host-desc">👤 {selectedListingForBooking.host}</p>
              </div>
            </div>

            <form onSubmit={handleBookingSubmit} className="booking-form">
              <div className="form-group">
                <label><strong>{text.booking.dates}</strong></label>
                <div className="dates-row">
                  <div>
                    <span className="date-label">{text.booking.checkIn}</span>
                    <input
                      type="date"
                      value={bookingCheckIn}
                      onChange={(e) => setBookingCheckIn(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <span className="date-label">{text.booking.checkOut}</span>
                    <input
                      type="date"
                      value={bookingCheckOut}
                      onChange={(e) => setBookingCheckOut(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>
                  <strong>{text.booking.guests}</strong> (Max: {selectedListingForBooking.maxGuests})
                </label>
                <input
                  type="number"
                  value={bookingGuests}
                  onChange={(e) => setBookingGuests(Math.min(selectedListingForBooking.maxGuests, Math.max(1, parseInt(e.target.value) || 1)))}
                  min="1"
                  max={selectedListingForBooking.maxGuests}
                  required
                />
              </div>

              {/* Pricing calculation details */}
              <div className="pricing-breakdown">
                {selectedListingForBooking.price === 0 || selectedListingForBooking.type === 'emergency' ? (
                  <div className="emergency-booking-callout">
                    <p>{text.booking.emergencyBookingInfo}</p>
                  </div>
                ) : (
                  <>
                    <p className="discount-tip">{text.longTermDiscountNote}</p>
                    <div className="price-row">
                      <span>{text.booking.nightlyPrice} ({getFormattedPrice(selectedListingForBooking.price)} x {calculateDays()} {text.booking.daysCount}):</span>
                      <span>{getFormattedPrice(selectedListingForBooking.price * calculateDays())}</span>
                    </div>

                    {calculateDays() >= 30 ? (
                      <div className="price-row discount-row">
                        <span>{text.booking.monthlyDiscount}:</span>
                        <span>-{getFormattedPrice(Math.round(selectedListingForBooking.price * calculateDays() * 0.30))}</span>
                      </div>
                    ) : calculateDays() >= 7 ? (
                      <div className="price-row discount-row">
                        <span>{text.booking.weeklyDiscount}:</span>
                        <span>-{getFormattedPrice(Math.round(selectedListingForBooking.price * calculateDays() * 0.15))}</span>
                      </div>
                    ) : null}

                    <div className="price-row total-row">
                      <span>{text.booking.total}:</span>
                      <span className="total-amount">{getFormattedPrice(convertToEur(getBookingCalculation().total))}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="booking-modal-buttons">
                <button type="submit" className="btn-primary confirm-booking-btn">
                  {text.booking.confirm}
                </button>
                <button
                  type="button"
                  className="btn-outline cancel-booking-btn"
                  onClick={() => setSelectedListingForBooking(null)}
                >
                  {text.booking.cancel}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer>
        <p>{text.footer}</p>
      </footer>
    </div>
  );
}

export default App;
